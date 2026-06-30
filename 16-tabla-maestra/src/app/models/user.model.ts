// ============================================================================
// MODELO DE USUARIO (user.model.ts)
// ============================================================================
// Este archivo define la forma de los datos de usuario.
// Es como un "molde" que dice qué campos tiene cada objeto usuario.

// Interface: Contrato de tipo que define la estructura de un objeto.
// TypeScript verifica que cada usuario tenga exactamente estos campos.
export interface User {
  id: number;     // Identificador único del usuario
  name: string;   // Nombre completo
  email: string;  // Correo electrónico
  role: string;   // Rol: 'Admin', 'Editor', o 'Usuario'
}
