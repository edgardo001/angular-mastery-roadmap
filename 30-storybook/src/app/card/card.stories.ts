// =============================================================================
// ARCHIVO: card.stories.ts
// PROPÓSITO: Historias de Storybook para el componente Card
// =============================================================================
//
// Este archivo define "historias" (stories) para el componente Card.
// Cada historia es una configuración diferente del componente que se
// puede ver y probar de forma aislada en la interfaz de Storybook.
//
// ¿Qué es una "historia" en Storybook?
// Es como una "receta de configuración" para un componente.
// Cada historia define: "Muestra el componente con ESTOS valores".
//
// Ejemplo: Para un botón, podrías tener historias como:
// - "Botón primario" (azul, texto "Guardar")
// - "Botón secundario" (gris, texto "Cancelar")
// - "Botón deshabilitado" (gris, no clickeable)
//
// Storybook muestra todas estas versiones en una barra lateral
// para que el diseñador pueda ver cómo se ve cada variación.
// =============================================================================

// Meta: Tipo que define la configuración metadata de las historias.
// Contiene: título, componente, tags, argTypes (controles del panel).
//
// StoryObj: Tipo que define una historia individual con sus args (valores).
import type { Meta, StoryObj } from '@storybook/angular';

// El componente que se va a documentar
import { CardComponent } from './card.component';

// =============================================================================
// METADATA DE LAS HISTORIAS
// =============================================================================
// meta es la configuración compartida por TODAS las historias de este archivo.
// Es como la "configuración general" del catálogo.
const meta: Meta<CardComponent> = {
  // title: Dónde aparece este componente en el sidebar de Storybook.
  // 'Components/Card' lo pone bajo la carpeta "Components" → "Card".
  title: 'Components/Card',

  // component: El componente Angular que se va a renderizar
  component: CardComponent,

  // tags: ['autodocs']: Genera documentación automáticamente
  // a partir de las props del componente. Es como un "traductor automático"
  // que convierte las interfaces TypeScript en documentación legible.
  tags: ['autodocs'],

  // argTypes: Define los controles que aparecen en el panel de Storybook.
  // Cada argType es un "control" que permite al usuario modificar
  // una prop del componente desde la interfaz web.
  argTypes: {
    // imageUrl: Control de texto para la URL de la imagen
    imageUrl: { control: 'text' },
  },
};

// Exporta la metadata como default (requerido por Storybook)
export default meta;

// Tipo alias para las historias de este componente.
// StoryObj<CardComponent> significa "una historia que usa CardComponent"
// y sus args deben coincidir con las props de CardComponent.
type Story = StoryObj<CardComponent>;

// =============================================================================
// HISTORIAS INDIVIDUALES
// =============================================================================

// Historia 1: Tarjeta con solo texto (sin imagen)
// args define los valores de las props para esta configuración específica
export const Default: Story = {
  args: { title: 'Título de tarjeta', description: 'Esta es una descripción de ejemplo para la tarjeta.' },
};

// Historia 2: Tarjeta con imagen
// Muestra cómo se ve la tarjeta cuando tiene una imagen arriba
export const WithImage: Story = {
  args: { title: 'Angular 22', description: 'Última versión con signals y control flow.', imageUrl: 'https://picsum.photos/seed/angular/400/200' },
};

// Historia 3: Tarjeta con contenido largo
// Prueba cómo se comporta la tarjeta cuando el texto es muy extenso
// (¿se desborda? ¿el layout se rompe?)
export const LongContent: Story = {
  args: { title: 'Lorem Ipsum', description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore.' },
};
