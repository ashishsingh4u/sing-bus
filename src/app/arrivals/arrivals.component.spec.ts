import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrivalsComponent } from './arrivals.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('ArrivalsComponent', () => {
  let component: ArrivalsComponent;
  let fixture: ComponentFixture<ArrivalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        })
      ],
      declarations: [ArrivalsComponent]
    }).compileComponents();
  }));

  function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
  }

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrivalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
