import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-name-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './name-form.component.html',
  styleUrl: './name-form.component.scss'
})
export class NameFormComponent {

  @Output() submitEvent = new EventEmitter <string>();
  public statsForm = new FormGroup({
    name: new FormControl('')
  })

  submitForm() {
    this.submitEvent.emit(this.statsForm.controls.name.value as string);
  }
}
