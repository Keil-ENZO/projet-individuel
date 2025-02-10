export interface Product {
  id: string;
  name: string;
  number: number;
  isFavorite: boolean;
  imgUrl: string;
  hp: string;
  attaque: string;
  type: string[];
  rarity: string;
  middlePrice: number;
  quantite: number;
  evolvesTo?: string[];
}
