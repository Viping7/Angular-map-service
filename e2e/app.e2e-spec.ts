import { AngularMapsPage } from './app.po';

describe('angular-maps App', () => {
  let page: AngularMapsPage;

  beforeEach(() => {
    page = new AngularMapsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
