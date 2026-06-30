// SECURITY_HEADERS contiene los headers de seguridad que nuestro servidor debe enviar
// Record<string, string> significa "un objeto con claves string y valores string"
// Estos headers protegen la aplicación de diferentes tipos de ataques

export const SECURITY_HEADERS: Record<string, string> = {
  // Content-Security-Policy (CSP): Controla qué recursos puede cargar la página
  // Sin esto, un atacante podría inyectar scripts maliciosos
  'Content-Security-Policy':
    "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'",
  
  // X-Frame-Options: DENY impide que la página se cargue en un iframe
  // Evita ataques de clickjacking donde un atacante superpone elementos invisibles
  'X-Frame-Options': 'DENY',
  
  // X-Content-Type-Options: nosniff impide al navegador "adivinar" el tipo de contenido
  // Evita que se ejecuten scripts disfrazados de imágenes u otros archivos
  'X-Content-Type-Options': 'nosniff',
  
  // Strict-Transport-Security (HSTS): Fuerza HTTPS durante 1 año
  // Incluye subdominios y permite precarga en listas de navegadores
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  
  // Referrer-Policy: Controla qué información se envía al navegar a otros sitios
  // strict-origin-when-cross-origin solo envía el origen, no la ruta completa
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  
  // Permissions-Policy: Deshabilita acceso a cámara, micrófono y geolocalización
  // Protege la privacidad del usuario
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
};
