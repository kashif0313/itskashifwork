import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: false,

  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input() primaryBtn: boolean = false;
  @Input() secondaryBtn: boolean = false;
  @Input() widthFull: boolean = false;

  @Output() onClick = new EventEmitter<Event>();
}
