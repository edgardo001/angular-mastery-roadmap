// =============================================================================
// ARCHIVO: button.stories.ts
// PROPÓSITO: Historias de Storybook para el componente Button
// =============================================================================
//
// Define configuraciones (stories) para el componente Button que se
// pueden ver y probar en Storybook. Cada story es una variación del botón
// con diferentes props (label, variant, etc.)
//
// Storybook es invaluable para equipos de desarrollo porque:
// 1. Los diseñadores pueden ver los componentes sin necesidad de codear
// 2. Los desarrolladores pueden probar edge cases fácilmente
// 3. La documentación se genera automáticamente
// 4. Se pueden hacer pruebas visuales de regresión
// =============================================================================

// Meta: Configuración metadata de las historias
// StoryObj: Tipo para cada historia individual
import type { Meta, StoryObj } from '@storybook/angular';

// Componente Button que se va a documentar
import { ButtonComponent } from './button.component';

// Configuración general de todas las historias de este archivo
const meta: Meta<ButtonComponent> = {
  // Ubicación en el sidebar: Components → Button
  title: 'Components/Button',
  component: ButtonComponent,

  // Genera documentación automáticamente
  tags: ['autodocs'],

  // Controles del panel de Storybook
  argTypes: {
    // variant: Control desplegable (select) con dos opciones
    // 'primary' = botón azul, 'secondary' = botón gris
    // El diseñador puede cambiar entre opciones desde la UI
    variant: { control: 'select', options: ['primary', 'secondary'] },
  },
};

export default meta;
type Story = StoryObj<ButtonComponent>;

// =============================================================================
// HISTORIAS: Configuraciones diferentes del botón
// =============================================================================

// Botón primario (azul) con texto "Click me"
export const Primary: Story = {
  args: { label: 'Click me', variant: 'primary' },
};

// Botón secundario (gris) con texto "Cancel"
export const Secondary: Story = {
  args: { label: 'Cancel', variant: 'secondary' },
};

// Botón con texto largo para probar cómo se comporta el layout
// (¿el texto se trunca? ¿el botón crece? ¿se ve bien?)
export const LongLabel: Story = {
  args: { label: 'Guardar cambios permanentemente', variant: 'primary' },
};
