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