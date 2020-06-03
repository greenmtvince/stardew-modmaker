import { DialogueLine } from "./dialogue-line.model";

export interface DialogueEntry{
    id: number;
    characterName: string;
    conditionsType:number; //1 = generic, 2 = location, 3 = marriage, 4=special
    day: number;
    dayOfWeek: string;
    dialogueKey: string;
    dialogueLines: DialogueLine[];
    genericDayType: number; //1 = day of Month ("e.g., 13"), 2 = day of Week ("e.g., Tue")
    hearts: number;
    location: string;
    rain: boolean;
    season: string;
    showCoordinates: boolean;
    showDayOfWeek: boolean;
    showFirstYear: boolean;
    showRelationship: boolean;
    showSeason: boolean;
    showSpouse: boolean;
    specialDialogue: number; //1 = dance rejection, 2 = divorce, 3 = rain, 4 = location entry, 5 = comeback, 6 = gil
    spouse: string;
    x: number;
    y: number;
    year: number;
}