import { ShareIdNgPage } from './app.po';

describe('share-id-ng App', () => {
  let page: ShareIdNgPage;

  beforeEach(() => {
    page = new ShareIdNgPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
