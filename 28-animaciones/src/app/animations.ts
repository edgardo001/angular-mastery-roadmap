import { trigger, state, style, transition, animate, query, stagger, keyframes } from '@angular/animations';

export const fadeIn = trigger('fadeIn', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('600ms ease-out', style({ opacity: 1 }))
  ])
]);

export const slideIn = trigger('slideIn', [
  transition(':enter', [
    style({ transform: 'translateX(-100%)', opacity: 0 }),
    animate('500ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
  ]),
  transition(':leave', [
    animate('300ms ease-in', style({ transform: 'translateX(100%)', opacity: 0 }))
  ])
]);

export const listStagger = trigger('listStagger', [
  transition('* => *', [
    query(':enter', [
      style({ opacity: 0, transform: 'translateY(20px)' }),
      stagger(80, [
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ], { optional: true }),
    query(':leave', [
      stagger(40, [
        animate('250ms ease-in', style({ opacity: 0, transform: 'translateX(-20px)' }))
      ])
    ], { optional: true })
  ])
]);

export const routeSlide = trigger('routeSlide', [
  transition('* <=> *', [
    query(':enter, :leave', [
      style({ position: 'absolute', width: '100%' })
    ], { optional: true }),
    query(':enter', [
      style({ transform: 'translateX(100%)', opacity: 0 })
    ], { optional: true }),
    query(':leave', [
      animate('350ms ease-in', style({ transform: 'translateX(-100%)', opacity: 0 }))
    ], { optional: true }),
    query(':enter', [
      animate('350ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
    ], { optional: true })
  ])
]);

export const expandCollapse = trigger('expandCollapse', [
  state('collapsed', style({ height: '0', opacity: 0, overflow: 'hidden' })),
  state('expanded', style({ height: '*', opacity: 1, overflow: 'hidden' })),
  transition('collapsed <=> expanded', animate('350ms ease-in-out'))
]);
