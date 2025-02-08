import { Routes } from "@angular/router";
import { ListFavoriteComponent } from "./pages/list-favorite/list-favorite.component";
import { PanierComponent } from "./pages/panier/panier.component";
import { ProductListDetailComponent } from "./pages/product-list-detail/product-list-detail.component";
import { ProductListComponent } from "./pages/product-list/product-list.component";

export const routes: Routes = [
  {
    path: "",
    title: "Home",
    component: ProductListComponent,
  },
  {
    path: "product/:id",
    title: "Product Detail",
    component: ProductListDetailComponent,
  },
  {
    path: "favorites",
    title: "Favorites",
    component: ListFavoriteComponent,
  },
  {
    path: "panier",
    title: "Panier",
    component: PanierComponent,
  },
  {
    path: "**",
    redirectTo: "",
  },
];
