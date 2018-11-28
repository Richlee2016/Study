import { Component } from '@angular/core';

/**
 * Generated class for the PreviewComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'preview',
  templateUrl: 'preview.html'
})
export class PreviewComponent {

  text: string;

  constructor() {
    console.log('Hello PreviewComponent Component');
    this.text = 'Hello World';
  }

}
