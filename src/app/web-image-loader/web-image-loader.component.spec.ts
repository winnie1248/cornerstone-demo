import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebImageLoaderComponent } from './web-image-loader.component';

describe('WebImageLoaderComponent', () => {
  let component: WebImageLoaderComponent;
  let fixture: ComponentFixture<WebImageLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebImageLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebImageLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
