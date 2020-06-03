import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortraitSelectComponent } from './portrait-select.component';

describe('PortraitSelectComponent', () => {
  let component: PortraitSelectComponent;
  let fixture: ComponentFixture<PortraitSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortraitSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortraitSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
