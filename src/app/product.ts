export interface Product {
    id: number;
    name: string;
    isFavorite: boolean;
    createdDate: Date;
    imgUrl: string;
    quantite?: number;
}