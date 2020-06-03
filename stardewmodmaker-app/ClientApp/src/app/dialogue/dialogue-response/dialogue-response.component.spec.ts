import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogueResponseComponent } from './dialogue-response.component';

describe('DialogueResponseComponent', () => {
  let component: DialogueResponseComponent;
  let fixture: ComponentFixture<DialogueResponseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogueResponseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogueResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
