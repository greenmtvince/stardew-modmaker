import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { DialogueEntry } from 'src/app/shared/models/dialogue-entry.model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dialogue-delete',
  templateUrl: './dialogue-delete.component.html',
  styleUrls: ['./dialogue-delete.component.css']
})
export class DialogueDeleteComponent implements OnInit {

  @Input()
  selectedEntry: DialogueEntry;

  @Output()
  deleteConfirmed = new EventEmitter<DialogueEntry>();

  private closeResult: string = '';

  constructor( private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  open(content){
    // if(!this.isSinglePortrait()){
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    // }
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

  private confirmDelete(){
    this.deleteConfirmed.emit(this.selectedEntry);
    this.modalService.dismissAll("Confirmed Delete");
  }



}
