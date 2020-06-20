
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'dynamic-nested-form',
  templateUrl: './dynamic-nested-form.component.html',
  styleUrls: ['./dynamic-nested-form.component.scss']
})
export class DynamicNestedFormComponent implements OnInit {
  filterForm: FormGroup;
  main_form_name: any;
  sample_documents = {
    'formgroup': 'GreenCard',
    'forms': [
      {
        'formname': 'property_section',
        'formtype': 'single',
        'fields': [
          {
            'field_name': 'reg_section',
            'field_type': 'text'
          },
          {
            'field_name': 'regd_section',
            'field_type': 'text'
          }

        ]
      },
      {
        'formname': 'proprietorship_section',
        'formtype': 'array',
        'fields': [

          {
            'field_name': 'entry_no',
            'field_type': 'text'
          }

        ]
      },
      {
        'formname': 'encumberance_section',
        'formtype': 'array',
        'fields': [
          {
            'field_name': 'nature_of_encumberance',
            'field_type': 'number'
          }

        ]
      }
    ]

  };

  constructor(private fb: FormBuilder) {
  }

  create_form() {

  }
  ngOnInit() {
    this.filterForm = this.populate_form();


    // this.populate_form();

  }
  populate_form(): FormGroup {
    const baseForm = this.fb.group({});
    const multlipleFormControl = this.fb.group({});
    const singleForm = this.fb.group({});
    const multipleForm = this.fb.array([]);
    const main_form = this.sample_documents['formgroup'];
    this.main_form_name = main_form;
    const document_fields = this.sample_documents['forms'];
    document_fields.forEach(document_field_passed => {
      const form_section_name = document_field_passed['formname'];
      const form_section_type = document_field_passed['formtype'];
      const form_section_fields = document_field_passed['fields'];

      if (form_section_type == 'single') {

        form_section_fields.forEach(section_fields => {

          singleForm.addControl(section_fields.field_name, new FormControl(''));

        });
        baseForm.addControl(form_section_name, singleForm);

      } else if (form_section_type == 'array') {

        form_section_fields.forEach(section_fields => {
          multlipleFormControl.addControl(section_fields.field_name, new FormControl(''));




          // singleForm.addControl(section_fields.field_name, this.generateFormGroup(formGroup, item));

        });
        multipleForm.controls.push(multlipleFormControl);
        baseForm.addControl(form_section_name, multipleForm);

      }
    });
    console.log(baseForm);
    return baseForm;
    // console.log(baseForm);



  }
}
