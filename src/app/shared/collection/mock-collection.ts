import { Collection } from './collection';

export const Collections: Collection[] = [
  {
  details: {
        authenticated_orcids: [
            {
                orcid: "0000-0000-0000-0000",
                fullOrcidId: "http://sandbox.orcid.org0000-0000-0000-0000",
                name: "Test name",
            }
        ],
        created: "Test date",
        form: {
                title: "Test title",
                description: "Test description"
            },
        owner: {
                orcid: "0000-0000-0000-0000",
                fullOrcidId: "http://sandbox.orcid.org0000-0000-0000-0000",
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