import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Category} from '../models/category';
import {UserService} from '../services/user.service';
import {CategoryService} from '../services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  category:Category= new Category();
  categoryForm:FormGroup;
  constructor( public dialogRef: MatDialogRef<AddCategoryComponent>, private categoryService:CategoryService) {
  }
  ngOnInit() {
    this.category= new Category();
    this.categoryForm = new FormGroup({
      'name': new FormControl(this.category.name, [
        Validators.required]),
      'short_name': new FormControl(this.category.short_name,[Validators.required, Validators.maxLength(4)])
    });
  }

  getErrorMessage() {
    return this.categoryForm.get('short_name').hasError('required') ? 'Ein Kürzel ist verlangt' :
      this.categoryForm.get('short_name').hasError('maxlength') ? 'Max 4 Buchstaben' :
        '';
  }

  createCategory() {
    this.category.name=this.categoryForm.get('name').value;
    this.category.short_name=this.categoryForm.get('short_name').value;
    this.categoryService.addCategory(this.category).then(category=> {
      this.categoryService.getCategories().subscribe(x=> console.log(x));
      this.dialogRef.close(category);
    });
  }

  cancel() {
    this.dialogRef.close(null);
  }

}
