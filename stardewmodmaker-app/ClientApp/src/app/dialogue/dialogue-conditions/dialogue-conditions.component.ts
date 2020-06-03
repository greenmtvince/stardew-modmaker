import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DialogueEntry } from 'src/app/shared/models/dialogue-entry.model';
import { NgbModal, ModalDismissReasons, NgbRating } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dialogue-conditions',
  templateUrl: './dialogue-conditions.component.html',
  styleUrls: ['./dialogue-conditions.component.css']
})
export class DialogueConditionsComponent implements OnInit {

  @Input()
  cloneEntry: DialogueEntry;

  @Input()
  keyList: string[];

  @Output()
  createEntry = new EventEmitter<DialogueEntry>();

  @Output()
  updateEntry = new EventEmitter<DialogueEntry>();

  dialogueConditions: DialogueEntry;

  constructor(private modalService: NgbModal) {
    this.daysOfMonth = new Array(28);
    for (var i = 0;i<28;i++){
      this.daysOfMonth[i]=i+1;
    }
    console.log(this.daysOfMonth);
  }

  currentRate = 0;

  closeResult: string = '';

  daysOfMonth: number[];

  daysOfWeek: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  isNew: boolean = false; //Detects if modal being used to generate new Entry

  spouseName: string;

  seasons: string[] = ["Spring","Summer","Fall","Winter"];

  spouses: string[] = ['Abigail', 'Alex', 'Elliott', 'Emily', 'Haley', 'Harvey', 'Leah', 'Maru', 'Penny', 'Sam', 'Sebastian', 'Shane'];

  locations: string[] = ['AdventureGuild', 'AnimalShop','ArchaeologyHouse','Backwoods','BathHouseEntry',
  'BathHouse_MensLocker','BathHouse_Pool','BathHouse_WomensLocker','Beach','Blacksmith', 'BugLand', 
  'BusStop', 'Club', 'CommunityCenter', 'Desert', 'ElliottHouse', 'FishShop', 'Forest', 'HaleyHouse', 
  'HarveyRoom', 'Hospital', 'JojaMart','JoshHouse','LeahHouse','ManorHouse','MarnieBarn','MaruBasement',
  'Mine', 'Mountain', 'MovieTheater', 'Railroad', 'Saloon', 'SamHouse', 'SandyHouse', 'ScienceHouse', 
  'SebastianRoom', 'SeedShop','Sewer','Tent','Town','Trailer','Tunnel','WitchHut','WitchSwamp',
  'WitchWarpCave','WizardHouse','WizardHouseBasement','Woods'];

  year: number = 1; //1 = first year, 2 = second or later year

  private specialKeys: string[] = ["danceRejection", "divorced", "_Entry", "Rain", "ComeBackLater", "Snoring" ]

  ngOnInit() {
    console.log(this.cloneEntry);
    if(this.cloneEntry.conditionsType==0){
      this.isNew=true;
      this.cloneEntry.conditionsType=1;
    }
    this.dialogueConditions = JSON.parse(JSON.stringify(this.cloneEntry));
    console.log(this.keyList);
  }

  open(content){
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }); 
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  changeDialogueConditions(){
    this.clearConditions();
  }

  /**
   * 
   * @param e 
   */
  changeWeekMonth(e){
    console.log(this.dialogueConditions.genericDayType);
    if(this.dialogueConditions.genericDayType==1){
      delete this.dialogueConditions.dayOfWeek;
    } else {
      delete this.dialogueConditions.day;
    }
  }

  showHideCoordinates(){
    this.dialogueConditions.showCoordinates=!this.dialogueConditions.showCoordinates
    if(!this.dialogueConditions.showCoordinates){
      delete this.dialogueConditions.x;
      delete this.dialogueConditions.y;
    }
  }

  showHideDayOfWeek(){
    this.dialogueConditions.showDayOfWeek=!this.dialogueConditions.showDayOfWeek
    if(!this.dialogueConditions.showDayOfWeek){
      delete this.dialogueConditions.dayOfWeek
    }
  }

  showHideFirstYear(){
    this.dialogueConditions.showFirstYear= !this.dialogueConditions.showFirstYear;
    if (!this.dialogueConditions.showFirstYear){
      delete this.dialogueConditions.year;
    }
  }

  showHideRelationship(){
    this.dialogueConditions.showRelationship=!this.dialogueConditions.showRelationship
    if(!this.dialogueConditions.showRelationship){
      delete this.dialogueConditions.hearts;
    }
  }

  showHideSeason(){
    this.dialogueConditions.showSeason=!this.dialogueConditions.showSeason
    if (!this.dialogueConditions.showSeason){
      delete this.dialogueConditions.season;
    }
  }

  showHideSpouse(){
    this.dialogueConditions.showSpouse=!this.dialogueConditions.showSpouse
    if(!this.dialogueConditions.showSpouse){
      delete this.dialogueConditions.spouse;
    }
  }

  onSave(){
    this.dialogueConditions.dialogueKey = this.makeDialogueKey()
    //  console.log("Saving: " + this.dialogueEntryConditions.dialogueKey);
    this.dialogueConditions.day = Number(this.dialogueConditions.day) || 0;
    this.dialogueConditions.x = Number(this.dialogueConditions.x) || 0;
    this.dialogueConditions.y = Number(this.dialogueConditions.y) || 0;
    if(this.doesKeyMatch(this.dialogueConditions.dialogueKey)){
      if(this.isNew){
        console.log("Error, duplicate")
        //flash validation message.
        
      } else {
        //update and keep key

        console.log("Updating Entry")
        this.updateEntry.emit(this.dialogueConditions);
        this.modalService.dismissAll("Save Clicked");
      }
    } else {
      if(this.isNew){
        //upload new

        console.log("UploadingNew")
        this.createEntry.emit(this.dialogueConditions);
        this.dialogueConditions = this.cloneEntry;
        this.modalService.dismissAll("Save Clicked");
      }
      else {
        // update and change key
        this.updateEntry.emit(this.dialogueConditions);
        this.modalService.dismissAll("Save Clicked");
      }
    }
  }
  
  doesKeyMatch (keyString: string): boolean {
    return this.keyList.includes(keyString);
  }
  //   
  //   if(this.isNew){
  //     
  //   } else {
  //     this.cloneEntry.dialogueKey = JSON.parse(JSON.stringify(this.dialogueEntryConditions.dialogueKey));
  //     this.cloneEntry.dialogueConditions = JSON.parse(JSON.stringify(this.dialogueEntryConditions.dialogueConditions));
     
  //}

  makeDialogueKey() : string {
    var keyString = "";
    var conditions = this.dialogueConditions;
    console.log(conditions);
    //console.log("makeDialogueKey() Conditions Check:" + this.conditionsType)
    switch(conditions.conditionsType){
      case 1:
        if(conditions.showSeason){
          keyString += conditions.season + "_";
        }
        //KEY================
        if(conditions.genericDayType==1){
          keyString += conditions.day;
        } else {
          keyString += this.dialogueConditions.dayOfWeek;  //Quick Hack!  TODO Look up proper handling of else for this condition
        }
        if(conditions.showRelationship){
          keyString += conditions.hearts;
        }
        if(conditions.showFirstYear){
          keyString += "_"+conditions.year;
        }
        //==================
        if(conditions.showSpouse){
          keyString += "_inlaw_" + conditions.spouse;
        }
        break;
      case 2:
        if(conditions.showSeason){
          keyString += conditions.season;
        }
        //KEY================
        keyString += conditions.location;
        if(conditions.showCoordinates){
          keyString += "_" + conditions.x + "_" + conditions.y ;
        }
        if(conditions.showDayOfWeek){
          keyString += "_" + conditions.dayOfWeek;
        }
        if(conditions.showRelationship){
          keyString += conditions.hearts;
        } 
        //==================
        break;
      case 3:
        keyString += "marriage";
        //TODO: Build Marriage Dialogue Key
        break;
      case 4:
        keyString += this.specialKeys[conditions.specialDialogue-1];
        break;
    }
    console.log("Keystring: " + keyString);
    return keyString;
  }

  clearConditions(){
    console.log("clearConditions()")
    delete this.dialogueConditions.day;
    delete this.dialogueConditions.dayOfWeek;
    delete this.dialogueConditions.genericDayType;
    delete this.dialogueConditions.hearts;
    delete this.dialogueConditions.location;
    delete this.dialogueConditions.rain;
    delete this.dialogueConditions.specialDialogue;
    delete this.dialogueConditions.season;
    delete this.dialogueConditions.spouse;
    delete this.dialogueConditions.x;
    delete this.dialogueConditions.y;
    delete this.dialogueConditions.year;

    this.dialogueConditions.showCoordinates = false;
    this.dialogueConditions.showDayOfWeek = false;
    this.dialogueConditions.showFirstYear = false;
    this.dialogueConditions.showRelationship = false;
    this.dialogueConditions.showSeason = false;
    this.dialogueConditions.showSpouse = false;
  }
}
