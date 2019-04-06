import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StopsComponent } from './stops.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('StopsComponent', () => {
  let component: StopsComponent;
  let fixture: ComponentFixture<StopsComponent>;

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
      declarations: [StopsComponent]
    }).compileComponents();
  }));

  function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
  }

  beforeEach(() => {
    fixture = TestBed.createComponent(StopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
