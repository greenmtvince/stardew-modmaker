import { Injectable, Inject } from '@angular/core';
import { DialogueLine } from '../shared/models/dialogue-line.model';
import { DialogueEntry } from '../shared/models/dialogue-entry.model';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

/**
 * Dialogue service needs to track:
 * 1. All dialogue entries for all characters.
 * 2. Current Character
 * 3. Selected Dialogue Entry
 * 4. Selected Dialogue Line
 */
export class DialogueService {

  private dialogueControllerURL: string = this.baseUrl + 'api/DialogueEntries';
  private dialogueLineControllerURL: string = this.baseUrl + 'api/DialogueLines';

  private _dialogueEntries: DialogueEntry[];
  private dialogueEntries = new BehaviorSubject<DialogueEntry[]>([<DialogueEntry>{}]);

  private _selectedCharacter: string;
  private selectedCharacter = new BehaviorSubject<string>("");

  private _selectedDialogueEntry: DialogueEntry;
  private selectedDialogueEntry = new BehaviorSubject<DialogueEntry>(<DialogueEntry>{});

  private _selectedDialogueLine: DialogueLine;
  private selectedDialogueLine = new BehaviorSubject<DialogueLine>(<DialogueLine>{});

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.getDialogueEntries();
  }

  getCharacterDialogue(): Observable<DialogueEntry[]>{
    console.log("service.getDialogue");
    return this.dialogueEntries.asObservable();
  }

  /**
   *  HTTP GET
   * 
   */
  getDialogueEntries() {
    this.http.get<DialogueEntry[]>(this.dialogueControllerURL).subscribe(result => {
      this._dialogueEntries = result;
      this.dialogueEntries.next(this._dialogueEntries.filter(entry=>entry.characterName == this._selectedCharacter))
      console.log("GETTING HTTP");
      console.log(result);
    }, error => console.error(error));
  } 

  getDialogueEntry() {

  }

  postDialougeEntry(newEntry: DialogueEntry) {
    this.http.post<DialogueEntry>(this.dialogueControllerURL, newEntry )
      .subscribe(data => {
        console.log(data);
        this._dialogueEntries.push(data);
        this.dialogueEntries.next(this._dialogueEntries.filter(entry=>entry.characterName == this._selectedCharacter));
      });
  }

  postDialogueLine(newLine: DialogueLine) {
    var body = {
      "id": this._selectedDialogueEntry.id,
      "dialogueLine" : newLine
    }
    this.http.post<DialogueLine>(this.dialogueLineControllerURL, body)
      .subscribe(data => {
        console.log(data);
        this._selectedDialogueEntry.dialogueLines.push(data);
        this.selectedDialogueEntry.next(this._selectedDialogueEntry);
        this._selectedDialogueLine = data;
        this.selectedDialogueLine.next(this._selectedDialogueLine);
      });
  }


  putDialogueEntry(entry: DialogueEntry) {
    console.log("DialogueService.putDialogueEntry()");
    this.http.put<DialogueEntry>(this.dialogueControllerURL+'/'+entry.id, entry)
    .subscribe(data => {
      var index = this._dialogueEntries.findIndex(x => x.id == entry.id);
      this._dialogueEntries[index] = entry;
      this.dialogueEntries.next(this._dialogueEntries.filter(entry=>entry.characterName == this._selectedCharacter));
    })
  }

  putDialogueLine(){
    console.log(this._selectedDialogueEntry);
    this.putDialogueEntry(this._selectedDialogueEntry);
  }

  deleteDialogueEntry(entry: DialogueEntry){
    this.http.delete<DialogueEntry>(this.dialogueControllerURL+'/'+entry.id)
      .subscribe(data => {
        this._dialogueEntries = this._dialogueEntries.filter(function(ele) {return ele.id != entry.id})
        this.dialogueEntries.next(this._dialogueEntries);
      })

  }

  getSelectedCharacter(): Observable<string>{
    console.log("dialogue.service.getSelectedCharacter()")
    return this.selectedCharacter.asObservable();
  }

  getSelectedDialogueEntry(): Observable<DialogueEntry>{
    console.log("dialogue.service.getSelectedDialogueEntry()")
    return this.selectedDialogueEntry.asObservable();
  }

  getSelectedDialogueLine(): Observable<DialogueLine>{
    console.log("dialogue.service.getSelectedDialogueLine()")
    return this.selectedDialogueLine.asObservable();
  }

  setSelectedCharacter(characterName: string){
    this._selectedCharacter = characterName;
    this.selectedCharacter.next(this._selectedCharacter);
    this.dialogueEntries.next(this._dialogueEntries.filter(entry=>entry.characterName == this._selectedCharacter));
  }

  setSelectedDialogueEntry(selectedEntry: DialogueEntry){
    this._selectedDialogueEntry = selectedEntry;
    this.selectedDialogueEntry.next(selectedEntry);
  }

  setSelectedDialogueLine(selectedLine: DialogueLine){
    this._selectedDialogueLine = selectedLine;
    this.selectedDialogueLine.next(selectedLine);
  }

}
