export type Warehouse = {
    id: number;
    providerId: number;
    address: string;
    products: productInfo[]
}

export type productInfo = {
    wareHouseId: number;
    productId: number;
    stock: number

}