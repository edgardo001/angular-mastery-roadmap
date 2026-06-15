## 29 — Internacionalización (i18n)

i18n en Angular con `@angular/localize`: traducciones, pluralización, selección, detección de idioma.

### Conceptos Clave

- **`@angular/localize`**: `$localize`, `ng extract-i18n`
- **Templates i18n**: `i18n` attribute, `i18n-*` para attributes
- **Traducciones**: archivos XLIFF (`.xlf`), JSON, o AOT
- **Pluralización**: `plural`, `=0 {no items} one {# item} other {# items}`
- **Selección**: `select`, gender/option selection
- **Detección de idioma**: `navigator.language`, guardar preferencia
- **Cambio de idioma en runtime**: recarga de app o lazy-load de traducciones
- **`LOCALE_ID`**: provider para locale activo
- **`registerLocaleData`**: registrar datos locales (fechas, monedas, números)

### Proyecto

App multi-idioma (es/en/fr) con selector de idioma, pluralización, formatos de fecha/moneda localizados.

### Ejercicios

1. Configura `@angular/localize` en el proyecto
2. Marca textos del template con `i18n`
3. Extrae traducciones con `ng extract-i18n`
4. Implementa cambio de idioma en runtime
5. Usa `plural` y `select` para contenido condicional por locale

### Cómo ejecutar

```bash
cd 29-i18n
npm install
ng serve
```
