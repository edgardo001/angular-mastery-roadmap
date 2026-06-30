// Historias de Storybook para el componente Card
// Las stories muestran diferentes configuraciones de la tarjeta
import type { Meta, StoryObj } from '@storybook/angular';
import { CardComponent } from './card';

const meta: Meta<CardComponent> = {
  title: 'Design System/Card',
  component: CardComponent,
  tags: ['autodocs'],
  argTypes: {
    header: { control: 'boolean' },
    footer: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<CardComponent>;

export const Default: Story = {
  args: { header: false, footer: false },
  render: (args) => ({
    props: args,
    template: `
      <app-card [header]="header" [footer]="footer">
        <p>Este es el contenido de la tarjeta.</p>
        <p>Puede contener cualquier cosa: texto, imágenes, formularios, etc.</p>
      </app-card>
    `,
  }),
};

export const WithHeader: Story = {
  args: { header: true, footer: false },
  render: (args) => ({
    props: args,
    template: `
      <app-card [header]="header" [footer]="footer">
        <div card-header>Título de la Tarjeta</div>
        <p>Contenido con header personalizado.</p>
      </app-card>
    `,
  }),
};

export const WithHeaderAndFooter: Story = {
  args: { header: true, footer: true },
  render: (args) => ({
    props: args,
    template: `
      <app-card [header]="header" [footer]="footer">
        <div card-header>Título</div>
        <p>Contenido principal de la tarjeta.</p>
        <div card-footer>
          <button style="background:#1a73e8;color:white;border:none;padding:8px 16px;border-radius:4px;cursor:pointer;">
            Acción
          </button>
        </div>
      </app-card>
    `,
  }),
};
