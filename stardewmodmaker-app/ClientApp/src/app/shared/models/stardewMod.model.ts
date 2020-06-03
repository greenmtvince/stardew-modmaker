import { DialogueEntry } from "./dialogue-entry.model";

export interface stardewMod{
    modName: string;
    nexusModId: number;
    modDialogue: DialogueEntry[]
}