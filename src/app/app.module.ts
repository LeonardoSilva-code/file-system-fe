import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './pages/_layout/layout/layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import { FilesComponent } from './pages/files/files.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FolderCardComponent } from './components/folder-card/folder-card.component';
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";
import { CommonModule } from '@angular/common';
import { FileCardComponent } from './components/file-card/file-card.component';
import { CreateDirectoryModalComponent } from './components/create-directory-modal/create-directory-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CreateFileModalComponent } from './components/create-file-modal/create-file-modal.component';
import { ErrorModalComponent } from './components/error-modal/error-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    FilesComponent,
    FolderCardComponent,
    FileCardComponent,
    CreateDirectoryModalComponent,
    CreateFileModalComponent,
    ErrorModalComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MatToolbarModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
