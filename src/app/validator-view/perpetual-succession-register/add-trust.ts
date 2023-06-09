export class AddTrust {
     constructor(
         public ps_number: string,
         public register: string,
         public trust_name: string,
         public status: boolean,
     ) {}
}

export class AddTrustDetails {
    constructor(
        public trust_id: string,
        public date_of_incorporation: string,
        public date_of_registration: string,
    ) {}
}

export class UpdateTrust {
    constructor(
        public id: string,
        public ps_number: string,
        public register: string,
        public trust_name: string,
        public date_of_incorporation: string,
        public date_of_registration: string,
        public status: boolean,
    ) {}
}