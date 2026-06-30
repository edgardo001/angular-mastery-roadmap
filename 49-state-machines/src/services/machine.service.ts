// MachineService: servicio que crea actores de XState para Angular
// XState es una librería para manejar estado con máquinas de estados
// Un actor es como un "actor" de teatro: interpreta un papel (máquina) y reacciona a eventos
import { Injectable } from '@angular/core';
// createActor: función de XState que crea un actor desde una máquina
// Actor: objeto que puede recibir eventos y cambiar de estado
import { createActor, type Actor } from 'xstate';

// providedIn: 'root' = disponible en toda la aplicación
@Injectable({ providedIn: 'root' })
export class MachineService {
  // Crea y arranca un actor desde una definición de máquina
  // Recibe una máquina (definición de estados) y retorna un actor (instancia ejecutable)
  createActorFrom(machine: any): Actor<any> {
    // createActor: crea una instancia de la máquina de estados
    const actor = createActor(machine);
    actor.start(); // Inicia el actor en su estado inicial
    return actor; // Retorna el actor listo para usar
  }
}
