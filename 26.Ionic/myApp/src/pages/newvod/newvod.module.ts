import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewvodPage } from './newvod';

@NgModule({
  declarations: [
    NewvodPage,
  ],
  imports: [
    IonicPageModule.forChild(NewvodPage),
  ],
})
export class NewvodPageModule {}
