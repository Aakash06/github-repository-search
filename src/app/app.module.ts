import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {AppService} from "./app.service";
import { HighlightPipe } from './highlight.pipe';

@NgModule({
    declarations: [
        AppComponent,
        HighlightPipe
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule
    ],
    providers: [AppService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
