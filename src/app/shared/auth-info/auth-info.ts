export class AuthInfo {
    _id: string;
    details: {
        authenticated_orcids: any[];
        created: string;
        form: {};
        owner: {
            orcid: string;
            name: string;
        };
    };
    private_key: string;
    public_key: string;
}

