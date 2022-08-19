import { Component } from '@angular/core';
import { Items } from '../models/items';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  constructor(private shoppingListService: ShoppingListService) {}

  items: Items[] = []

  ngOnInit(){
    this.shoppingListService.getAllItems().subscribe((result) => {
      if(result.status === 'success') this.items = result.data
    })
  }


}
