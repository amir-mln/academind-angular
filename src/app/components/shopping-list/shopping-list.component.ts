import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ingredient } from 'src/app/models/ingredient.model';
import { ShoppingService } from 'src/app/services/shopping.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  shoppingSubscription!: Subscription;

  constructor(private shoppingService: ShoppingService) {}
  ngOnInit(): void {
    this.ingredients = this.shoppingService.ingredients;
    this.shoppingSubscription = this.shoppingService.onNewIngredient.subscribe(
      (newIngredients) => (this.ingredients = newIngredients)
    );
  }
  ngOnDestroy(): void {
    this.shoppingSubscription.unsubscribe();
  }
}
