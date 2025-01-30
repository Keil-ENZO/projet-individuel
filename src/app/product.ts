export interface Product {
  id: number;
  name: string;
  number: number;
  isFavorite: boolean;
  imgUrl: string;
  hp: string;
  attaque: string;
  type: Array<string>;
  rarity: string;
  middlePrice: number;
  quantite: number;
}
