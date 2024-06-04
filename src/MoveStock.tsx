// MoveStock.js
import React, { useState, ChangeEvent } from 'react';
import { Warehouse } from './util';

const MoveStock: React.FC<{ providerId: number | undefined, warehouses: Warehouse[], fetchWarehouses: (providerId: number) => void }> = ({ providerId, warehouses, fetchWarehouses }) => {
    const [selectedProduct, setSelectedProduct] = useState<number | undefined>();
    const [quantity, setQuantity] = useState<number>(0);
    const [fromWarehouse, setFromWarehouse] = useState<number | undefined>();
    const [toWarehouse, setToWarehouse] = useState<number | undefined>();

    const handleMoveStock = () => {
        if (selectedProduct !== undefined && fromWarehouse !== undefined && toWarehouse !== undefined && quantity > 0) {
            const url = `http://localhost:3001/warehouse/move/${selectedProduct}`;
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    providerId: Number(providerId),
                    fromWarehouseId: fromWarehouse,
                    toWarehouseId: toWarehouse,
                    quantity: Number(quantity)
                })
            }).then(() => {
                if(providerId){
                    fetchWarehouses(providerId);  // Refresh warehouses after moving stock
                }
            });
        }
        else {
            alert("Por favor, rellena todos los campos. La cantidad debe ser positiva.");
        }
    };

    const availableProducts = warehouses.flatMap(warehouse => warehouse.products).map((product) => (product.productId));

    return (
        <div className="mover-stock-style">
            <h2>Mover Stock</h2>
            <div>
                <label>Producto: </label>
                <select onChange={(e) => setSelectedProduct(Number(e.target.value))}>
                    <option value="">Seleccionar Producto</option>
                    {availableProducts.filter((product, index, array) => array.indexOf(product) === index).map((product) => (
                        <option value={product} key={product}>{product}</option>
                    ))}
                </select>
            </div>
            <div>
                <label>Cantidad: </label>
                <input
                    type="string"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                />
            </div>
            <div>
                <label>Desde: </label>
                <select onChange={(e) => setFromWarehouse(Number(e.target.value))}>
                    <option value="">Seleccionar Almacén</option>
                    {warehouses.map((warehouse) => (
                        <option key={warehouse.id} value={warehouse.id}>{warehouse.id}</option>
                    ))}
                </select>
            </div>
            <div>
                <label>Hasta: </label>
                <select onChange={(e) => setToWarehouse(Number(e.target.value))}>
                    <option value="">Seleccionar Almacén</option>
                    {warehouses.map((warehouse) => (
                        <option key={warehouse.id} value={warehouse.id}>{warehouse.id}</option>
                    ))}
                </select>
            </div>
            <button onClick={handleMoveStock}>Mover</button>
        </div>
    );
};

export default MoveStock;
