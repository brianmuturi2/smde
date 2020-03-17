
import { Component, ViewChild, } from "@angular/core";
import { Validators } from "@angular/forms";
import { FieldConfig} from '../../dynamic-form/interface/dynamic-interface';
import { DynamicFormComponent } from '../../dynamic-form/dynamic-form/dynamic-form.component';
@Component({
  selector: 'app-register-account',
  templateUrl: './register-account.component.html',
  styleUrls: ['./register-account.component.css']
})

export class RegisterAccountComponent {
  @ViewChild(DynamicFormComponent) inputForm: DynamicFormComponent;

  registeruser() {
    console.log(this.inputForm.value)
  }
  populateform(value){
      let new_config = [
        {
          type: "input",
          label: "First Name",
          inputType: "text",
          name: "first_name",
          width:6,
          validations: [
            {
              name: "required",
              validator: Validators.required,
              message: "First Name Required"
            }
          ]
        },
        {
          type: "input",
          label: "Last Name",
          inputType: "text",
          name: "last_name",
          width:6,
          validations: [
            {
              name: "required",
              validator: Validators.required,
              message: "Last Name Required"
            }
          ]
        },
        {
          type: "select",
          label: "Country",
          name: "country",
          value: "UK",
          options: ["India", "UAE", "UK", "US"]
        },
        {
          type: "button",
          width:6,
          label: "Save New"
        }
      ];
      this.inputForm.initialize_form(new_config);

    
    
    // this.inputForm.resetForm();

  }
}
