import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogueConditionsComponent } from './dialogue-conditions.component';

describe('DialogueConditionsComponent', () => {
  let component: DialogueConditionsComponent;
  let fixture: ComponentFixture<DialogueConditionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogueConditionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogueConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
