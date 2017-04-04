export class Collection {
    
    _id: string;
    details: {
        authenticated_orcids: [
            {  
                orcid: string;
                fullOrcidId: string;
                name: string;
            }
        ];
        created: string;
        form: {
            title: string;
            description: string;
        };
        owner: {
            orcid: string;
            fullOrcidId: string;
            name: string;
        };
    };
    public_key: string;
    private_key: string;
}

