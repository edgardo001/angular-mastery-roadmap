/**
 * ARCHIVO: countries.graphql.ts - Consultas GraphQL para países
 *
 * GraphQL usa "queries" (consultas) para obtener datos del servidor.
 * A diferencia de REST donde cada endpoint devuelve todos los campos,
 * GraphQL te permite especificar exactamente qué campos quieres.
 *
 * Ejemplo de diferencia:
 * - REST: GET /api/countries → devuelve todos los campos de todos los países
 * - GraphQL: query { countries { name, capital } } → solo nombre y capital
 *
 * Analogía: Es como ordenar en un restaurante. En REST pides "el platillo
 * completo" (todos los campos). En GraphQL puedes pedir "solo la sopa y el postre"
 * (campos específicos).
 *
 * API usada: https://countries.trevorblades.com/graphql
 * - Gratuita, no requiere autenticación
 * - Contiene datos de todos los países del mundo
 * - Soporta queries con filtros y búsquedas
 */

// gql: Función de Apollo Angular que crea consultas GraphQL.
// Es un "template literal" que parsea el string GraphQL en un objeto que
// Apollo puede entender y enviar al servidor.
import { gql } from 'apollo-angular';

/**
 * GET_COUNTRIES: Consulta GraphQL para obtener todos los países.
 *
 * Estructura:
 * - query GetCountries: Define una consulta llamada "GetCountries"
 * - countries: Campo raíz que devuelve un array de países
 * - name, code, capital, currency, languages, emoji: Campos específicos
 *
 * El servidor GraphQL validará que:
 * 1. El campo "countries" existe en el schema
 * 2. Los campos solicitados existen en el tipo Country
 * 3. El usuario tiene permiso para acceder a estos campos
 */
export const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      name
      code
      capital
      currency
      languages {
        name
      }
      emoji
    }
  }
`;

/**
 * SEARCH_COUNTRIES: Consulta GraphQL para buscar países por nombre.
 *
 * GraphQL permite pasar "variables" a las consultas.
 * Las variables son parámetros que el cliente define al momento de ejecutar.
 *
 * Ejemplo de uso:
 * apollo.watchQuery({
 *   query: SEARCH_COUNTRIES,
 *   variables: { filter: { name: { contains: "Bra" } } }
 * })
 *
 * Analogía: Es como usar un filtro en Netflix. En lugar de ver todas las
 * películas, filtras por género, año, etc. Aquí filtras países por nombre.
 */
export const SEARCH_COUNTRIES = gql`
  query SearchCountries($filter: CountryFilterInput) {
    countries(filter: $filter) {
      name
      code
      capital
      currency
      languages {
        name
      }
      emoji
      continent {
        name
      }
    }
  }
`;

/**
 * GET_COUNTRY: Consulta GraphQL para obtener un país específico por código.
 *
 * El parámetro $code es de tipo ID! (obligatorio).
 * El signo "!" al final significa que el parámetro es obligatorio.
 *
 * Ejemplo de uso:
 * apollo.watchQuery({
 *   query: GET_COUNTRY,
 *   variables: { code: "BR" }
 * })
 *
 * Analogía: Es como buscar un contacto por su número de teléfono.
 * Solo necesitas el código del país para obtener toda su información.
 */
export const GET_COUNTRY = gql`
  query GetCountry($code: ID!) {
    country(code: $code) {
      name
      code
      capital
      currency
      languages {
        name
      }
      emoji
      continent {
        name
      }
    }
  }
`;

/**
 * Interfaz Country: Define la forma de un país en TypeScript.
 * Esta interfaz debe coincidir exactamente con los campos que pedimos
 * en las consultas GraphQL. Si pedimos un campo que no existe en la interfaz,
 * TypeScript marcará un error en tiempo de compilación.
 */
export interface Country {
  name: string;
  code: string;
  capital: string;
  currency: string;
  languages: { name: string }[];
  emoji: string;
  continent?: { name: string };
}

/**
 * Interfaz GetCountriesResponse: Define la forma de la respuesta del servidor.
 * La consulta GraphQL devuelve un objeto con un campo "countries" que contiene
 * el array de países.
 */
export interface GetCountriesResponse {
  countries: Country[];
}

/**
 * Interfaz GetCountryResponse: Define la forma de la respuesta para un país.
 * La consulta devuelve un objeto con un campo "country" que contiene
 * la información de un solo país.
 */
export interface GetCountryResponse {
  country: Country;
}
