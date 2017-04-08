import { Collection } from './collection';

export const Collections: Collection[] = [
    {
        _id: 'testCollectionId',
        details: {
            authenticated_orcids: [
                {
                    fullOrcidId: 'http://sandbox.orcid.org0000-0000-0000-0000',
                    name: 'Test name',
                    orcid: '0000-0000-0000-0000'
                }
            ],
            created: 'Test date',
            form: {
                description: 'Test description',
                title: 'Test title'
            },
            owner: {
                fullOrcidId: 'http://sandbox.orcid.org0000-0000-0000-0000',
                name: 'Test owner',
                orcid: '0000-0000-0000-0000'
            },
        },
        private_key: 'testPrivateKey',
        public_key: 'testPublicKey',
    }
];

export const CollectionsEmpty: Collection[] = [

];