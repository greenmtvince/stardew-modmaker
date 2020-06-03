import { Component, OnInit } from '@angular/core';
import { DialogueEntry } from 'src/app/shared/models/dialogue-entry.model';
import { DialogueLine } from 'src/app/shared/models/dialogue-line.model';
import { DialogueService } from '../dialogue.service';

@Component({
  selector: 'app-dialogue-list',
  templateUrl: './dialogue-list.component.html',
  styleUrls: ['./dialogue-list.component.css']
})
export class DialogueListComponent implements OnInit {


  dialogueEntries: DialogueEntry[];

  isEmpty: boolean = true;

  keyList: string[];
  
  selectedCharacter: string;
  
  selectedDialog: DialogueEntry;

  selectedLine: DialogueLine;

  showNumber: number;

  newDialogue: DialogueEntry;
  newDialogueLine: DialogueLine;
  errorMsg: string;

  constructor(private dialogueService: DialogueService) { 
    this.newDialogue = this.initializeDialogue();
    this.newDialogueLine = this.initializeDialogueLine();
  }

  getCharacter() {
    this.dialogueService.getSelectedCharacter().subscribe(
      character =>{
        this.selectedCharacter = character;
        this.showNumber=null;
      }
    )
  }
  
  getDialogue(){
    this.dialogueService.getCharacterDialogue().subscribe(
      dialogueEntries => {
        this.dialogueEntries = dialogueEntries;
        this.isEmpty = dialogueEntries.length===0||Object.keys(dialogueEntries[0]).length === 0;
        this.keyList = this.getKeys(this.dialogueEntries);
        console.log(this.isEmpty);
        console.log("DialogueList.getDialogue()");
        console.log(this.keyList);
      }, 
      error => this.errorMsg = <any>error
    );
  }

  getKeys(dialogueEntries: DialogueEntry[]): string[] {
    return dialogueEntries.map(entry => entry.dialogueKey);
  }

  get nonQuestions(){
    return this.selectedDialog.dialogueLines.filter( x => x.order<255);
  }

  get lastLine(){
    return this.selectedDialog.dialogueLines[this.selectedDialog.dialogueLines.length-1] || 999;
  }

  ngOnInit() {
    this.getDialogue();
    this.getCharacter();
  }
 

  selectRow(selected: DialogueEntry, index: number){
    console.log("selectRow index: " +index);
    this.selectedDialog = selected;
    this.dialogueService.setSelectedDialogueEntry(selected);
    this.showNumber = index;
    this.selectedLine = <DialogueLine>{};
    this.dialogueService.setSelectedDialogueLine(this.selectedLine);
  }

  selectDialogueLine(selectedLine: DialogueLine, selectedEntry: DialogueEntry){
    console.log("dialogueList.selectDialogueLine()")
    console.log(selectedLine);

    this.selectedLine = selectedLine;
    this.selectedDialog = selectedEntry;

    this.dialogueService.setSelectedDialogueLine(selectedLine)
    this.dialogueService.setSelectedDialogueEntry(selectedEntry);
  }

  addNew(){
    console.log("AddNew()");
  }

  addDialogueLine(line:DialogueLine){
    console.log(line);
    this.dialogueService.postDialogueLine(line);
  }

  initializeDialogue(): DialogueEntry{
    return <DialogueEntry>{
      characterName: "",
      conditionsType: 0,
      genericDayType: 1,
      showDayOfWeek: false,
      showFirstYear: false,
      showRelationship: false,
      showSeason: false,
      showSpouse: false,
      dialogueKey: "",
      dialogueLines: []
    }
  }

  initializeDialogueLine(): DialogueLine {
    return <DialogueLine>{
      textDefault: "",
      portrait: 0,
      endStyle: 1,
      switchGender: false,
      showFirst: false,
      dialogueResponses: [],
      questionReplies: []
    }
  }

  insertEntry(newEntry: DialogueEntry){
    //this.dialogueEntries.push(newEntry);
    newEntry.characterName=this.selectedCharacter;
    this.dialogueService.postDialougeEntry(newEntry);
    console.log("dialogList.insertEntry()");
    //this.newDialogue =  this.initializeDialogue();
  }

  deleteEntry(entry: DialogueEntry){
    this.dialogueService.deleteDialogueEntry(entry);
  }

  deleteLine(line: DialogueLine){
    this.dialogueService.deleteDialogueLine(line);
  }

  updateEntry(entry: DialogueEntry){
    this.dialogueService.putDialogueEntry(entry);
  }

}
