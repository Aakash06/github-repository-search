import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppService} from './app.service';
import {HighlightPipe} from './highlight.pipe';

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
