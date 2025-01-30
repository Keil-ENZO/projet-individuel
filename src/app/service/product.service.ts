import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Product } from "../product";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private http = inject(HttpClient);
  private products: Product[] = [];

  // Clé API Pokémon TCG
  private apiKey = "YOUR_API_KEY"; // Remplacez par votre clé API si nécessaire

  getProducts(): Observable<Product[]> {
    const headers = new HttpHeaders().set("X-Api-Key", this.apiKey);

    return this.http
      .get<any>(
        "https://api.pokemontcg.io/v2/cards?q=nationalPokedexNumbers:[1 TO 151]&orderBy=nationalPokedexNumbers&pageSize=151",
        { headers }
      )
      .pipe(
        map((response) => {
          // Transformation des données de l'API en format Product
          return response.data.map((card: any) => ({
            id: card.id,
            name: card.name,
            number: parseInt(card.number),
            isFavorite: false,
            imgUrl: card.images.small,
            hp: card.hp,
            attaque: card.attacks ? card.attacks[0]?.name : "Aucune attaque",
            type: card.types,
            rarity: card.rarity,
            middlePrice: card.cardmarket?.prices?.averageSellPrice || 0,
            quantite: 1,
          }));
        })
      );
  }

  getProductById(id: string): Observable<Product> {
    const headers = new HttpHeaders().set("X-Api-Key", this.apiKey);

    return this.http
      .get<any>(`https://api.pokemontcg.io/v2/cards/${id}`, { headers })
      .pipe(
        map((response) => {
          const card = response.data;
          return {
            id: card.id,
            name: card.name,
            number: parseInt(card.number),
            isFavorite: false,
            imgUrl: card.images.small,
            hp: card.hp,
            attaque: card.attacks ? card.attacks[0]?.name : "Aucune attaque",
            type: card.types,
            rarity: card.rarity,
            middlePrice: card.cardmarket?.prices?.averageSellPrice || 0,
            quantite: 1,
          };
        })
      );
  }

  makeFavorite(product: Product): Observable<Product> {
    // Comme nous n'avons pas de backend pour sauvegarder les favoris,
    // nous allons simplement retourner le produit modifié
    return new Observable((observer) => {
      product.isFavorite = !product.isFavorite;
      observer.next(product);
      observer.complete();
    });
  }
}
