// Historias de Storybook para el componente Button
// Las stories permiten probar y documentar cada variante del botón de forma aislada
import type { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from './button';

// Meta: define los metadatos de la story (qué componente se usa, qué controles tiene)
const meta: Meta<ButtonComponent> = {
  // title: ruta donde aparece en el panel de Storybook (Design System > Button)
  title: 'Design System/Button',
  component: ButtonComponent,
  // autodocs: genera documentación automáticamente desde los tipos y argTypes
  tags: ['autodocs'],
  // argTypes: define los controles interactivos que aparecen en el panel de Storybook
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'outline', 'ghost'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
  },
};

export default meta;
// StoryObj: tipo que representa una historia individual con sus argumentos
type Story = StoryObj<ButtonComponent>;

// Cada export es una story independiente que se muestra en Storybook
export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
  },
  render: (args) => ({
    props: args,
    template: `<app-button [variant]="variant" [size]="size" [disabled]="disabled">Botón Primary</app-button>`,
  }),
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'md',
    disabled: false,
  },
  render: (args) => ({
    props: args,
    template: `<app-button [variant]="variant" [size]="size" [disabled]="disabled">Botón Secondary</app-button>`,
  }),
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    size: 'md',
    disabled: false,
  },
  render: (args) => ({
    props: args,
    template: `<app-button [variant]="variant" [size]="size" [disabled]="disabled">Botón Outline</app-button>`,
  }),
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    size: 'md',
    disabled: false,
  },
  render: (args) => ({
    props: args,
    template: `<app-button [variant]="variant" [size]="size" [disabled]="disabled">Botón Ghost</app-button>`,
  }),
};

export const Small: Story = {
  args: { variant: 'primary', size: 'sm' },
  render: (args) => ({
    props: args,
    template: `<app-button [variant]="variant" [size]="size">Small</app-button>`,
  }),
};

export const Large: Story = {
  args: { variant: 'primary', size: 'lg' },
  render: (args) => ({
    props: args,
    template: `<app-button [variant]="variant" [size]="size">Large</app-button>`,
  }),
};

export const Disabled: Story = {
  args: { variant: 'primary', size: 'md', disabled: true },
  render: (args) => ({
    props: args,
    template: `<app-button [variant]="variant" [size]="size" [disabled]="disabled">Disabled</app-button>`,
  }),
};
