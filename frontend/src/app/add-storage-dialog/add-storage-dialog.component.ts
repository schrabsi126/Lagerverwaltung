import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material';
import {Storage} from '../models/storage';
import {StorageService} from '../services/storage.service';

@Component({
  selector: 'app-add-storage-dialog',
  templateUrl: './add-storage-dialog.component.html',
  styleUrls: ['./add-storage-dialog.component.css']
})
export class AddStorageDialogComponent implements OnInit {

  storage:Storage= new Storage();
  storageForm:FormGroup;
  constructor( public dialogRef: MatDialogRef<AddStorageDialogComponent>, private storageService:StorageService) {
  }
  ngOnInit() {
    this.storage= new Storage();
    this.storageForm = new FormGroup({
      'name': new FormControl(this.storage.name, [
        Validators.required]),
      'location': new FormControl(this.storage.location,[Validators.required])
    });
  }

  createStorage() {
    this.storage.name=this.storageForm.get('name').value;
    this.storage.location=this.storageForm.get('location').value;
    this.storageService.addStorage(this.storage).then(storage=> {
      this.dialogRef.close(storage);
    });
  }

  cancel() {
    this.dialogRef.close(null);
  }

}
