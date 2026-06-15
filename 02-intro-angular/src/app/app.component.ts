import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { HeroComponent } from './hero/hero.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, HeroComponent, FooterComponent],
  template: `
    <app-header [title]="pageTitle" [navLinks]="navLinks" />
    <app-hero
      [name]="userName"
      [role]="userRole"
      [tagline]="tagline"
      (notify)="onNotify($event)"
    />
    <app-footer [year]="currentYear" [company]="companyName" />
  `,
})
export class AppComponent {
  pageTitle = 'Angular Portfolio';
  navLinks = ['Inicio', 'Proyectos', 'Contacto'];
  userName = 'Edgardo';
  userRole = 'Desarrollador Angular';
  tagline = 'Construyendo aplicaciones modernas con Angular 22';
  companyName = 'Angular Mastery';
  currentYear = new Date().getFullYear();

  onNotify(msg: string) {
    alert(msg);
  }
}
