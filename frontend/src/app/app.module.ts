import * as $ from 'jquery';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from "./shared/shared.module";
import { UsuarioService } from "./services/usuario/usuario.service";
import { FormsModule } from "@angular/forms";
import {LoginGuard} from "./services/guards/login.guard";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    FormsModule
  ],
  providers: [
    UsuarioService,
    LoginGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
