import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CspService {
  private nonce: string | null = null;

  generateNonce(): string {
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);
    this.nonce = Array.from(array)
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
    return this.nonce;
  }

  getNonce(): string | null {
    return this.nonce;
  }

  verifyNonce(token: string): boolean {
    return this.nonce === token;
  }

  buildCspWithNonce(basePolicy: string): string {
    const nonce = this.generateNonce();
    return `${basePolicy} 'nonce-${nonce}'`;
  }
}
