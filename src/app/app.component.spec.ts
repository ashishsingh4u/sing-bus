import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { CoreModule } from '@app/core';
import { By } from '@angular/platform-browser';
import { SharedModule } from './shared';

describe('AppComponent', () => {
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
        })
      ],
      declarations: [AppComponent]
    }).compileComponents();
  }));

  function setup() {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    return { fixture, app };
  }

  function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
  }

  it('should create the app', () => {
    const { app } = setup();
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Sing-Bus'`, () => {
    const { app } = setup();
    expect(app.title).toEqual('Sing-Bus');
  });

  it('should call login and logout methods', () => {
    const { app, fixture } = setup();
    fixture.detectChanges();
    let el = fixture.debugElement.query(By.css('#btnLogin')).nativeElement;
    el.click();

    fixture.detectChanges();
    el = fixture.debugElement.query(By.css('#btnLoggedIn')).nativeElement;
    el.click();

    fixture.detectChanges();
    spyOn(app, 'onLogoutClick');
    el = fixture.debugElement.query(By.css('#btnLogout')).nativeElement;
    el.click();
    expect(app.onLogoutClick).toHaveBeenCalledTimes(1);
  });
});
