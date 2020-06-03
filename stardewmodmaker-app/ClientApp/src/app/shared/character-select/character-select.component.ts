import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-character-select',
  templateUrl: './character-select.component.html',
  styleUrls: ['./character-select.component.css']
})
export class CharacterSelectComponent implements OnInit {

  @Input()
  characterName: string;

  @Output()
  characterNameChange = new EventEmitter<string>();

 
  closeResult: string = '';

  private characterList: string[] = new Array("Abigail", "Alex", "Caroline", "Clint", "Elliott", 
  "Emily", "Evelyn", "George", "Governor", "Gil", "Gunther", "Gus", "Haley", "Harvey", "Jas", "Jodi", 
  "Kent", "Krobus", "Leah", "Lewis", "Linus", "Marlon", "Marnie", "Maru", "Morris", "MrQi", "Pam", "Penny", "Pierre", "Robin", "Sam", "Sandy", "Sebastian", "Shane", "Vincent", "Willy", "Wizard");

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    // this.getCurrentCharacter();
  }

  // getCurrentCharacter(){
  //   this.dialogueService.getCharacter().subscribe(
  //     characterSelect => {
  //       this.characterName = characterSelect !=''?characterSelect:"Select Character";

  //     }
  //   );
  // }

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

  private changeCharacter(name: string) {
    console.log(name);
    this.characterName = name;
    //this.dialogueService.changeCharacter(name);
    this.characterNameChange.emit(name);
    this.modalService.dismissAll("ChaRACTER Selected");
  }

}
