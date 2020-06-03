import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogueReplyComponent } from './dialogue-reply.component';

describe('DialogueReplyComponent', () => {
  let component: DialogueReplyComponent;
  let fixture: ComponentFixture<DialogueReplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogueReplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogueReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
