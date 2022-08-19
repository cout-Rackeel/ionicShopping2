import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { CategoryService } from 'src/app/category.service';
import { Categories } from 'src/app/models/categories';

@Component({
  selector: 'app-add-form-modal',
  templateUrl: './add-form-modal.component.html',
  styleUrls: ['./add-form-modal.component.scss'],
})
export class AddFormModalComponent implements OnInit {

  constructor(
    private modalCtrl:ModalController,
    private categoryService: CategoryService
    ) { }

  ngOnInit() {
    this.getCategories();
  }


  addItemsForm = new FormGroup({
    item_name : new FormControl('', [Validators.required]),
    category:  new FormControl('', [Validators.required]),
    price:  new FormControl(0, [Validators.required]),
    quantity:  new FormControl(0, [Validators.required])
  })

  categories : Categories[] = [];


  getCategories(){
    this.categoryService.getAllCategories().subscribe(result => this.categories = result.data)
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    console.log(this.addItemsForm.value);
    return this.modalCtrl.dismiss(this.addItemsForm.value, 'confirm');
  }

}
