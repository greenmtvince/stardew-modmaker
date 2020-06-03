import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogueDeleteComponent } from './dialogue-delete.component';

describe('DialogueDeleteComponent', () => {
  let component: DialogueDeleteComponent;
  let fixture: ComponentFixture<DialogueDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogueDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogueDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
