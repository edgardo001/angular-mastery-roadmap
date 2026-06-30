import type { Preview } from '@storybook/angular';

// Preview: configuración global que se aplica a todas las stories
// Define parámetros como colores de fondo, matchers para controles, etc.
const preview: Preview = {
  parameters: {
    // controls: configura cómo se generan los controles en el panel de Storybook
    // matchers: define qué propiedades se interpretan como color o fecha
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // backgrounds: fondos disponibles para previsualizar componentes
    // El usuario puede cambiar el fondo desde el toolbar de Storybook
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#1a1a2e' },
        { name: 'gray', value: '#f5f5f5' },
      ],
    },
  },
};

export default preview;
