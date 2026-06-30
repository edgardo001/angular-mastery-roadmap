// Historias de Storybook para el componente Badge
// Muestra todas las variantes de color disponibles para las etiquetas
import type { Meta, StoryObj } from '@storybook/angular';
import { BadgeComponent } from './badge';

const meta: Meta<BadgeComponent> = {
  title: 'Design System/Badge',
  component: BadgeComponent,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'error'],
    },
  },
};

export default meta;
type Story = StoryObj<BadgeComponent>;

export const Primary: Story = {
  args: { color: 'primary' },
  render: (args) => ({
    props: args,
    template: `<app-badge [color]="color">Primary</app-badge>`,
  }),
};

export const Secondary: Story = {
  args: { color: 'secondary' },
  render: (args) => ({
    props: args,
    template: `<app-badge [color]="color">Secondary</app-badge>`,
  }),
};

export const Success: Story = {
  args: { color: 'success' },
  render: (args) => ({
    props: args,
    template: `<app-badge [color]="color">Success</app-badge>`,
  }),
};

export const Warning: Story = {
  args: { color: 'warning' },
  render: (args) => ({
    props: args,
    template: `<app-badge [color]="color">Warning</app-badge>`,
  }),
};

export const Error: Story = {
  args: { color: 'error' },
  render: (args) => ({
    props: args,
    template: `<app-badge [color]="color">Error</app-badge>`,
  }),
};

export const AllVariants: Story = {
  render: () => ({
    template: `
      <div style="display:flex;gap:10px;">
        <app-badge color="primary">Primary</app-badge>
        <app-badge color="secondary">Secondary</app-badge>
        <app-badge color="success">Success</app-badge>
        <app-badge color="warning">Warning</app-badge>
        <app-badge color="error">Error</app-badge>
      </div>
    `,
  }),
};
