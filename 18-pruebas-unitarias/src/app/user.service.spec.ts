/**
 * PRUEBAS UNITARIAS DEL SERVICIO DE USUARIOS (UserService)
 * =========================================================
 *
 * Este archivo contiene pruebas que verifican que el UserService funciona correctamente.
 * Las pruebas unitarias verifican UNA COSA A LA VEZ, como probar cada pieza
 * de un rompecabezas antes de armarlo completo.
 *
 * ANÁLOGÍA: Es como un control de calidad en una fábrica. Cada pieza se prueba
 * individualmente antes de pasar a la siguiente estación de trabajo.
 *
 * HERRAMIENTAS PRINCIPALES:
 * - TestBed: Crea un "mini-Angular" para probar componentes y servicios
 * - HttpTestingController: Simula peticiones HTTP sin conectar a internet
 * - describe(): Agrupa pruebas relacionadas (como un capítulo de un libro)
 * - it(): Define UNA prueba específica (como una pregunta en un examen)
 * - expect(): Verifica que algo sea verdad (como un detective confirmando pistas)
 *
 * FLUJO DE CADA PRUEBA:
 * 1. Configurar el entorno de prueba (TestBed)
 * 2. Ejecutar la función a probar
 * 3. Verificar el resultado con expect()
 * 4. Limpiar después de la prueba
 */

// TestBed crea un entorno de prueba aislado para cada grupo de tests
import { TestBed } from '@angular/core/testing';

// HttpClientTestingModule: Simula peticiones HTTP sin hacer llamadas reales
// HttpTestingController: Permite interceptar y responder peticiones simuladas
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

// Importamos el servicio y la interfaz que vamos a probar
import { UserService, User } from './user.service';

// describe(): Agrupa pruebas relacionadas. Es como un "capítulo" de pruebas.
// Aquí decimos: "estas pruebas son para UserService"
describe('UserService', () => {
  // Variables que se usarán en todas las pruebas de este grupo
  let service: UserService;
  let httpMock: HttpTestingController;

  // beforeEach(): Se ejecuta ANTES de cada prueba individual.
  // Es como preparar la mesa antes de cada comida.
  beforeEach(() => {
    // Configura el entorno de prueba con el módulo de HTTP testing
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });

    // inject(): Obtiene una instancia del servicio desde el contenedor de inyección
    // Es como pedirle al "administrador" que te dé un servicio específico
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  // afterEach(): Se ejecuta DESPUÉS de cada prueba.
  // Verifica que no hayan quedado peticiones HTTP sin resolver.
  afterEach(() => {
    // verify(): Asegura que todas las peticiones fueron manejadas
    // Es como revisar que no quedaron platos sucios después de comer
    httpMock.verify();
  });

  // it(): Define una prueba individual.
  // El primer parámetro es la descripción de qué se está probando
  it('should fetch users', () => {
    // Datos de prueba simulados (mock data)
    // Son como actores en una obra de teatro:simulan datos reales
    const mockUsers: User[] = [
      { id: 1, name: 'Leanne Graham', email: 'leanne@example.com', username: 'bret' },
      { id: 2, name: 'Ervin Howell', email: 'ervin@example.com', username: 'antonette' },
    ];

    // subscribe(): Escucha cuando el Observable emita datos
    // Es como suscribirse a un periódico: recibes la información cuando llega
    service.getUsers().subscribe((users: User[])) => {
      // expect(): Verifica que el resultado sea el esperado
      // toBe(): Verifica igualdad exacta (===)
      expect(users.length).toBe(2);
      // toEqual(): Verifica que dos objetos tengan los mismos valores
      expect(users).toEqual(mockUsers);
    });

    // expectOne(): Espera que se haya hecho UNA petición a esta URL
    // Es como tener un detector de llamadas telefónicas
    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
    // Verifica que el método HTTP sea GET (no POST, PUT, etc.)
    expect(req.request.method).toBe('GET');
    // flush(): Simula la respuesta del servidor con nuestros datos mock
    // Es como el servidor devolviendo la información que pedimos
    req.flush(mockUsers);
  });

  // Prueba para obtener un solo usuario por su ID
  it('should fetch a single user by id', () => {
    const mockUser: User = {
      id: 1,
      name: 'Leanne Graham',
      email: 'leanne@example.com',
      username: 'bret',
    };

    service.getUser(1).subscribe((user: User) => {
      expect(user).toEqual(mockUser);
    });

    // Verifica que la petición fue a la URL correcta con el ID 1
    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });

  // Prueba para manejar errores de red (cuando el servidor falla)
  it('should handle network error', () => {
    service.getUsers().subscribe({
      // error(): Se ejecuta cuando hay un error en la petición
      error: (error: { status: number }) => {
        // Verifica que el código de error sea 500 (Error Interno del Servidor)
        expect(error.status).toBe(500);
      },
    });

    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
    // flush() con error: Simula un error del servidor
    // Es como si el servidor respondiera "no puedo atenderte ahora"
    req.flush('Server error', { status: 500, statusText: 'Internal Server Error' });
  });
});
