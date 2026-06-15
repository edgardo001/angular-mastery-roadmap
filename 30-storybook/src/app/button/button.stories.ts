import type { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from './button.component';

const meta: Meta<ButtonComponent> = {
  title: 'Components/Button',
  component: ButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary'] },
  },
};

export default meta;
type Story = StoryObj<ButtonComponent>;

export const Primary: Story = {
  args: { label: 'Click me', variant: 'primary' },
};

export const Secondary: Story = {
  args: { label: 'Cancel', variant: 'secondary' },
};

export const LongLabel: Story = {
  args: { label: 'Guardar cambios permanentemente', variant: 'primary' },
};
