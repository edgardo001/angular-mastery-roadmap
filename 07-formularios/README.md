## 07 — Formularios Reactivos

Reactive Forms en Angular: FormGroup, FormControl, FormArray, validación síncrona/asíncrona, y FormRecord.

> **Propósito:** Crear formularios complejos con validación reactiva usando FormBuilder, FormArray, validadores personalizados y async validators.
>
> **Problema que resuelve:** Los formularios HTML nativos no tienen validación robusta, manejo de estado complejo ni soporte para formularios dinámicos anidados.
>
> **Cómo lo resuelve:** Angular Reactive Forms proporcionan un modelo de datos inmutable, validación síncrona/asíncrona, FormArray para grupos dinámicos y control total sobre el estado.
>
> **Por qué aprenderlo:** Los formularios son la interacción más común en apps empresariales; Angular Forms es el sistema más maduro del ecosistema frontend.

### Conceptos Clave

- **`FormControl`**: control individual con valor y validación
- **`FormGroup`**: grupo de controles anidados
- **`FormArray`**: array dinámico de controles
- **`FormRecord`**: diccionario de controles (nuevo en Angular)
- **Validadores**: `Validators.required`, `Validators.email`, `Validators.pattern`, `Validators.minLength`
- **Validadores personalizados**: funciones que retornan `ValidationErrors | null`
- **Validación asíncrona**: `AsyncValidatorFn`, verificación contra API
- **`form.status`, `form.value`, `form.errors`**: observables de estado
- **`valueChanges`, `statusChanges`**: streams reactivos del formulario
- **Form Bindings**: `[formGroup]`, `formControlName`, `formArrayName`

### Proyecto

Formulario de registro multi-step con validación: datos personales, dirección, preferencias y resumen.

### Ejercicios

1. Crea un `FormGroup` con validaciones básicas
2. Implementa un validador personalizado (contraseñas coinciden)
3. Añade un `FormArray` para teléfonos dinámicos
4. Agrega validación asíncrona (email único contra API)
5. Resetea y parcha valores con `patchValue` y `reset`

### Cómo ejecutar

```bash
cd 07-formularios
npm install
ng serve
```
