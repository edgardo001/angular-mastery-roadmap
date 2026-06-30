import type { StorybookConfig } from '@storybook/angular';

// Configuración principal de Storybook
// Storybook es un herramienta para desarrollar y documentar componentes de forma aislada
// Cada componente se "historiza" para que se pueda interactuar con él sin levantar la app completa
const config: StorybookConfig = {
  // stories: dónde buscar los archivos .stories.ts
  // Busca recursivamente en src/app cualquier archivo que termine en .stories.ts o .stories.tsx
  stories: ['../app/**/*.stories.@(ts|tsx)'],
  // addons: extensiones que agregan funcionalidad a Storybook
  // addon-essentials: incluye docs, controls, actions, viewport, toolbars
  // addon-interactions: permite testing interactivo de componentes
  // addon-a11y: verifica accesibilidad (contrastos, ARIA, etc.)
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
  ],
  // framework: le dice a Storybook cómo compilar los componentes Angular
  framework: {
    name: '@storybook/angular',
    options: {},
  },
};

export default config;
