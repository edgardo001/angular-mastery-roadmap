/**
 * ARCHIVO: create-user.mutation.ts - Mutación GraphQL para crear usuarios
 *
 * GraphQL usa "mutations" (mutaciones) para crear, actualizar o eliminar datos.
 * A diferencia de las queries que solo leen datos, las mutations modifican
 * el estado del servidor.
 *
 * Analogía: Las queries son como "preguntar qué hay en el refrigerador".
 * Las mutations son como "agregar o quitar cosas del refrigerador".
 *
 * Ejemplo de diferencia con REST:
 * - REST: POST /api/users con body { name, email }
 * - GraphQL: mutation { createUser(name: "Juan", email: "juan@email.com") { id } }
 *
 * Ventajas de mutations GraphQL:
 * 1. Puedes especificar qué campos devolver después de la mutación
 * 2. Una sola URL para todas las operaciones CRUD
 * 3. Validación de tipos en tiempo de compilación
 */

// gql: Función de Apollo Angular que crea mutaciones GraphQL.
import { gql } from 'apollo-angular';

/**
 * CREATE_USER: Mutación GraphQL para crear un nuevo usuario.
 *
 * Estructura:
 * - mutation CreateUser($name: String!, $email: String!):
 *   Define una mutación llamada "CreateUser" con dos parámetros.
 *   El signo "!" al final significa que el parámetro es obligatorio.
 *
 * - createUser(name: $name, email: $email):
 *   Llama al resolver "createUser" en el servidor con los parámetros.
 *
 * - { id, name, email }:
 *   Campos que queremos que el servidor devuelva después de crear el usuario.
 *
 * Variables:
 * - $name: String! → Nombre del usuario (obligatorio)
 * - $email: String! → Email del usuario (obligatorio)
 *
 * Las variables se pasan desde el cliente usando Apollo.mutate().
 */
export const CREATE_USER = gql`
  mutation CreateUser($name: String!, $email: String!) {
    createUser(name: $name, email: $email) {
      id
      name
      email
    }
  }
`;

/**
 * Interfaz CreateUserInput: Define los datos necesarios para crear un usuario.
 * Coincide con los parámetros de la mutación GraphQL.
 */
export interface CreateUserInput {
  name: string;
  email: string;
}

/**
 * Interfaz CreateUserResponse: Define la forma de la respuesta del servidor.
 * La mutación devuelve el usuario creado con su ID asignado por el servidor.
 */
export interface CreateUserResponse {
  createUser: {
    id: string;   // ID asignado por el servidor (no lo genera el cliente)
    name: string;
    email: string;
  };
}
