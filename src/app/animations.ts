import { trigger, state, style, animate, transition } from '@angular/animations';

export let fade =   trigger(
    'fade', 
    [
      transition(
        ':enter', 
        [
          style({ opacity: 0 }),
          animate('4s ease-out', style({ visibility: 'visible', opacity: 1,  /*transform: 'translateX(50px)'*/ }))
        ]
      ),
       transition(
        ':leave', 
        [
          style({ opacity: 0 }),
          animate('0s ease-out', style({ visibility: 'visible', opacity: 1 }))
        ]
      )
    ]
  )

  export let slideInOutVerticale = trigger(
    'slideInOutVerticale',
     [
    transition(':enter',
      [
          style({transform: 'translateY(-100%)'}),
          animate('3s ease-out', style({transform: 'translateY(0%)'}))
      ]),
    transition(
      ':leave', 
    [
        animate('3s ease-out', style({transform: 'translateY(-100%)'}))
    ])
  ])

  export let slideInOutHorizontal = trigger('slideInOutHorizontal', [
    transition(
      ':enter', 
      [
        style({transform: 'translateX(-100%)'}),
        animate('3s ease-out', style({transform: 'translateX(0%)'}))
    ]),
    transition(
      ':leave',
      [
        animate('0s ease-out', style({transform: 'translateX(-100%)'}))
    ])
  ])