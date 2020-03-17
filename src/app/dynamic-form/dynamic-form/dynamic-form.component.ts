import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { FieldConfig, Validator } from "../interface/dynamic-interface";

@Component({
  selector: 'app-dynamic-form',
  exportAs: "dynamicForm",
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {
  // @Input() fields: FieldConfig[] = [];
  fields = [];

  @Output() submit: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;

  get value() {
    return this.form.value;
  }
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    const group = this.fb.group({});
    this.form = group;
    
  }
  initialize_form(newfield){
    console.log("New fields",newfield)
    this.fields = newfield;
    this.form = this.createControl(newfield);
  }

  onSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    alert("status"+this.form.valid);
    if (this.form.valid) {
      this.submit.emit(this.form.value);
    } else {
      alert("corrct form fields")
      this.validateAllFormFields(this.form);
    }
  }
  createControl(newfields) {
    const group = this.fb.group({});
    newfields.forEach(field => {
      if (field.type === "button") return;
      const control = this.fb.control(
        field.value,
        this.bindValidations(field.validations || [])
      );
      group.addControl(field.name, control);
    });
    return group;
  }

  bindValidations(validations: any) {
    if (validations.length > 0) {
      const validList = [];
      validations.forEach(valid => {
        validList.push(valid.validator);
      });
      return Validators.compose(validList);
    }
    return null;
  }

  validateAllFormFields(formGroup: FormGroup) {
    alert("Validate field");
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
    
      // control.markAsTouched({ onlySelf: true });
      control.markAsDirty({ onlySelf: true });
    });
  }
  resetForm(){
    this.form.reset()
  }
}
