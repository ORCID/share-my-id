export class Collection {
    
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
    private_key: string;
    public_key: string;
    _id: string;
    
}

