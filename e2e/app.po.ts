import { browser, element, by } from 'protractor';

export class OracleBonePage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('o-root h1')).getText();
  }
}
