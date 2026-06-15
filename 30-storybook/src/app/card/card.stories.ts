import type { Meta, StoryObj } from '@storybook/angular';
import { CardComponent } from './card.component';

const meta: Meta<CardComponent> = {
  title: 'Components/Card',
  component: CardComponent,
  tags: ['autodocs'],
  argTypes: {
    imageUrl: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<CardComponent>;

export const Default: Story = {
  args: { title: 'Título de tarjeta', description: 'Esta es una descripción de ejemplo para la tarjeta.' },
};

export const WithImage: Story = {
  args: { title: 'Angular 22', description: 'Última versión con signals y control flow.', imageUrl: 'https://picsum.photos/seed/angular/400/200' },
};

export const LongContent: Story = {
  args: { title: 'Lorem Ipsum', description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore.' },
};
