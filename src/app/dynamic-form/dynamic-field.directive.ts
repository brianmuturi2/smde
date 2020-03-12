import {
  ComponentFactoryResolver, ComponentRef, Directive, Input, OnInit,
  ViewContainerRef
  } from "@angular/core";

import { FieldConfig } from './interface/dynamic-interface';
import { FormGroup } from "@angular/forms";
import { DynamicInputComponent }  from './dynamic-input/dynamic-input.component';
const componentMapper = {
  input: DynamicInputComponent
  // button: ButtonComponent,
  // select: SelectComponent,
  // date: DateComponent,
  // radiobutton: RadiobuttonComponent,
  // checkbox: CheckboxComponent
  };
@Directive({
  selector: '[dynamicField]'
})
export class DynamicFieldDirective implements OnInit  {
  componentRef: any;
  @Input() field: FieldConfig;
@Input() group: FormGroup;

  constructor(private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef) { }
    ngOnInit() {
      const factory = this.resolver.resolveComponentFactory(
        componentMapper[this.field.type]
        );
        this.componentRef = this.container.createComponent(factory);
        this.componentRef.instance.field = this.field;
        this.componentRef.instance.group = this.group;
    }

}
