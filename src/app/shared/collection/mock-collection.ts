import { Collection } from './collection';

export const Collections: Collection[] = [
  {
  details: {
        authenticated_orcids: [
            {
                name: "Test name",
                orcid: "0000-0000-0000-0000"
            }
        ],
        created: "Test date",
        form: {
                title: "Test title",
                description: "Test description"
            },
        owner: {
                orcid: "0000-0000-0000-0000",
                name: "Test owner"
            },
    },
    private_key: "testPrivateKey",
    public_key: "testPublicKey",
    _id: "testCollectionId",
  }
];

export const CollectionsEmpty: Collection[] = [

];