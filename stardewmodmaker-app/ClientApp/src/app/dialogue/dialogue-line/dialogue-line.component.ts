import { Component, OnInit } from '@angular/core';
import { DialogueService } from '../dialogue.service';
import { DialogueLine } from 'src/app/shared/models/dialogue-line.model';
import { DialogueReply } from 'src/app/shared/models/dialogue-reply.model';
import { DialogueResponse } from 'src/app/shared/models/dialogue-response.model';

@Component({
  selector: 'app-dialogue-line',
  templateUrl: './dialogue-line.component.html',
  styleUrls: ['./dialogue-line.component.css']
})
export class DialogueLineComponent implements OnInit {

  dialogueLine: DialogueLine
  isEmpty: boolean = true;

  questionAvailable: boolean = true;

  ref: HTMLInputElement;

  replacerArray: object[] = [
    { "name": "Farmers Name" , "value" : "@" },
    { "name": "Farmer's half name" , "value" : "%firstnameletter" },
    { "name": "Farmer's Pet" , "value" : "%pet" },
    { "name": "Farm Name" , "value" : "%farm" },
    { "name": "Farmer's Favorite Thing" , "value" : "%favorite" },
    { "name": "Farmer's Spouse" , "value" : "%spouse" },
    { "name": "Farmer's 1st Kid" , "value" : "%kid1" },
    { "name": "Farmer's 2nd Kid" , "value" : "%kid2" },
    { "name": "Current Time" , "value" : "%time" },
    { "name": "Random Adjective" , "value" : "%adj" },
    { "name": "Random Noun" , "value" : "%noun" },
    { "name": "Random Place" , "value" : "%place" },
    { "name": "Random Name" , "value" : "%name" },
    { "name": "Random First Name of Rival" , "value" : "%rival" },
    { "name": "Sam and Sebastian's Band" , "value" : "%band" },
    { "name": "Title of Elliott's Book" , "value" : "%book" }
  ];

  selectedCharacter: string;

  constructor(private dialogueService: DialogueService) {
    this.getLine();
    this.getCharacter();
    console.log("DialLine Constructor");
    console.log(this.dialogueLine);
   }

  ngOnInit() {
  }

  getCharacter(){
    this.dialogueService.getSelectedCharacter().subscribe(
      character =>{
        this.selectedCharacter = character;
      }
    )
  }

  getLine() {
    this.dialogueService.getSelectedDialogueLine().subscribe(
      line =>{
        this.dialogueLine = line;
        this.isEmpty = Object.keys(line).length<1;
      }
    )
  }

  changeRadio(){
    console.log("Radio Changed");
    if(this.dialogueLine.endStyle==3){
      this.dialogueLine.order = 255;
      this.dialogueLine.showFirst = false;
      this.dialogueLine.firstTimeText = "";
      this.dialogueLine.firstTimeFemale = "";
      this.dialogueLine.questionReplies = [<DialogueReply>{
        text:"Answer 1",
        friendshipBonus: 0,
        responseId: 101
      }, <DialogueReply>{
        text:"Answer 2",
        friendshipBonus: 0,
        responseId: 102
      }]
      this.dialogueLine.dialogueResponses = [<DialogueResponse>{
        textDefault:"This is my reply to answer 1",
        switchGender: false,
        responseId: 101,
        portrait: 0
      }, <DialogueResponse>{
        textDefault:"This is my reply to answer 2",
        textFemale:"I love pie too",
        switchGender: true,
        responseId: 102,
        portrait: 0
      }]
    } else {
      this.dialogueLine.order = 250;
      this.dialogueLine.questionReplies = [];
      this.dialogueLine.dialogueResponses = [];
    }
  }

  saveLine(){
    console.log("DialogueLine.Component.saveLine()");
    this.dialogueService.putDialogueLine();
  }

  selectChange(event){
    var startPos=this.ref.selectionStart;
    this.ref.focus();
    this.ref.value=this.ref.value.substr(0,this.ref.selectionStart)+event.target.value
    +this.ref.value.substr(this.ref.selectionStart,this.ref.value.length);
    event.target.selectedIndex = 0;
    //this.ref.selectionStart=startPos;
    this.ref.focus();
  }

  textboxChanged(event){
    console.log(event.target.selectionStart);
    this.ref = event.target;
  }

}
