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
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { of } from 'rxjs';

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
    const app: AppComponent = fixture.debugElement.componentInstance;
    app.ngOnInit();
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

  it('should call onLoginClick method', () => {
    const { app, fixture } = setup();

    expect(app.isAuthenticated$).toBeFalsy();
    app.onLoginClick();
    fixture.detectChanges();
    expect(app.isAuthenticated$).toBeTruthy();
    app.isAuthenticated$.subscribe(data => expect(data).toEqual(true));
  });

  it('should call onLogoutClick method', () => {
    const { app, fixture } = setup();

    expect(app.isAuthenticated$).toBeFalsy();
    app.onLogoutClick();
    fixture.detectChanges();
    expect(app.isAuthenticated$).toBeTruthy();
    app.isAuthenticated$.subscribe(data => expect(data).toEqual(false));
  });
});
