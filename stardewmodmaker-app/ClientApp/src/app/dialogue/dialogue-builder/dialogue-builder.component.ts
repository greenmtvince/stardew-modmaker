import { Component, OnInit } from '@angular/core';
import { DialogueService } from '../dialogue.service';
import { DialogueEntry } from 'src/app/shared/models/dialogue-entry.model';
import { DialogueLine } from 'src/app/shared/models/dialogue-line.model';

@Component({
  selector: 'app-dialogue-builder',
  templateUrl: './dialogue-builder.component.html',
  styleUrls: ['./dialogue-builder.component.css']
})
export class DialogueBuilderComponent implements OnInit {

  selectedCharacter: string;

  constructor(private dialogueService: DialogueService) { 

  }

  ngOnInit() {
    // this.getDialogue();
  }

  ngOnChanges() {
    
  }

  // getDialogue(){
  //   this.dialogueService.getCharacterDialogue().subscribe(
  //     dialogueEntries => {
  //       this.displayedDialogueEntries = dialogueEntries;
  //       this.isEmpty = dialogueEntries.length===0||Object.keys(dialogueEntries[0]).length === 0;
  //       console.log(this.isEmpty);
  //       console.log("DialogueList.getDialogue()");
  //     }, 
  //     error => this.errorMsg = <any>error
  //   );
  // }
  /**
   * Dear future me, leave this and the selected Character Variable in.  
   * 
   * This function exists because I want character select component to be useful across modules.
   * If I had it call the dialogue service directly, it would only be useful for the dialogue module.
   * 
   * @param newName 
   */
  changeSelectedCharacter(newName: string){
    console.log("DialogueBuilder.changeSelectedCharacter()")
    this.selectedCharacter = newName;
    this.dialogueService.setSelectedCharacter(newName);
    //this.displayedDialogueEntries = this.allDialogueEntries.filter(entry=>entry.characterName == this.selectedCharacter);
  }

  // changeSelectedEntry(newEntry: DialogueEntry){
  //   console.log("DialogueBuilder.changeSelectedEntry()");
  //   this.selectedEntry = newEntry;
  // }

}
