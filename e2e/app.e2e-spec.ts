import { ShareMyIdPage } from './app.po';

describe('share-my-id App', () => {
  let page: ShareMyIdPage;

  beforeEach(() => {
    page = new ShareMyIdPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
