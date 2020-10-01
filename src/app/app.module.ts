import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ClarityModule } from "@clr/angular";

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { TreeDraggableDirective} from './treedraggable.directive';

@NgModule({
  imports: [BrowserModule, BrowserAnimationsModule, ClarityModule, FormsModule,],
  declarations: [AppComponent, HelloComponent, TreeDraggableDirective],
  bootstrap: [AppComponent]
})
export class AppModule { }
