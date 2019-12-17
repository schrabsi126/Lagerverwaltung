import { Component, OnInit } from '@angular/core';
import {ComponentModel} from '../models/component';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Category} from '../models/category';
import {MatDialogRef} from '@angular/material';
import {CategoryService} from '../services/category.service';
import {ComponentService} from '../services/component.service';

@Component({
  selector: 'app-add-component-dialog',
  templateUrl: './add-component-dialog.component.html',
  styleUrls: ['./add-component-dialog.component.css']
})
export class AddComponentDialogComponent implements OnInit {

  component:ComponentModel= new ComponentModel();
  componentForm:FormGroup;
  categories:Category[];
  constructor( public dialogRef: MatDialogRef<AddComponentDialogComponent>,
               private categoryService:CategoryService,
               private  componentService:ComponentService) {
  }
  ngOnInit() {
    this.categoryService.getCategories().subscribe(
      x=> this.categories=x
    );
    this.componentForm = new FormGroup({
      'name': new FormControl(this.component.name, [
        Validators.required]),
      'price': new FormControl(this.component.description,[Validators.required]),
      'part_number': new FormControl(this.component.description,[Validators.required]),
      'state': new FormControl(this.component.description,[Validators.required]),
      'VP_unit': new FormControl(this.component.description,[Validators.required]),
      'category': new FormControl(this.component.description,[Validators.required]),
      'description': new FormControl(this.component.description,[Validators.required]),
    });
  }

  createComponent() {
    this.component.price=this.componentForm.get('price').value;
    this.component.name=this.componentForm.get('name').value;
    this.component.description=this.componentForm.get('description').value;
    this.component.category_id=this.componentForm.get('category').value;
    this.component.VP_unit=this.componentForm.get('VP_unit').value;
    if(this.componentForm.get('state').value=='aktiv')
    {
      this.component.state=true;
    }
    else
    {
      this.component.state=false;
    }
    this.component.part_number=this.componentForm.get('part_number').value;
    this.componentService.addComponent(this.component).then(component=>{
      this.componentService.loadComponents();
      this.dialogRef.close(component);
    });

  }

  cancel() {
    this.dialogRef.close(null);
  }


}
