import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { Categories } from '../models/categories';
import { Items } from '../models/items';
import { ShoppingListService } from '../services/shopping-list.service';
import { FetcherService } from '../services/fetcher.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.page.html',
  styleUrls: ['./edit-item.page.scss'],
})
export class EditItemPage implements OnInit {
  constructor(
    private itemService: ShoppingListService,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private router : Router,
    private fetcher : FetcherService
  ) {}

  ngOnInit() {
    this.getCategories();
    this.getItemToEdit();
  }

  editItemForm = new FormGroup({
    item_name: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    price: new FormControl(0, [Validators.required]),
    quantity: new FormControl(0, [Validators.required]),
  });

  categories: Categories[] = [];
  editItem!: Items;
  itemId: string = this.activatedRoute.snapshot.params['id'];

  getCategories() {
    this.categoryService
      .getAllCategories()
      .subscribe((result) => (this.categories = result.data));
  }

  getItemToEdit() {
    this.itemService.getItemById(this.itemId).subscribe((result) => {
      this.editItem = result.data;
      console.log(this.editItem);
          this.editItemForm.setValue({
            item_name: this.editItem.item_name,
            category: this.editItem.category._id,
            price: this.editItem.price,
            quantity: this.editItem.quantity,
          });
    });
  }

  updateItem() {

    // Formdata is stored as a Partial of the Items model because it does not contain all the properties that the Item model has.
    // formdata is first set to unknown to erase it's type the casted to type Partial<Items>

    let formdata = (this.editItemForm.value as unknown) as Partial<Items>;

    this.categoryService
        .getCategoryById(this.editItemForm.value.category)
        .subscribe((result) => {

          /*This is done because the Items model requires the category property to be of Type Categories but the form returns...
           a string value. SO a call is made to the api to get the category object stored in the database based on the category._id
           sent by the form.
          */

          formdata.category = result.data;  // The category object is then stored to the formdata category property

          // Here the item is now successfully updated using the formdata variable
          this.itemService
          .updateItem(this.itemId, formdata)
          .subscribe({
            next: () => {
              alert(`Item successfully edited`);
            },
            complete: () => {
              this.fetcher.isRouted();
              this.router.navigate(['/home']);
            }
          })
        });


  }
}
