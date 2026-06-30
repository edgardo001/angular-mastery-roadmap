/**
 * ARCHIVO: users.query.ts - Consulta GraphQL para obtener usuarios
 *
 * GraphQL usa "queries" (consultas) para obtener datos del servidor.
 * A diferencia de REST donde cada endpoint devuelve todos los campos,
 * GraphQL te permite especificar exactamente qué campos quieres.
 *
 * Ejemplo de diferencia:
 * - REST: GET /api/users → devuelve todos los campos de todos los usuarios
 * - GraphQL: query { users { id, name } } → solo devuelve id y name
 *
 * Analogía: Es como ordenar en un restaurante. En REST pides "el platillo
 * completo" (todos los campos). En GraphQL puedes pedir "solo la sopa y el postre"
 * (campos específicos).
 *
 * Ventajas de GraphQL:
 * 1. El cliente pide solo lo que necesita (no sobran datos)
 * 2. Una sola URL para todas las consultas (no múltiples endpoints)
 * 3. Tipado fuerte: el servidor valida que pidas campos que existen
 */

// gql: Función de Apollo Angular que crea consultas GraphQL.
// Es un "template literal" que parsea el string GraphQL en un objeto que
// Apollo puede entender y enviar al servidor.
import { gql } from 'apollo-angular';

/**
 * GET_USERS: Consulta GraphQL para obtener la lista de usuarios.
 *
 * Estructura:
 * - query GetUsers: Define una consulta llamada "GetUsers"
 * - users: Campo raíz que devuelve un array de usuarios
 * - id, name, email: Campos específicos que queremos de cada usuario
 *
 * El servidor GraphQL validará que:
 * 1. El campo "users" existe
 * 2. Los campos "id", "name", "email" existen en el tipo User
 * 3. El usuario tiene permiso para acceder a estos campos
 */
export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
    }
  }
`;

/**
 * Interfaz User: Define la forma de un usuario en TypeScript.
 * Esta interfaz debe coincidir exactamente con los campos que pedimos
 * en la consulta GraphQL. Si pedimos un campo que no existe en la interfaz,
 * TypeScript marcará un error en tiempo de compilación.
 */
export interface User {
  id: string;
  name: string;
  email: string;
}

/**
 * Interfaz GetUsersResponse: Define la forma de la respuesta del servidor.
 * La consulta GraphQL devuelve un objeto con un campo "users" que contiene
 * el array de usuarios.
 */
export interface GetUsersResponse {
  users: User[];
}
