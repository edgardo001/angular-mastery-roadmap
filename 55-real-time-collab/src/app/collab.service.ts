import { Injectable, signal, WritableSignal } from '@angular/core';

export interface SignalingMessage {
  type: 'offer' | 'answer' | 'ice-candidate' | 'join' | 'leave' | 'peer-joined' | 'peer-left';
  from: string;
  to?: string;
  data?: any;
}

@Injectable({ providedIn: 'root' })
export class CollabService {
  peers: WritableSignal<string[]> = signal([]);
  private ws: WebSocket | null = null;
  private peerConnections = new Map<string, RTCPeerConnection>();
  private localStream: MediaStream | null = null;
  private config: RTCConfiguration = {
    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
  };

  connect(signalUrl: string, roomId: string, userId: string) {
    this.ws = new WebSocket(signalUrl);

    this.ws.onopen = () => {
      this.ws!.send(JSON.stringify({ type: 'join', from: userId, data: { room: roomId } }));
    };

    this.ws.onmessage = async (event) => {
      const msg: SignalingMessage = JSON.parse(event.data);
      await this.handleSignaling(msg, userId);
    };

    this.ws.onclose = () => {
      console.log('Signaling connection closed');
    };
  }

  private async handleSignaling(msg: SignalingMessage, userId: string) {
    switch (msg.type) {
      case 'peer-joined':
        this.peers.update(p => [...p, msg.from]);
        await this.createOffer(msg.from, userId);
        break;
      case 'peer-left':
        this.peers.update(p => p.filter(id => id !== msg.from));
        this.peerConnections.get(msg.from)?.close();
        this.peerConnections.delete(msg.from);
        break;
      case 'offer':
        await this.handleOffer(msg, userId);
        break;
      case 'answer':
        await this.handleAnswer(msg);
        break;
      case 'ice-candidate':
        await this.handleIceCandidate(msg);
        break;
    }
  }

  private async createOffer(peerId: string, userId: string) {
    const pc = this.createPeerConnection(peerId, userId);
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    this.send({ type: 'offer', from: userId, to: peerId, data: offer });
  }

  private async handleOffer(msg: SignalingMessage, userId: string) {
    const pc = this.createPeerConnection(msg.from, userId);
    await pc.setRemoteDescription(new RTCSessionDescription(msg.data));
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);
    this.send({ type: 'answer', from: userId, to: msg.from, data: answer });
  }

  private async handleAnswer(msg: SignalingMessage) {
    const pc = this.peerConnections.get(msg.from);
    if (pc) {
      await pc.setRemoteDescription(new RTCSessionDescription(msg.data));
    }
  }

  private async handleIceCandidate(msg: SignalingMessage) {
    const pc = this.peerConnections.get(msg.from);
    if (pc && msg.data) {
      await pc.addIceCandidate(new RTCIceCandidate(msg.data));
    }
  }

  private createPeerConnection(peerId: string, userId: string): RTCPeerConnection {
    const pc = new RTCPeerConnection(this.config);

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        this.send({ type: 'ice-candidate', from: userId, to: peerId, data: event.candidate });
      }
    };

    pc.ontrack = (event) => {
      const el = document.createElement('audio');
      el.srcObject = event.streams[0];
      el.autoplay = true;
    };

    this.peerConnections.set(peerId, pc);
    return pc;
  }

  private send(msg: SignalingMessage) {
    this.ws?.send(JSON.stringify(msg));
  }

  disconnect() {
    this.peerConnections.forEach(pc => pc.close());
    this.peerConnections.clear();
    this.ws?.close();
    this.peers.set([]);
  }
}
