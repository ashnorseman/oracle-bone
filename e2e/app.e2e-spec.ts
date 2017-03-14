import { OracleBonePage } from './app.po';

describe('oracle-bone App', function() {
  let page: OracleBonePage;

  beforeEach(() => {
    page = new OracleBonePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('o works!');
  });
});
