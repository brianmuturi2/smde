
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
  form_fields_passed = [];
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
      // {
      //   'formname': 'proprietorship_section',
      //   'formtype': 'array',
      //   'fields': [

      //     {
      //       'field_name': 'entry_no',
      //       'field_type': 'text'
      //     },

      //     {
      //       'field_name': 'entry_no_x',
      //       'field_type': 'text'
      //     }

      //   ]
      // },
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
    console.log("filter form",this.filterForm )


    // this.populate_form();

  }

  populate_form(): FormGroup {
    const baseForm = this.fb.group({});

  
   
    const main_form = this.sample_documents['formgroup'];
    this.main_form_name = main_form;
    const document_fields = this.sample_documents['forms'];
    this.form_fields_passed = this.sample_documents['forms'];
    for (let i = 0; i < document_fields.length; i++) {
      const form_section_name = document_fields[i]['formname'];
      const form_section_type = document_fields[i]['formtype'];
      let form_section_fields = document_fields[i]['fields'];
      const multipleForm = this.fb.array([]);
      if (form_section_type == 'single') {
        const singleForm = this.fb.group({});
        for (let s = 0; s < form_section_fields.length; s++) {
          singleForm.addControl(form_section_fields[s]['field_name'], new FormControl(''));
          baseForm.addControl(form_section_name, singleForm);
        }
      } else if (form_section_type == 'array') {
        
        for (let m = 0; m < form_section_fields.length; m++) {
          const multlipleFormControl = this.fb.group({});
          
          // multlipleFormControl.addControl(form_section_fields[m]['field_name'], new FormControl(''));
          multlipleFormControl.addControl(form_section_fields[m]['field_name'], new FormControl(''));
          multipleForm.controls.push(multlipleFormControl);
        
        }
        baseForm.addControl(form_section_name, multipleForm);
      }

    }
  
    return baseForm;
  }
  populate_multiple_dynamic_form(document_fields): FormGroup {
    const baseForm = this.fb.group({});
    const singleForm = this.fb.group({});
        for (let m = 0; m < document_fields.length; m++) {
         
          singleForm.addControl(document_fields[m]['field_name'], new FormControl(''));
          // baseForm.addControl(form_section_name, singleForm);
        }

  

    return singleForm;
  }
  remove_control(index,form_control){
    const selectedformArray = this.filterForm.get(form_control) as FormArray;
    const arrLength = selectedformArray.length;
    selectedformArray.removeAt(index);
  }
  productArray(form_name):FormArray
{ 
  const form_array = this.filterForm.get(form_name) as FormArray;
  console.log(form_array.controls)
    return this.filterForm.get(form_name) as FormArray;
}




  add_control(index){
    const selectedformArray = this.filterForm.get(index) as FormArray;
    
    const matchedIndex = this.form_fields_passed.map(function (obj) { return obj.formname; }).indexOf(index);
    const selected_index = this.form_fields_passed[matchedIndex];
    const selected_index_fields = selected_index['fields'];
    const new_form = this.populate_multiple_dynamic_form(selected_index_fields);
    selectedformArray.push(new_form);




  
  }
}
