import { Component } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {
  instructions: string = '';

  onSubmit() {
    console.log('Form submitted with instructions:', this.instructions);
  }
}
