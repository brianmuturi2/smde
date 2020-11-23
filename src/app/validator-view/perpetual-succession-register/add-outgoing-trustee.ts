export class AddOutgoingTrustee {
    constructor(
        public trustee_name: number,
        public replaced_by: number,
        public date_deregistered: string,
    ) {}
}

