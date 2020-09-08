import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WadoImageLoaderComponent } from './wado-image-loader.component';

describe('WadoImageLoaderComponent', () => {
  let component: WadoImageLoaderComponent;
  let fixture: ComponentFixture<WadoImageLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WadoImageLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WadoImageLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
