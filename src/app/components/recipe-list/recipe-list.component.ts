import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from 'src/app/models/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  recipeList: Recipe[] = [];
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe(({ recipes }) => {
      this.recipeList = recipes;
    });
  }
  onNewRecipeClick(e: MouseEvent) {
    e.preventDefault();
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
