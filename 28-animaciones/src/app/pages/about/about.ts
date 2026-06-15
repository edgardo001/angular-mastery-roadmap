import { Component } from '@angular/core';
import { fadeIn } from '../../animations';

@Component({
  selector: 'app-about',
  standalone: true,
  animations: [fadeIn],
  template: `
    <div [@fadeIn] style="max-width:700px;margin:2rem auto;padding:0 1rem;">
      <h1 style="color:#1e40af;font-size:2rem;">About Animations</h1>
      <p style="margin-top:1rem;line-height:1.7;">
        This project demonstrates Angular's animation capabilities including:
      </p>
      <ul style="margin-top:1rem;padding-left:1.5rem;line-height:2;">
        <li>Fade-in transitions</li>
        <li>Slide enter/leave animations</li>
        <li>List stagger animations</li>
        <li>Animated route transitions</li>
        <li>Expand/collapse states</li>
      </ul>
    </div>
  `
})
export class AboutPage {}
