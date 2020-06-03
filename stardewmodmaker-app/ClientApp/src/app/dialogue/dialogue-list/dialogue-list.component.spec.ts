import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogueListComponent } from './dialogue-list.component';

describe('DialogueListComponent', () => {
  let component: DialogueListComponent;
  let fixture: ComponentFixture<DialogueListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogueListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogueListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
