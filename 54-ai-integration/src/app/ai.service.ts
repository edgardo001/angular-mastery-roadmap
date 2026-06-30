// ============================================================
// ai.service.ts — Servicio genérico para APIs de IA
// ============================================================
// Este es un servicio más general que puede conectar con cualquier API
// de completado de texto (no solo OpenAI). Es como un "cable universal"
// que funciona con diferentes enchufes (APIs).

import { Injectable } from '@angular/core';

// Interfaces: definen la "forma" de los datos que enviamos y recibimos.
// AICompletionRequest: lo que le enviamos a la API (modelo, mensajes, parámetros).
export interface AICompletionRequest {
  model: string;
  messages: { role: string; content: string }[];
  temperature?: number;  // Creatividad de la IA (0 = preciso, 1 = creativo)
  maxTokens?: number;    // Máximo de tokens en la respuesta
}

// AICompletionResponse: lo que la API nos devuelve (respuesta, uso de tokens).
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
  // Endpoint por defecto de OpenAI.
  private defaultEndpoint = 'https://api.openai.com/v1/chat/completions';

  // complete: envía una petición a la API de IA y devuelve la respuesta.
  // Es una función genérica: funciona con cualquier modelo y endpoint.
  async complete(
    request: AICompletionRequest,
    apiKey: string,
    endpoint = this.defaultEndpoint
  ): Promise<AICompletionResponse> {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
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
