import { Component, OnInit, Input } from '@angular/core';
import { DialogueEntry } from 'src/app/shared/models/dialogue-entry.model';
import { DialogueService } from '../dialogue.service';

@Component({
  selector: 'app-dialogue-preview',
  templateUrl: './dialogue-preview.component.html',
  styleUrls: ['./dialogue-preview.component.css']
})
export class DialoguePreviewComponent implements OnInit {
  dialogueEntry: DialogueEntry;

  activeDialog: boolean = false;

  previewMode: number = 3; //1 = Dialogue, 2 = JSON, 3 = Debug

  displayedText: string = "";

  portraitX: number = 0;
  portraitY: number = 0;

  constructor(private dialogueService: DialogueService) {
    this.getCurrentEntry()
   }


  getCurrentEntry(){
    this.dialogueService.getSelectedDialogueEntry().subscribe(
      entry =>{
        this.dialogueEntry = entry;
        //this.isEmpty = Object.keys(line).length<1;
      }
    )
  }

  ngOnInit() {
  }

  ngOnChanges(){
    console.log("dialoguePreview.ngOnChanges()");
    console.log(this.dialogueEntry);
    
    //this.activeDialog = "dialogueLines" in this.dialogueEntry;
    console.log("activeDialogue: "+ this.activeDialog);
    //if(this.activeDialog) { this.displayedText = this.dialogueEntry.dialogueLines[0].textDefault;  this.selectPortrait ( ); }
  }

  private selectPortrait ( ) {
    console.log("selectubg Portratint")
    var height = 192;  //TODO get element Height
    var width = 128;  //TODO get element width
    var cellsize = width/2;

    console.log("selectPortrait.portraitNumber = "+ this.dialogueEntry.dialogueLines[0].portrait);
    
    this.portraitX = this.dialogueEntry.dialogueLines[0].portrait % 2 == 0? 0 : -1*cellsize;
    this.portraitY = Math.floor(this.dialogueEntry.dialogueLines[0].portrait/2)*-1*cellsize;
  }

}
