import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  mode: 'shopping-list' | 'recipe' = 'recipe';

  routerHandler(route: typeof this.mode) {
    this.mode = route;
    console.log({ mode: this.mode, route });
  }
}
