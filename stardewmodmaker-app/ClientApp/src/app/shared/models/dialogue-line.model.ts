import { DialogueReply } from "./dialogue-reply.model";
import { DialogueResponse } from "./dialogue-response.model";

export interface DialogueLine {
    id: number;
    dialogueResponses: DialogueResponse[];
    endStyle: number; //1=end, 2=pause, 3=question
    firstTimeFemale: string;
    firstTimeText: string;
    letterId: string;
    order: number;
    portrait: number;
    questionReplies: DialogueReply[];
    randomItems: number[];
    showFirst: boolean;
    switchGender: boolean;
    textDefault: string;
    textFemale: string;
}