// ============================================================
// chat.service.ts — Servicio de chat con IA (streaming)
// ============================================================
// Un Servicio en Angular es como un "asistente personal": se encarga
// de una tarea específica (aquí, comunicarse con nuestro proxy de IA)
// y puede ser usado por múltiples componentes.
//
// SEGURIDAD: Este servicio se comunica con localhost:3000 (nuestro proxy),
// NO directamente con OpenAI. La API key nunca sale del servidor.

// Injectable: decorador que le dice a Angular "puedes crear instancias de esta clase".
// providedIn: 'root' significa que hay UNA SOLA instancia global (singleton).
import { Injectable, signal, WritableSignal } from '@angular/core';

// Interface: define la "forma" de un objeto. Es como un plano de construcción.
// ChatMessage dice: "un mensaje tiene un role (quién habla) y content (qué dice)".
export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

@Injectable({ providedIn: 'root' })
export class ChatService {
  // signal: es como una "caja" que contiene un valor. Cuando cambia, Angular
  // actualiza automáticamente la pantalla. Es reactivo como Excel: cambias un
  // número y todas las fórmulas que dependen de él se actualizan.
  messages: WritableSignal<ChatMessage[]> = signal([]);
  streamingContent: WritableSignal<string> = signal('');
  tokens: WritableSignal<number> = signal(0);

  // AbortController: permite cancelar una petición HTTP en cours.
  // Es como colgar el teléfono mientras alguien habla.
  private abortController: AbortController | null = null;

  // sendMessage: envía un mensaje a NUESTRO PROXY con streaming.
  // NOTA: Ya NO recibe apiKey como parámetro.
  // La API key vive en el servidor (process.env.OPENAI_API_KEY).
  async sendMessage(content: string, endpoint = 'http://localhost:3000/api/chat') {
    // Agrega el mensaje del usuario al historial.
    this.messages.update(m => [...m, { role: 'user', content }]);

    // Limpia el contenido de streaming anterior.
    this.streamingContent.set('');

    // Crea un AbortController para poder cancelar si es necesario.
    this.abortController = new AbortController();

    try {
      // fetch: función nativa de JavaScript para hacer peticiones HTTP.
      // Es como enviar una carta: le dices a quién va, qué contenido, y esperas respuesta.
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          // NO enviamos Authorization header aquí.
          // El proxy lo agrega automáticamente con la API key del .env.
        },
        // body: el mensaje que enviamos al proxy.
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [...this.messages().map(m => ({ role: m.role, content: m.content }))],
          stream: true // Le dice al proxy que envíe streaming desde OpenAI.
        }),
        signal: this.abortController.signal
      });

      if (!response.ok) throw new Error(`API error: ${response.status}`);
      if (!response.body) throw new Error('No response body');

      // reader: lee los datos del streaming como un "chorro" de información.
      const reader = response.body.getReader();
      // decoder: convierte los bytes del streaming en texto legible.
      const decoder = new TextDecoder();
      let buffer = '';
      let totalTokens = 0;

      // Bucle que lee cada pedazo del streaming hasta que termine.
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        // Agrega el texto decodificado al buffer (acumulador).
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        // La última línea puede estar incompleta, la guardamos para la siguiente vuelta.
        buffer = lines.pop() || '';

        for (const line of lines) {
          // Las líneas de streaming empiezan con "data: "
          if (!line.startsWith('data: ')) continue;
          const data = line.slice(6).trim();
          // [DONE] indica que la IA terminó de responder.
          if (data === '[DONE]') break;

          try {
            const parsed = JSON.parse(data);
            // delta.content: el siguiente pedazo de texto de la respuesta.
            const delta = parsed.choices?.[0]?.delta?.content || '';
            if (delta) {
              // Actualiza el contenido streaming con el nuevo pedazo.
              this.streamingContent.update(c => c + delta);
              totalTokens++;
              this.tokens.set(totalTokens);
            }
          } catch { continue; }
        }
      }

      // Cuando termina el streaming, agrega la respuesta completa al historial.
      this.messages.update(m => [...m, { role: 'assistant', content: this.streamingContent() }]);
      this.streamingContent.set('');
    } catch (err: any) {
      // Si el error es por AbortError, significa que el usuario canceló (no es error real).
      if (err.name !== 'AbortError') {
        console.error('Chat error:', err);
        this.streamingContent.set(`Error: ${err.message}`);
      }
    }
  }

  // cancelStream: cancela el streaming actual usando AbortController.
  cancelStream() {
    this.abortController?.abort();
    this.abortController = null;
  }
}
