export class Collection {
    createdByAuthor: string;
    createdByUrl: string;
    createdDate: string;
    description: string;
    id: string;
    orcidIDs: [
        {
            firstName: string;
            lastName: string;
            orcidId: string;
        }
    ];
    title: string;
}
