import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { FieldConfig} from '../interface/dynamic-interface';
@Component({
  selector: 'app-dynamic-button',
  template: `

<button  type="submit" class="btn btn-success col-md-{{field.width}}" [formGroup]="group">
      <i class="fa fa-save fa-1x"></i>
      {{field.label}}</button>


  `,
  styles: []
})
export class DynamicButtonComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  constructor() { }

  ngOnInit(): void {
  }

}
