import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { RecipeService } from 'src/app/services/recipe.service';
import { Ingredient } from 'src/app/models/ingredient.model';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css'],
})
export class RecipeFormComponent implements OnInit {
  recipeForm!: FormGroup;
  editMode!: boolean;
  recipeIndex!: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.recipeIndex = params['id'] || -1;
      this.editMode = !!params['id'];
      this.initForm();
    });
  }

  get ingredientsControls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  initForm() {
    let name = '';
    let imagePath = '';
    let description = '';
    let ingredients = [];

    if (this.editMode) {
      const recipe = this.recipeService.recipes[this.recipeIndex];
      ({ name: name, imagePath: imagePath, description: description } = recipe);

      for (let { name, amount } of recipe.ingredients)
        ingredients.push(
          new FormGroup({
            name: new FormControl(name),
            amount: new FormControl(amount),
          })
        );
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(name),
      imagePath: new FormControl(imagePath),
      description: new FormControl(description),
      ingredients: new FormArray(ingredients),
    });
  }

  formSubmitHandler() {
    if (this.editMode) {
      this.recipeService.updateRecipe(this.recipeIndex, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.formCancelHandler();
  }

  formCancelHandler() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  addIngredient() {
    const newIngredientForm = new FormGroup({
      name: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required),
    });
    (<FormArray>this.recipeForm.get('ingredients')).push(newIngredientForm);
  }

  removeIngredient(index: number) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }
}
