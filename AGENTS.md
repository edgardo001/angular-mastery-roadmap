# Reglas para Ejemplos Angular

## Agentes

Cada ejemplo debe ser revisado por 10 agentes antes de ser publicado:

> **Nota:** Se pueden usar **múltiples agentes en cada sesión** para acelerar el proceso de revisión. Cada agente puede trabajar de forma independiente o en paralelo.

### Líder Técnico
- **Aprueba o rechaza** el ejemplo final para publicación
- Revisa que el ejemplo sea **consistente** con el resto del roadmap
- Verifica que los **conceptos se enseñen en el orden correcto** (prerequisitos)
- Asegura que el ejemplo **no duplique** contenido de otro módulo
- Valida que el **nivel de dificultad** sea apropiado para la secuencia
- Coordina a los demás agentes y resuelve conflictos entre revisiones

### Arquitecto
- Verifica que el ejemplo use **patrones de diseño estándar** de la industria
- Valida que la **estructura del proyecto** siga convenciones Angular (carpetas, nombres, separación de responsabilidades)
- Asegura que el ejemplo sea **escalable** y **mantenible** en un entorno empresarial
- Revisa que no haya **code smells** o malas prácticas

### Profesor
- Verifica que el README tenga las 4 secciones obligatorias (Propósito, Problema, Cómo lo resuelve, Por qué aprenderlo)
- Asegura que el código esté **comentado desde cero** para alguien que no sabe Angular
- Valida que los **diagramas Mermaid** sean claros y correctos
- Revisa que las **analogías del mundo real** faciliten la comprensión
- Asegura que el **glosario** explique cada palabra clave nueva

### Desarrollador
- Verifica que el código **compile sin errores** (`ng build`)
- Valida que el ejemplo **funcione correctamente** (`ng serve`)
- Revisa que el **tsconfig.json** tenga `rootDir: "./src"` configurado en `compilerOptions`
- Revisa que el **tsconfig.app.json** tenga `rootDir: "./src"` explícito (no solo heredado)
- Asegura que el **angular.json** use el builder actualizado (`@angular/build:dev-server`)
- Confirma que el ejemplo **no tenga dependencias faltantes**

### QA (Quality Assurance)
- Verifica que el ejemplo **funcione en diferentes escenarios** (happy path y edge cases)
- Valida que los **formularios tengan validación** correctamente implementada
- Revisa que los **estados de carga, éxito y error** estén cubiertos
- Asegura que el ejemplo **no tenga bugs visibles** en la interfaz
- Confirma que la **experiencia del usuario** sea fluida sin errores

### Diseñador UI/UX
- Verifica que el ejemplo tenga **diseño limpio y profesional**
- Valida que los **colores, espaciados y tipografía** sean consistentes
- Revisa que el ejemplo sea **responsive** (funcione en móvil y escritorio)
- Asegura que la **experiencia de usuario** sea intuitiva y clara
- Valida que los **estilos usen buenas prácticas** (CSS scoped, variables, etc.)

### Seguridad
- Verifica que no haya **secrets, API keys o credenciales** hardcodeadas
- Valida que el ejemplo use **sanitización de datos** donde sea necesario
- Revisa que no haya **XSS vulnerabilities** en el template (innerHTML, etc.)
- Asegura que el ejemplo **no exponga información sensible**
- Valida que los **formularios** tengan protección contra inyección

### DevOps
- Verifica que el ejemplo **compile correctamente** para producción (`ng build --configuration production`)
- Valida que el **`package.json`** tenga scripts de build, serve y test configurados
- Revisa que el **`angular.json`** tenga configuraciones de producción y desarrollo separadas
- Asegura que el ejemplo **no tenga warnings** en el build
- Valida que los **assets y styles** estén correctamente referenciados
- Confirma que el proyecto use **versiones estables** de dependencias
- Revisa que el ejemplo esté **listo para desplegar** en un servidor estático o CDN

### Rendimiento (Secundario)
- Revisa que el ejemplo use **OnPush change detection** cuando sea apropiado
- Valida que listas usen **trackBy** para evitar re-renders innecesarios
- Verifica que no haya **memoria leak** (suscripciones sin unsubscribe, timers sin clear)
- Asegura que imágenes y recursos pesados estén **optimizados** o tengan lazy loading
- Revisa que el ejemplo no haga **llamadas HTTP redundantes** o fuera de contexto

### Testing (Secundario)
- Verifica que el ejemplo tenga **unit tests** básicos (al menos 1 spec por componente)
- Valida que los tests cubran **casos normales y edge cases** simples
- Revisa que los tests usen ** TestBed** correctamente
- Asegura que los mocks/stubs sigan **buenas prácticas**
- Confirma que los tests **pasen sin errores** (`ng test`)

### Documentación (Secundario)
- Verifica que el **glosario** sea completo y explique todos los términos nuevos
- Revisa que las **analogías del mundo real** sean fáciles de entender para un principiante
- Valida que los **diagramas Mermaid** sean claros, correctos y estén bien etiquetados
- Asegura que las **instrucciones de ejecución** sean precisas y estén actualizadas
- Revisa que la **tabla de archivos** incluya todos los archivos del proyecto

### Alumno
- **Lee y entiende** el ejemplo como si fuera la primera vez que ve el concepto
- **Hace preguntas** sobre partes del código que no sean claras o estén mal explicadas
- **Toma notas** de los conceptos clave, atajos y patrones aprendidos
- **Identifica lagunas**: si falta una explicación, la señala para que el Profesor la agregue
- **Resume** cada concepto en sus propias palabras para verificar comprensión
- **Propone ejercicios** adicionales que refuercen el aprendizaje
- **Verifica que las analogías** sean fáciles de entender para un principiante
- **Detecta jerga técnica** no explicada y pide que se agregue al glosario
- **Evalúa la curva de aprendizaje**: ¿es posible entender este ejemplo sin haber visto los anteriores?
- **Sugiere mejoras** al orden de explicación si algo resulta confuso

### Git
- **Hace commits atómicos**: un commit por cambio lógico (no mezclar docs con fix, ni fix con feature)
- **Usa convención de mensajes** [Conventional Commits](https://www.conventionalcommits.org/):
  - `feat(scope):` — nueva funcionalidad o ejemplo
  - `fix(scope):` — corrección de bugs o errores de compilación
  - `docs(scope):` — cambios en README, comentarios, documentación
  - `refactor(scope):` — reestructuración sin cambiar comportamiento
  - `style(scope):` — cambios de formato, espacios, indentación
  - `chore(scope):` — dependencias, configs, archivos auxiliares
  - `perf(scope):` — mejoras de rendimiento
  - `test(scope):` — agregar o modificar tests
  - `ci(scope):` — cambios en pipelines CI/CD
- **El scope es el número del módulo**: `feat(05):`, `fix(06):`, `docs(08):`
- **Usa body explicativo** cuando el commit no es obvio (qué cambió y por qué)
- **Commits convencionales en inglés**, messages claros y descriptivos
- **No commitea** `node_modules/`, `dist/`, `.angular/`, ni archivos temporales
- **Verifica el estado** antes de commitear (`git status`, `git diff`)
- **Hace push** solo cuando el Líder Técnico aprueba la revisión completa

---

## Estructura del README.md

Cada README.md debe seguir esta estructura:

```markdown
## NN — Nombre del Ejemplo

### Propósito
Qué se aprende en este ejemplo (1-2 oraciones).

### Problema que resuelve
Por qué existe este concepto. Qué pasa si no lo usas.

### Cómo lo resuelve
La solución de Angular. Cómo el concepto elimina el problema.

### Por qué aprenderlo
Relevancia en el mundo real. Dónde lo usarás en tu trabajo.

### Conceptos
Cada concepto con:
- **Qué es** — explicación simple
- **Por qué importa** — conexión con Angular
- **Código** — ejemplo comentado
- **Analogía** — comparación con el mundo real

### Ejercicios
Práctica del concepto aprendido.

### Cómo ejecutar
Instrucciones para ejecutar el ejemplo.

### Archivos del Proyecto
Tabla con cada archivo y su propósito.
```

## Código

- Todos los archivos `.ts` deben estar comentados desde cero
- Los comentarios deben explicar para alguien que no sabe Angular
- Cada sección del código debe tener una explicación simple
- Usar analogías del mundo real cuando sea posible (LEGO, pelotas, elevadores, etc.)
- Explicar cada palabra clave que aparezca en el código

## Diagramas

- Usar Mermaid para todos los diagramas
- Tipos de diagramas:
  - **flowchart** — para mostrar jerarquías y flujos
  - **sequenceDiagram** — para interacciones entre componentes
  - **graph** — para estructuras y relaciones
- Los diagramas deben ser visuales y fáciles de entender

## Enfoque

- Cada ejemplo solo debe enfocarse al caso específico de aprendizaje
- No mezclar conceptos que no son parte del ejemplo
- Mantener el código simple y directo
- Si el ejemplo necesita un glosario de términos nuevos, incluirlo

## Casos de Uso Empresariales

- Los ejemplos deben ser **soluciones reales** aplicables a entornos empresariales
- Usar **modelos estandarizados** de desarrollo que la industria utiliza
- No implementar funcionalidades complejas o exóticas
- Enfocarse en lo que se usa **a diario** en equipos de desarrollo profesionales
- Ejemplos de casos reales: formularios CRUD, dashboards, listas con filtros, autenticación básica, consumo de APIs

## Errores Más Frecuentes de Programadores (y cómo solucionarlos)

| # | Error | Causa | Solución |
|---|-------|-------|----------|
| 1 | **Confundir signals con RxJS** | Usar `signal()` para streams asíncronos o `Observable` para estado síncrono | Signals: estado síncrono (`signal`, `computed`). RxJS: streams asíncronos, WebSocket, debounce. Convierte con `toSignal()` / `toObservable()`. |
| 2 | **Mutar arrays/objetos directamente** | `items.update(arr => { arr.push(x); return arr; })` | Signals necesitan inmutabilidad: `items.update(arr => [...arr, x])` o `structuredClone`. Igual con objetos: `obj.update(o => ({...o, key: val}))`. |
| 3 | **Olvidar providers** | `NullInjectorError: No provider for HttpClient` | En Angular standalone todo se `provide`: `provideHttpClient()`, `provideRouter()`, `provideAnimations()`. Se configura en `app.config.ts`. |
| 4 | **No usar `track` en `@for`** | Error de compilación: "FOR loop must use 'track'" | El nuevo `@for` exige `track`: `@for (item of items; track item.id)`. Mejora rendimiento y evita bugs de reconciliación. |
| 5 | **Mezclar `*ngIf`/`@if`** | Usar `*ngIf` y `@if` en el mismo template | Angular 22 usa solo el nuevo control flow. Migra todo a `@if`/`@for`/`@switch`. Son más legibles y performantes. |
| 6 | **Usar `async` pipe con signals** | `{{ signal$ \| async }}` donde `signal$` es una `Signal` | Las signals **son funciones**: `{{ mySignal() }}`. No necesitan `async` pipe. Solo usa `async` pipe con Observables. |
| 7 | **No importar pipes/directivas** | `No pipe found with name 'currency'` | Standalone components deben importar explícitamente: `imports: [CurrencyPipe, DatePipe]`. Lo mismo con directivas y componentes. |
| 8 | **Olvidar `rootDir` en tsconfig.json** | Error TS6304: "The common source directory is './src'. The 'rootDir' setting must be explicitly set" | Agregar `"rootDir": "./src"` en `compilerOptions` del `tsconfig.json`. Sin esto, TypeScript no sabe dónde empiezan los archivos fuente y falla al compilar. |
| 9 | **No limpiar effects/suscripciones** | Memory leaks, efectos que se ejecutan después de destruir el componente | Usa `DestroyRef` + `takeUntilDestroyed()` para RxJS, y `effect({ manualCleanup: true })` o retorna cleanup function para effects. |
| 10 | **Usar `@Input()` y `input()` mezclados** | Inconsistencia en el código, confusión en el equipo | Elige un patrón por proyecto. Para código nuevo usa `input()` / `output()` signals. Para migración progresiva, manten el decorador `@Input()`. |
| 11 | **No tipar genéricos en señales** | `signal([])` infiere `Signal<never[]>` | Tipa siempre: `signal<Product[]>([])` o usa `signal<Product[]>([])` para que las operaciones tengan tipos correctos. |
| 12 | **Asumir que `effect()` es como `useEffect` de React** | Ejecutar lógica asíncrona sin manejo de timing | `effect()` corre dentro del ciclo de detección de Angular. Para operaciones DOM usa `afterNextRender()`. Para debounce usa RxJS + `toSignal()`. |
| 13 | **Olvidar que `@defer` necesita triggers** | Carga diferida que no se dispara nunca | Usa triggers: `@defer (on viewport)`, `@defer (on interaction)`, `@defer (on timer(5s))`. Sin trigger, el contenido no se carga. |
| 14 | **No separar responsabilidades** | Lógica de negocio dentro de componentes | Los componentes solo manejan UI/presentación. La lógica va en servicios o signals stores. Patrón: componentes "tontos" + servicios "inteligentes". |

---

## Memoria del Proyecto (MEMORY.md)

Cada vez que se descubra un nuevo conocimiento, patrón, error, o decisión importante, se debe documentar en el archivo `MEMORY.md` de la raíz del repositorio. Esto garantiza que el conocimiento no se pierda entre iteraciones.

### Qué documentar en MEMORY.md

- **Errores encontrados y solucionados**: qué falló, por qué, y cómo se arregló
- **Decisiones de arquitectura**: por qué se eligió un patrón sobre otro
- **Configuraciones importantes**: tsconfig, angular.json, dependencias críticas
- **Convenciones del proyecto**: naming, estructura de carpetas, estilos de código
- **Lessons learned**: cosas que funcionaron o no funcionaron
- **Dependencias problemáticas**: librerías que causan conflictos o requieren workarounds

### Formato de MEMORY.md

```markdown
# Memoria del Proyecto — Angular Mastery Roadmap

## Errores y Soluciones

| Fecha | Proyecto | Error | Causa | Solución |
|-------|----------|-------|-------|----------|
| 2025-01 | 06-ciclo-vida | `afterEveryRender` no existe | API inexistente en Angular | Cambiar a `afterRender` |
| 2025-01 | 05-10 | TS6304 rootDir | Falta rootDir en tsconfig | Agregar `"rootDir": "./src"` |

## Decisiones de Arquitectura

| Fecha | Decisión | Razón |
|-------|----------|-------|
| 2025-01 | Standalone components en todos los ejemplos | Angular 22+ usa standalone por defecto |

## Convenciones

| Fecha | Convención | Detalle |
|-------|------------|---------|
| 2025-01 | Comentarios desde cero | Todo .ts debe tener comentarios explicativos |
| 2025-01 | Analogías del mundo real | Cada concepto debe tener una analogía |

## Dependencias

| Paquete | Versión | Notas |
|---------|---------|-------|
| @angular/core | ^22.0.0 | Versión mínima del roadmap |
| zone.js | ~0.15.0 | Requerido para change detection |
```

### Regla para todos los agentes

> **Antes de cerrar una sesión de revisión o trabajo**, preguntarse:
> 1. ¿Encontré algo nuevo que otros no saben? → Documentar en MEMORY.md
> 2. ¿Resolví un error que podría repetirse? → Documentar en MEMORY.md
> 3. ¿Tomé una decisión de diseño? → Documentar en MEMORY.md
> 4. ¿Aprendí algo sobre la configuración? → Documentar en MEMORY.md
