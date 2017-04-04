export class Collection {
    
    details: {
        authenticated_orcids: [
            {
                name: string;
                orcid: string;
            }
        ];
        created: string;
        form: {
                title: string;
                description: string;
            };
        owner: {
                orcid: string;
                name: string;
            };
    };
    private_key: string;
    public_key: string;
    _id: string;
    
}

