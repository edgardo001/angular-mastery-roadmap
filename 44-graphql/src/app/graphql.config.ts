/**
 * ARCHIVO: graphql.config.ts - Configuración del cliente Apollo GraphQL
 *
 * Apollo Angular es el cliente GraphQL oficial para Angular.
 * Este archivo configura cómo la aplicación se conecta al servidor GraphQL,
 * incluyendo la URL del servidor, la caché de datos y las opciones por defecto.
 *
 * Analogía: Es como configurar una conexión a una base de datos.
 * Le dices al cliente a qué servidor conectarse (uri), cómo almacenar
 * los datos localmente (cache), y qué estrategia usar para obtener datos.
 *
 * GraphQL permite al cliente especificar exactamente qué datos necesita.
 * A diferencia de REST (múltiples endpoints), GraphQL usa UN solo endpoint
 * y el cliente define la "forma" de la respuesta.
 */

// APOLLO_OPTIONS: Token de inyección que define la configuración de Apollo.
import { APOLLO_OPTIONS } from 'apollo-angular';

// HttpLink: Crea conexiones HTTP al servidor GraphQL para queries y mutations.
import { HttpLink } from 'apollo-angular/http';

// InMemoryCache: Caché en memoria que almacena resultados de consultas.
// Cuando haces la misma consulta dos veces, Apollo usa la caché en lugar
// de hacer otra petición al servidor (si los datos no han cambiado).
import { InMemoryCache } from '@apollo/client/core';

/**
 * appApolloOptions: Configuración de Apollo Angular.
 *
 * Usa la API pública de países de Trevor Blades:
 * https://countries.trevorblades.com/graphql
 *
 * Esta API es ideal para aprender porque:
 * - No requiere autenticación (API key)
 * - Tiene datos reales de todos los países del mundo
 * - Soporta queries, mutations y subscriptions
 * - Es gratuita y está siempre disponible
 */
export const appApolloOptions = [
  {
    provide: APOLLO_OPTIONS,
    /**
     * useFactory: Función que crea la configuración de Apollo.
     * Se usa "factory" en lugar de "useClass" porque necesitamos
     * crear un objeto de configuración, no una instancia de clase.
     *
     * @param httpLink - Servicio HTTP que Apollo usa para comunicarse con el servidor
     */
    useFactory(httpLink: HttpLink) {
      return {
        /**
         * cache: Caché en memoria para los resultados de las consultas.
         * Apollo almacena cada respuesta en la caché y la reutiliza
         * cuando alguien hace la misma consulta.
         */
        cache: new InMemoryCache(),

        /**
         * link: Conexión al servidor GraphQL.
         * httpLink.create({ uri: '...' }) crea una conexión HTTP
         * a la URL del servidor GraphQL.
         *
         * Usamos la API pública de países de Trevor Blades que:
         * - Contiene datos de todos los países del mundo
         * - No requiere autenticación
         * - Soporta queries complejas con filtros
         */
        link: httpLink.create({
          uri: 'https://countries.trevorblades.com/graphql',
        }),

        /**
         * defaultOptions: Opciones por defecto para todas las consultas.
         *
         * fetchPolicy: 'cache-and-network' significa que:
         * 1. Primero muestra datos de la caché (instantáneo)
         * 2. Luego hace una petición al servidor para obtener datos frescos
         * 3. Si los datos del servidor son diferentes, actualiza la caché y la UI
         *
         * Esto es como verificar tu correo: primero ves lo que ya tienes guardado,
         * luego revisas si hay correos nuevos.
         */
        defaultOptions: {
          watchQuery: { fetchPolicy: 'cache-and-network' },
        },
      };
    },
    /**
     * deps: Lista de dependencias que la factory necesita.
     * Angular inyectará automáticamente HttpLink en la factory.
     */
    deps: [HttpLink],
  },
];
