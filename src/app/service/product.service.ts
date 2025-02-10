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

  private apiKey = "YOUR_API_KEY";

  getProducts(): Observable<Product[]> {
    const headers = new HttpHeaders().set("X-Api-Key", this.apiKey);

    return this.http
      .get<any>(
        "https://api.pokemontcg.io/v2/cards?q=nationalPokedexNumbers:[1 TO 151]&orderBy=nationalPokedexNumbers&pageSize=151"
      )
      .pipe(
        map((response) => {
          return response.data.map((card: any) => this.mapCardToProduct(card));
        })
      );
  }

  getProductById(id: string): Observable<Product> {
    const headers = new HttpHeaders().set("X-Api-Key", this.apiKey);

    return this.http.get<any>(`https://api.pokemontcg.io/v2/cards/${id}`).pipe(
      map((response) => {
        const card = response.data;
        return this.mapCardToProduct(card);
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

  getProductByName(name: string): Observable<Product | null> {
    const headers = new HttpHeaders().set("X-Api-Key", this.apiKey);

    return this.http
      .get<any>(`https://api.pokemontcg.io/v2/cards?q=name:"${name}"`, {})
      .pipe(
        map((response) => {
          if (response.data && response.data.length > 0) {
            const card = response.data[0];
            return this.mapCardToProduct(card);
          }
          return null;
        })
      );
  }

  private mapCardToProduct(card: any): Product {
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
      evolvesTo: card.evolvesTo || [],
    };
  }
}
