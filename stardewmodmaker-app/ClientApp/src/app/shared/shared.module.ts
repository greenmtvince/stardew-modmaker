import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterSelectComponent } from './character-select/character-select.component';
import { PortraitSelectComponent } from './portrait-select/portrait-select.component';


@NgModule({
  declarations: [
    CharacterSelectComponent,
    PortraitSelectComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CharacterSelectComponent,
    PortraitSelectComponent
  ]
})
export class SharedModule { }