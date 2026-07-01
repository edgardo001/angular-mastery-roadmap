// ============================================================
// ai.service.ts — Servicio genérico para APIs de IA
// ============================================================
// Este servicio se comunica con NUESTRO PROXY SERVER en localhost:3000,
// que a su vez se comunica con OpenAI.
//
// SEGURIDAD: La API key NUNCA pasa por este servicio.
// El proxy la lee de su archivo .env del lado del servidor.
//
// ANTERES (inseguro):
//   Browser → fetch('api.openai.com', { Authorization: 'Bearer sk-...' })
//                                         ▲ ¡API key visible en la red!
//
// AHORA (seguro):
//   Browser → fetch('localhost:3000/api/chat', { messages: [...] })
//                                                 ▲ Sin API key
//   Proxy   → fetch('api.openai.com', { Authorization: 'Bearer sk-...' })
//                                         ▲ API key solo en el servidor

import { Injectable } from '@angular/core';

// Interfaces: definen la "forma" de los datos que enviamos y recibimos.
// AICompletionRequest: lo que le enviamos a nuestro proxy (el proxy le agrega la API key).
export interface AICompletionRequest {
  model: string;
  messages: { role: string; content: string }[];
  temperature?: number;  // Creatividad de la IA (0 = preciso, 1 = creativo)
  maxTokens?: number;    // Máximo de tokens en la respuesta
}

// AICompletionResponse: lo que OpenAI devuelve (respuesta, uso de tokens).
export interface AICompletionResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: { role: string; content: string };
    finishReason: string;
  }[];
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

@Injectable({ providedIn: 'root' })
export class AIService {
  // Endpoint de NUESTRO PROXY, no de OpenAI directamente.
  // El proxy reenvía la petición a OpenAI con la API key.
  // ¿Por qué un proxy? Porque la API key nunca debe salir del servidor.
  private proxyEndpoint = 'http://localhost:3000/api/chat';

  // complete: envía una petición al proxy y devuelve la respuesta.
  // NOTA: Ya NO necesitamos apiKey como parámetro.
  // El proxy la lee de process.env.OPENAI_API_KEY en el servidor.
  async complete(
    request: AICompletionRequest,
    endpoint = this.proxyEndpoint
  ): Promise<AICompletionResponse> {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // NO enviamos Authorization header aquí.
        // El proxy agrega la API key del lado del servidor.
      },
      body: JSON.stringify(request)
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`API error ${response.status}: ${error}`);
    }

    return response.json();
  }
}
