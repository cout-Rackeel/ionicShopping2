import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AddFormModalComponent } from '../components/add-form-modal/add-form-modal.component';
import { Items } from '../models/items';
import { FetcherService } from '../services/fetcher.service';
import { ShoppingListService } from '../services/shopping-list.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(
    private shoppingListService: ShoppingListService,
    private modalCtrl: ModalController,
    private router: Router,
    private fetcher: FetcherService
  ) {}

  items: Items[] = [];

  reloadPage$: Observable<boolean> = this.fetcher._editState$;

  // ngOnInit() {
  //   console.log(`wow`);
  //   this.getAllItems();
  // }
  ionViewWillEnter() {
    this.getAllItems();
  }

  getAllItems() {
    this.shoppingListService.getAllItems().subscribe((result) => {
      if (result.status === 200) this.items = result.data;
      console.log(result);
    });
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: AddFormModalComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.shoppingListService
        .createItem(data)
        .subscribe(() => this.getAllItems());
      `Hello, ${data}!`;
    }
  }

  deleteItem(id: string, name: string) {
    if (confirm(`Are you sure you want to delete ${name}`)) {
      this.shoppingListService.deleteItem(id).subscribe(() => {
        this.getAllItems();
        alert('Item successfully deleted!!');
      });
    }
  }

  goToEditPage(id: string) {
    this.router.navigate([`/edit-item/${id}`]);
  }

  hasReloaded() {}
}
