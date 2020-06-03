import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialoguePreviewComponent } from './dialogue-preview.component';

describe('DialoguePreviewComponent', () => {
  let component: DialoguePreviewComponent;
  let fixture: ComponentFixture<DialoguePreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialoguePreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialoguePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
