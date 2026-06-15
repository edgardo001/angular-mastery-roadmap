import { Injectable, signal, WritableSignal } from '@angular/core';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

@Injectable({ providedIn: 'root' })
export class ChatService {
  messages: WritableSignal<ChatMessage[]> = signal([]);
  streamingContent: WritableSignal<string> = signal('');
  tokens: WritableSignal<number> = signal(0);
  private abortController: AbortController | null = null;

  async sendMessage(content: string, apiKey: string, endpoint: string) {
    this.messages.update(m => [...m, { role: 'user', content }]);
    this.streamingContent.set('');
    this.abortController = new AbortController();

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [...this.messages().map(m => ({ role: m.role, content: m.content }))],
          stream: true
        }),
        signal: this.abortController.signal
      });

      if (!response.ok) throw new Error(`API error: ${response.status}`);
      if (!response.body) throw new Error('No response body');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let totalTokens = 0;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const data = line.slice(6).trim();
          if (data === '[DONE]') break;

          try {
            const parsed = JSON.parse(data);
            const delta = parsed.choices?.[0]?.delta?.content || '';
            if (delta) {
              this.streamingContent.update(c => c + delta);
              totalTokens++;
              this.tokens.set(totalTokens);
            }
          } catch { continue; }
        }
      }

      this.messages.update(m => [...m, { role: 'assistant', content: this.streamingContent() }]);
      this.streamingContent.set('');
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        console.error('Chat error:', err);
        this.streamingContent.set(`Error: ${err.message}`);
      }
    }
  }

  cancelStream() {
    this.abortController?.abort();
    this.abortController = null;
  }
}
