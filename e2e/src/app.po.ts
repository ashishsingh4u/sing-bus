import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getCurrentYear() {
    return element(by.css('.signature .year')).getText();
  }

  getAllMenus() {
    return element
      .all(by.css('mat-toolbar button.nav-button'))
      .map(elm => elm.getText());
  }
}
