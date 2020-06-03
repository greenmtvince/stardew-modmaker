import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogueBuilderComponent } from './dialogue-builder.component';

describe('DialogueBuilderComponent', () => {
  let component: DialogueBuilderComponent;
  let fixture: ComponentFixture<DialogueBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogueBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogueBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
