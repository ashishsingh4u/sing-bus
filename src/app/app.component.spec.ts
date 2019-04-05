import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { CoreModule, AppState } from '@app/core';
import { By } from '@angular/platform-browser';
import { SharedModule } from './shared';
import { of } from 'rxjs';
import { Action, Store, StoreModule } from '@ngrx/store';
import { provideMockStore, MockStore } from '@testing/utils';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let store: MockStore<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        SharedModule,
        BrowserAnimationsModule,
        CoreModule,
        HttpClientModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        }),
        StoreModule.forRoot({})
      ],
      providers: [provideMockStore()],
      declarations: [AppComponent]
    }).compileComponents();
  }));

  beforeEach(async(() => {
    store = TestBed.get(Store);
    store.setState({
      settings: {
        theme: 'DEFAULT-THEME',
        autoNightMode: true,
        stickyHeader: true,
        pageAnimations: true,
        pageAnimationsDisabled: false,
        elementsAnimations: true,
        language: 'en'
      }
    });
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  }));

  function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
  }

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Sing-Bus'`, () => {
    expect(app.title).toEqual('Sing-Bus');
  });

  it('should call onLoginClick method', async(() => {
    fixture.whenStable().then(() => {
      app.onLoginClick();
      fixture.detectChanges();
      expect(app.isAuthenticated$).toBeTruthy();
      app.isAuthenticated$.subscribe(data => expect(data).toEqual(true));
    });
  }));

  it('should call onLogoutClick method', async(() => {
    fixture.whenStable().then(() => {
      app.onLogoutClick();
      fixture.detectChanges();
      expect(app.isAuthenticated$).toBeTruthy();
      app.isAuthenticated$.subscribe(data => expect(data).toEqual(false));
    });
  }));

  it('should click login method', async(() => {
    fixture.whenStable().then(() => {
      spyOn(app, 'onLoginClick');
      const el = fixture.debugElement.query(By.css('#btnLogin')).nativeElement;
      el.click();
      fixture.detectChanges();
      expect(app.onLoginClick).toHaveBeenCalledTimes(1);
    });
  }));

  it('should click logout method', async(() => {
    fixture.whenStable().then(() => {
      let el = fixture.debugElement.query(By.css('#btnLogin')).nativeElement;
      el.click();
      fixture.detectChanges();
      el = fixture.debugElement.query(By.css('#btnLoggedIn')).nativeElement;
      el.click();

      spyOn(app, 'onLogoutClick');
      el = fixture.debugElement.query(By.css('#btnLogout')).nativeElement;
      el.click();
      fixture.detectChanges();
      expect(app.onLogoutClick).toHaveBeenCalledTimes(1);
    });
  }));
});
