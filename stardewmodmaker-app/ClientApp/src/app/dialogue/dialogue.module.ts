import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DialogueBuilderComponent } from './dialogue-builder/dialogue-builder.component';
import { DialogueLineComponent } from './dialogue-line/dialogue-line.component';
import { DialogueListComponent } from './dialogue-list/dialogue-list.component';
import { DialoguePreviewComponent } from './dialogue-preview/dialogue-preview.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { DialogueConditionsComponent } from './dialogue-conditions/dialogue-conditions.component';
import { DialogueDeleteComponent } from './dialogue-delete/dialogue-delete.component';
import { DialogueReplyComponent } from './dialogue-reply/dialogue-reply.component';
import { DialogueResponseComponent } from './dialogue-response/dialogue-response.component';

const routes: Routes = [
  { path: '', component: DialogueBuilderComponent },
  // { path: '', component: DialogueLineComponent},
  // { path: '', component: DialogueListComponent},
  // { path: '', component: DialoguePreviewComponent}
];

@NgModule({
  declarations: [
    DialogueBuilderComponent,
    DialogueLineComponent,
    DialogueListComponent,
    DialoguePreviewComponent,
    DialogueConditionsComponent,
    DialogueDeleteComponent,
    DialogueReplyComponent,
    DialogueResponseComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class DialogueModule { }
