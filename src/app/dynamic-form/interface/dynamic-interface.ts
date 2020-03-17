export interface DynamicInterface {
}


export interface Validator {
    name: string;
    validator: any;
    message: string;
  }
  export interface FieldConfig {
    label?: string;
    name?: string;
    width?:number;
    inputType?: string;
    options?:any[];
    collections?: any;
    type: string;
    value?: any;
    validations?: Validator[];
  }
  