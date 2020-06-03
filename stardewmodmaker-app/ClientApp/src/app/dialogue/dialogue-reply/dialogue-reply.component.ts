import { Component, OnInit, Input } from '@angular/core';
import { DialogueReply } from 'src/app/shared/models/dialogue-reply.model';

@Component({
  selector: 'app-dialogue-reply',
  templateUrl: './dialogue-reply.component.html',
  styleUrls: ['./dialogue-reply.component.css']
})
export class DialogueReplyComponent implements OnInit {

  @Input()
  dialogueReply: DialogueReply;

  constructor() { }

  ngOnInit(): void {
  }

}
