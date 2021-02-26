export class AddOutgoingTrustee {
    constructor(
        public trust_id: string,
        public trustee_name: string,
        public date_deregistered: string,
    ) {}
}

