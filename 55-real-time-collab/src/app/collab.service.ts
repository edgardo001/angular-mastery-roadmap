// ============================================================
// collab.service.ts — Servicio de colaboración WebRTC + WebSocket
// ============================================================
// Este servicio maneja la comunicación en tiempo real entre usuarios.
// Usa dos tecnologías:
// 1. WebSocket: para "señalización" (encontrar a otros usuarios)
// 2. WebRTC: para comunicación directa peer-to-peer (sin servidor intermediario)
//
// Es como organizar una fierta:
// - WebSocket es el "recepcionista" que te dice quién llegó.
// - WebRTC es la "conversación directa" entre invitados.

import { Injectable, signal, WritableSignal } from '@angular/core';

// SignalingMessage: los mensajes que se envían por WebSocket para coordinar.
export interface SignalingMessage {
  type: 'offer' | 'answer' | 'ice-candidate' | 'join' | 'leave' | 'peer-joined' | 'peer-left';
  from: string;     // Quién envía el mensaje
  to?: string;      // A quién va dirigido (en mensajes punto a punto)
  data?: any;       // Datos adicionales (ofertas SDP, candidatos ICE, etc.)
}

@Injectable({ providedIn: 'root' })
export class CollabService {
  // peers: lista de IDs de usuarios conectados a la misma sala.
  peers: WritableSignal<string[]> = signal([]);

  // ws: la conexión WebSocket al servidor de señalización.
  private ws: WebSocket | null = null;

  // peerConnections: mapa de conexiones WebRTC con cada par.
  private peerConnections = new Map<string, RTCPeerConnection>();

  // localStream: el stream de audio/video local (para videollamadas).
  private localStream: MediaStream | null = null;

  // config: configuración de WebRTC. Los servidores STUN ayudan a
  // descubrir la dirección IP real del usuario detrás de un NAT.
  private config: RTCConfiguration = {
    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
  };

  // connect: establece la conexión WebSocket y se une a una sala.
  connect(signalUrl: string, roomId: string, userId: string) {
    // Abre una conexión WebSocket al servidor de señalización.
    this.ws = new WebSocket(signalUrl);

    // onopen: se ejecuta cuando la conexión se establece.
    this.ws.onopen = () => {
      // Envía un mensaje "join" para indicar que entramos a la sala.
      this.ws!.send(JSON.stringify({ type: 'join', from: userId, data: { room: roomId } }));
    };

    // onmessage: se ejecuta cuando llega un mensaje de otro usuario o del servidor.
    this.ws.onmessage = async (event) => {
      const msg: SignalingMessage = JSON.parse(event.data);
      await this.handleSignaling(msg, userId);
    };

    this.ws.onclose = () => {
      console.log('Signaling connection closed');
    };
  }

  // handleSignaling: procesa los mensajes de señalización según su tipo.
  private async handleSignaling(msg: SignalingMessage, userId: string) {
    switch (msg.type) {
      case 'peer-joined':
        // Un nuevo usuario se unió a la sala.
        this.peers.update(p => [...p, msg.from]);
        // Le enviamos una oferta para establecer conexión directa.
        await this.createOffer(msg.from, userId);
        break;
      case 'peer-left':
        // Un usuario se desconectó.
        this.peers.update(p => p.filter(id => id !== msg.from));
        // Cerramos su conexión WebRTC y la eliminamos del mapa.
        this.peerConnections.get(msg.from)?.close();
        this.peerConnections.delete(msg.from);
        break;
      case 'offer':
        // Recibimos una oferta de conexión de otro usuario.
        await this.handleOffer(msg, userId);
        break;
      case 'answer':
        // Recibimos una respuesta a nuestra oferta.
        await this.handleAnswer(msg);
        break;
      case 'ice-candidate':
        // Recibimos un candidato ICE (una forma de conectarnos directamente).
        await this.handleIceCandidate(msg);
        break;
    }
  }

  // createOffer: crea una oferta WebRTC para conectarnos con otro usuario.
  private async createOffer(peerId: string, userId: string) {
    const pc = this.createPeerConnection(peerId, userId);
    // createOffer: genera los datos SDP (Session Description Protocol)
    // que describen cómo queremos conectarnos.
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    this.send({ type: 'offer', from: userId, to: peerId, data: offer });
  }

  // handleOffer: procesa una oferta recibida y responde con una answer.
  private async handleOffer(msg: SignalingMessage, userId: string) {
    const pc = this.createPeerConnection(msg.from, userId);
    // setRemoteDescription: le dice a WebRTC los datos del otro usuario.
    await pc.setRemoteDescription(new RTCSessionDescription(msg.data));
    // createAnswer: genera la respuesta a la oferta.
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);
    this.send({ type: 'answer', from: userId, to: msg.from, data: answer });
  }

  // handleAnswer: procesa la respuesta a nuestra oferta.
  private async handleAnswer(msg: SignalingMessage) {
    const pc = this.peerConnections.get(msg.from);
    if (pc) {
      await pc.setRemoteDescription(new RTCSessionDescription(msg.data));
    }
  }

  // handleIceCandidate: agrega un candidato ICE para mejorar la conexión.
  private async handleIceCandidate(msg: SignalingMessage) {
    const pc = this.peerConnections.get(msg.from);
    if (pc && msg.data) {
      await pc.addIceCandidate(new RTCIceCandidate(msg.data));
    }
  }

  // createPeerConnection: crea una conexión WebRTC con un par específico.
  private createPeerConnection(peerId: string, userId: string): RTCPeerConnection {
    const pc = new RTCPeerConnection(this.config);

    // onicecandidate: se ejecuta cuando WebRTC descubre una nueva forma de conectarse.
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        this.send({ type: 'ice-candidate', from: userId, to: peerId, data: event.candidate });
      }
    };

    // ontrack: se ejecuta cuando recibimos audio/video del otro usuario.
    pc.ontrack = (event) => {
      const el = document.createElement('audio');
      el.srcObject = event.streams[0];
      el.autoplay = true;
    };

    this.peerConnections.set(peerId, pc);
    return pc;
  }

  // send: envía un mensaje por WebSocket.
  private send(msg: SignalingMessage) {
    this.ws?.send(JSON.stringify(msg));
  }

  // disconnect: cierra todas las conexiones y limpia los recursos.
  disconnect() {
    this.peerConnections.forEach(pc => pc.close());
    this.peerConnections.clear();
    this.ws?.close();
    this.peers.set([]);
  }
}
