export class AddIncomingTrustee {
    constructor(
        public trust: string,
        public trustee_name: string,
        public date_registered: string,
        public endorsement_date: string,
        public status: boolean,
    ) {}
}
