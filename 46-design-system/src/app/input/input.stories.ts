// Historias de Storybook para el componente Input
// Muestra diferentes estados del campo: normal, con error, con helper, deshabilitado
import type { Meta, StoryObj } from '@storybook/angular';
import { InputComponent } from './input';

const meta: Meta<InputComponent> = {
  title: 'Design System/Input',
  component: InputComponent,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number'],
    },
    placeholder: { control: 'text' },
    error: { control: 'text' },
    helperText: { control: 'text' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<InputComponent>;

export const Default: Story = {
  args: {
    label: 'Nombre',
    placeholder: 'Ingresa tu nombre',
    type: 'text',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email',
    placeholder: 'correo@ejemplo.com',
    type: 'email',
    error: 'El email no es válido',
  },
};

export const WithHelper: Story = {
  args: {
    label: 'Contraseña',
    placeholder: '••••••••',
    type: 'password',
    helperText: 'Mínimo 8 caracteres',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Campo deshabilitado',
    placeholder: 'No puedes editar esto',
  },
};
