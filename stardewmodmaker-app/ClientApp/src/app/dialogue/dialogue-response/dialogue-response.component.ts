import { Component, OnInit, Input } from '@angular/core';
import { DialogueResponse } from 'src/app/shared/models/dialogue-response.model';

@Component({
  selector: 'app-dialogue-response',
  templateUrl: './dialogue-response.component.html',
  styleUrls: ['./dialogue-response.component.css']
})
export class DialogueResponseComponent implements OnInit {
  @Input()
  dialogueResponse: DialogueResponse;

  constructor() { }

  ngOnInit(): void {
  }

}
