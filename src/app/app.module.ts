import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { ShoppingService } from './services/shopping.service';
import { RecipeService } from './services/recipe.service';
import { SupabaseInterceptorProvider } from './misc/supabase.interceptor';
import { ShoppingModule } from './features/shopping/shopping.module';
import { AuthModule } from './features/auth/auth.module';
import { RecipeModule } from './features/recipes/recipes.module';
import { SharedModule } from './features/shared/shared.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, SharedModule],
  providers: [ShoppingService, RecipeService, [SupabaseInterceptorProvider]],
  bootstrap: [AppComponent],
})
export class AppModule {}
