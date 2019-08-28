import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NotasComponent } from './notas/notas.component';
import { EditaNotaComponent } from './edita-nota/edita-nota.component';

@NgModule({
  declarations: [
    AppComponent,
    NotasComponent,
    EditaNotaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
