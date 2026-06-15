import { Injectable } from '@angular/core';
import { createActor, type Actor } from 'xstate';

@Injectable({ providedIn: 'root' })
export class MachineService {
  createActorFrom(machine: any): Actor<any> {
    const actor = createActor(machine);
    actor.start();
    return actor;
  }
}
