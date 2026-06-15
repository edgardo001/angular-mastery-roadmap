import { Component, inject } from '@angular/core';
import { CartStore } from './stores/cart.store';
import { ThemeStore } from './stores/theme.store';

interface Product {
  id: number;
  name: string;
  price: number;
}

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  readonly cart = inject(CartStore);
  readonly theme = inject(ThemeStore);

  products: Product[] = [
    { id: 1, name: 'Angular T-Shirt', price: 25 },
    { id: 2, name: 'Signals Mug', price: 12 },
    { id: 3, name: 'NgRx Hoodie', price: 45 },
    { id: 4, name: 'Reactive Stickers', price: 5 },
  ];

  addProduct(product: Product) {
    this.cart.addItem(product);
  }
}
