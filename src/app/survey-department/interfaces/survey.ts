export interface Survey {
}

export interface DocumentsList {
    id:string;
    document: string;
    uploader: string;
    uploaded_time:string;
    document_status: string;
    original_file_name: string;
    approver: string;
    file_no: string;
  }

export interface FixedBoundaryCard {
    id:string;
    serial_number: string;
    parcel_type: string;
    plot_number: string;
    date: string;
    area: string;
    plan_number: string;
    new_lr_number: string;
    remarks: string;
    file_number: string;
    folio_number: string;
  }

  export interface ValuationForStampDuty {
    id:string;
    serial_number: string;
    parcel_type: string;
    plot_number: string;
    area: string;
    units: string;
    vos: string;
    zone: string;
    situated_at: string;
    amount_declared: string;
    amount_valued: string;
    date_of_valuation: string;
    // file_number: string;
    // folio_number: string;
   
  }