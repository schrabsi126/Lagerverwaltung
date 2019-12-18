import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

// Component
import { AppRoutingModule }     from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RegisterService } from "./services/register.service";
import { UserService } from "./services/user.service";
import {EnvironmentService} from './services/environment.service'
import {FormValidationService} from './services/form-validation.service';
import {AuthenticationModule} from './services/authentication.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {
    MatButtonModule, MatCardModule, MatCheckboxModule, MatDialogModule, MatFormFieldModule,
    MatIconModule, MatInputModule,
    MatListModule,
    MatMenuModule, MatNativeDateModule, MatOptionModule, MatPaginatorModule, MatSelectModule,
    MatSidenavModule, MatSortModule,
    MatTableModule,
    MatToolbarModule
} from '@angular/material';
import { NavigationComponent } from './navigation/navigation.component';
import { ShowUserComponent } from './show-user/show-user.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { ShowComponentsComponent } from './show-components/show-components.component';
import {CategoryService} from './services/category.service';
import {ComponentService} from './services/component.service';
import { AddComponentDialogComponent } from './add-component-dialog/add-component-dialog.component';
import { AddStorageDialogComponent } from './add-storage-dialog/add-storage-dialog.component';
import {StorageService} from './services/storage.service';
import {EntryService} from './services/entry.service';
import { AddEntryComponent } from './add-entry/add-entry.component';
import { AddDeliveryComponent } from './add-delivery/add-delivery.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavigationComponent,
    ShowUserComponent,
    AddCategoryComponent,
    ShowComponentsComponent,
    AddComponentDialogComponent,
    AddStorageDialogComponent,
    AddEntryComponent,
    AddDeliveryComponent
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        AuthenticationModule,
        Ng4LoadingSpinnerModule.forRoot(),
        AppRoutingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatIconModule,
        MatMenuModule,
        MatSidenavModule,
        MatListModule,
        MatButtonModule,
        MatTableModule,
        MatSortModule,
        MatFormFieldModule,
        MatPaginatorModule,
        MatInputModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        MatOptionModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCardModule
    ],
  providers: [
    MatDatepickerModule,
    RegisterService,
    UserService,
    EnvironmentService,
    FormValidationService,
    CategoryService,
    ComponentService,
    StorageService,
    EntryService
  ],
  bootstrap: [AppComponent],
  entryComponents:[
    AddCategoryComponent,
    AddComponentDialogComponent,
    AddStorageDialogComponent]
})
export class AppModule { }
