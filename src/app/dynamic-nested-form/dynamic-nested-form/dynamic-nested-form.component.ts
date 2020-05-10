
import { Component } from '@angular/core';
import { FormGroup, FormArray,FormControl,FormBuilder } from '@angular/forms';

@Component({
  selector: 'dynamic-nested-form',
  templateUrl: './dynamic-nested-form.component.html',
  styleUrls: ['./dynamic-nested-form.component.scss']
})
export class DynamicNestedFormComponent  {

    array: any[] = [];
    controlNames:string[][];
    selectItems: any;
    form: FormGroup;

    templates = [
    {
      key: 1, value: "CertificateofLease",
      child_component: [
            {
              value: "Property Section", 
            children: [
        { property_name: "Edition" },
        { property_name: "Lesse" }
      ]
            },
            {
              value: "Encumbernace Section", 
            children: [
        { property_name: "entry" },
        { property_name: "date" }
      ]
            },
          ]
    
      // templates = [
        // {
        //   key: 1, value: "Certificate of Lease",
        //   parent_form : [
        //     { property_name: "File Number", },
        //     { property_name: "Folio Number" },
        //     { property_name: "Parcel Number" }
        //   ],
        //   child_component: [
        //     {
        //       value: "Property Section", 
        //       children: [
        //         { property_name: "File Number", },
        //         { property_name: "Folio Number" },
        //         { property_name: "Parcel Number" }
    
        //       ]
        //     },
    }
  ]
   constructor(private fb:FormBuilder){}
    createFormGroup(value:string,children:any[]):FormGroup
    {
    /*e.g. for template one, you send 
          value: "Template one",
          children: [
            { property_name: "Property one" },
            { property_name: "Property two" }
          ]
    */
    
         let controls:FormGroup[]=children.map(
              (x:any)=>this.fb.group({
                  [x.property_name]:''
                })
              
         )
         return this.fb.group({
             template_name:value,
             template_data:this.fb.array(controls)
         })
    }
    getControlNames(children:any[]):string[]
    {
         let controlNames:string[]=children.map(x=>x.property_name);
         return controlNames;
    }
  get details()
  {
    return this.form.get('template_details') as FormArray
  }

  changeEvent(e) {
        let arrayControls:FormGroup[] = [];
        let controlNames:string[][]=[];
        //in this.selectItems we have, e.g. [1,3]
        for (let select of this.selectItems) {
          //search the template, select will be e.g. 1,3
          let template:any=this.templates.find(x=>x.key==select);
          
          switch (+select) {
            case 1:
              let child_data = template.child_component;
              let info_sec = [];
              for (let kid_data of child_data){
                arrayControls.push(this.createFormGroup(kid_data.value,kid_data.children));
                controlNames.push(this.getControlNames(kid_data.children));
              }
              // console.log(info_sec)
              // // console.log("oooooping through toru",child_data.children)
              // arrayControls.push(this.createFormGroup(template.value,info_sec));
              // controlNames.push(this.getControlNames(info_sec));
              break;
            case 2:
              arrayControls.push(this.createFormGroup(template.value,template.personTwoChild));
              controlNames.push(this.getControlNames(template.personTwoChild));
              break;
            case 3:
              arrayControls.push(this.createFormGroup(template.value,template.personThreeChild));
              controlNames.push(this.getControlNames(template.personThreeChild));
              break;
           }
        }
        this.controlNames=controlNames;
        this.form=this.fb.group({
           template_details:this.fb.array(arrayControls)
        })
  }
  submitdata(){
    console.log(this.form.value)
  }
  addAddress(i) {
    console.log("form to add is",i)
    // const control = <FormArray>this.form.get('template_details').controls[i].get('template_data');
    // // console.log(control);
    // control.push(this.changeEvent(1));
  }
  removeFormControl(i) {
    let usersArray = this.form.controls.template_details as FormArray;
    usersArray.removeAt(i);
  }

  addFormControl(i) {
    let usersArray = this.form.controls.template_details as FormArray;
    usersArray.push(i)
    // console.log(i)
    // let usersArray = this.form.


    // let newUsergroup: FormGroup = this.form

    // usersArray.insert(arraylen, newUsergroup);
  }

}
