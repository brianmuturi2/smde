
import { Component, ViewChild, ElementRef,OnInit } from '@angular/core';
import { FormGroup, FormControl,FormArray, FormBuilder,Validators } from '@angular/forms'
 
 
@Component({
  selector: 'dynamic-nested-form',
  templateUrl: './dynamic-nested-form.component.html',
  styleUrls: ['./dynamic-nested-form.component.scss']
})
export class DynamicNestedFormComponent implements OnInit  {
  productionForm: FormGroup;

 
  constructor(private fb:FormBuilder) {
 
  
  }
  prodData = {
    groups: [
      {
        id: 'group-green',
        name: 'Group Green',
        products: [
          {
            name: 'Product Car',
            begTally: 23,
            endTally: 25,
          },
          {
            name: 'Product Car',
            begTally: 50,
            endTally: 25,
          },
        ]
      },
      {
        id: 'group-blue',
        name: 'Group Blue',
        products: [
          {
            name: 'Product Flower',
            begTally: 13,
            endTally: 32,
          },
          {
            name: 'Product Food',
            begTally: 21,
            endTally: 29,
          }
        ]
      },
    ]
  };

  ngOnInit() {
    this.productionForm = this.fb.group({
      production: this.fb.array(
        this.prodData
          // for each...
          .groups
          .reduce((acc, group) => [
            ...acc,
            // ...product of each group
            ...group.products.map(product =>
              // create a form group
              this.fb.group({
                begTally: [product.begTally, Validators.required],
                endTally: [product.endTally, Validators.required],
              })
            )
          ], [])
      )
    })
  }
  addCreds(i){
    console.log(i)
  }
}