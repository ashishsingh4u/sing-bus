import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

import { getCurrentRouteUrl } from './utils';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  // TODO: Need to fix once about page is created
  // it('should redirect to "about" route', () => {
  //   page.navigateTo();
  //   expect(getCurrentRouteUrl()).toEqual('about');
  // });

  it('should display current year in the footer', () => {
    page.navigateTo();
    expect(page.getCurrentYear()).toEqual(new Date().getFullYear().toString());
  });

  it('should have "About", "Stops", "Arrivals" menus', () => {
    page.navigateTo();
    page
      .getAllMenus()
      .then(menus => expect(menus).toEqual(['About', 'Stops', 'Arrivals']));
  });
});
