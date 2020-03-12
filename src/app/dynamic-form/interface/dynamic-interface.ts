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
    // width?:string;
    inputType?: string;
    options?: string[];
    collections?: any;
    type: string;
    value?: any;
    validations?: Validator[];
  }
  