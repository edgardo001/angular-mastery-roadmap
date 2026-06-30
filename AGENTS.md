# Reglas para Ejemplos Angular

## Agentes

Cada ejemplo debe ser revisado por 8 agentes antes de ser publicado:

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
- Revisa que el **tsconfig.json** tenga `rootDir` configurado
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
