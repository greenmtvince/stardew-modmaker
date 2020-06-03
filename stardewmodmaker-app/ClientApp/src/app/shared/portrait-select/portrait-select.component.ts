import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-portrait-select',
  templateUrl: './portrait-select.component.html',
  styleUrls: ['./portrait-select.component.css']
})
export class PortraitSelectComponent implements OnInit {

  @Input()
  characterName: string = "Haley";

  @Input()
  portraitNumber: number;

  @Output()
  portraitNumberChange = new EventEmitter<number>();

  portraitX: number = 0;
  portraitY: number = 0;
  
  closeResult: string = '';
  private singlePortraitChars: string[] = new Array("Bouncer", "Dwarf", "Gil", "Grandpa", "Gunther", "Marlon");

  constructor(private modalService: NgbModal) { 
    
  }

  ngOnInit() {
    console.log("portraitSelect.OnInit()");
    //this.selectPortrait();
  }

  ngOnChanges(){
    console.log("portraitSelect.OnChanges()");
    this.selectPortrait();
  }

  open(content){
    if(!this.isSinglePortrait()){
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
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

  private getClickedPortait(e){
    var clickX = e.offsetX;
    var clickY = e.offsetY;
    var height=e.srcElement.attributes.src.ownerElement.height;
    var width =e.srcElement.attributes.src.ownerElement.width;

    var cellsize = width/2;
    var leftColumn = clickX<cellsize?0:1;
    var rowNum = Math.floor(clickY/cellsize)

    this.portraitNumber = rowNum*2 + leftColumn;
    //this.selectPortrait();
    this.portraitNumberChange.emit(this.portraitNumber);
    this.modalService.dismissAll("Portrait Selected");
  }

  private selectPortrait ( ) {
    console.log("selectubg Portratint")
    var height = 192;  //TODO get element Height
    var width = 128;  //TODO get element width
    var cellsize = width/2;

    console.log("selectPortrait.portraitNumber = "+ this.portraitNumber);
    
    this.portraitX = this.portraitNumber % 2 == 0? 0 : -1*cellsize;
    this.portraitY = Math.floor(this.portraitNumber/2)*-1*cellsize;
  }

  private isSinglePortrait() : boolean {
    return this.singlePortraitChars.indexOf(this.characterName)>-1;
  }

}
