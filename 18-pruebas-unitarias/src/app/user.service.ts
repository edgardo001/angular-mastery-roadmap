/**
 * SERVICIO DE USUARIOS (UserService)
 * ===================================
 *
 * Un SERVICIO en Angular es como un "asistente personal" que se encarga
 * de una tarea específica. Este servicio se encarga de OBTENER datos de usuarios
 * desde un servidor web (API REST).
 *
 * ANÁLOGÍA: Es como un mensajero que va a buscar información al ayuntamiento
 * y te la trae de vuelta. Tú solo le dices qué necesitas y él va y viene.
 *
 * PALABRAS CLAVE:
 * - @Injectable: Le dice a Angular "esta clase puede ser usada como servicio".
 * - providedIn: 'root': Significa que el servicio está disponible en TODA la app.
 * - HttpClient: Herramienta para hacer peticiones HTTP (como un navegador web).
 * - Observable: Es un "tubo" por donde fluyen datos. Los datos llegarán después.
 * - Signal: Variable reactiva que Angular vigila automáticamente.
 */

// Injectable es un decorador que marca esta clase como un servicio inyectable
import { Injectable } from '@angular/core';

// HttpClient permite hacer peticiones web (GET, POST, PUT, DELETE)
import { HttpClient } from '@angular/common/http';

// Observable es un tipo de dato que representa una operación asincrónica
// Los datos vendrán en algún momento del futuro (como una promesa pero diferente)
import { Observable } from 'rxjs';

// Interfaz que define la estructura de un usuario
// Es como un "molde" que dice qué campos tiene un usuario
export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

// providedIn: 'root' hace que el servicio esté disponible globalmente
// Es como tener un único mensajero para toda la empresa
@Injectable({ providedIn: 'root' })
export class UserService {
  // URL base de la API de donde obtendremos los datos
  // Es como la dirección del edificio donde está el ayuntamiento
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';

  // constructor: Se ejecuta cuando Angular crea el servicio
  // "private http" significa queHttpClient está disponible en toda la clase
  // Es como contratar al mensajero y darle acceso al teléfono
  constructor(private http: HttpClient) {}

  // Método que obtiene TODOS los usuarios
  // Retorna un Observable<User[]> - un "tubo" que emitirá un array de usuarios
  getUsers(): Observable<User[]> {
    // http.get hace una petición GET al servidor
    // <User[]> le dice a TypeScript que espere un array de usuarios
    return this.http.get<User[]>(this.apiUrl);
  }

  // Método que obtiene UN SOLO usuario por su ID
  // El ID es un número único que identifica a cada usuario
  getUser(id: number): Observable<User> {
    // Template literal (backticks): Permite insertar variables con ${variable}
    // Es como un "rellena espacios" pero para código
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }
}
