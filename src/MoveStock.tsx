import React, { useEffect, useState, ChangeEvent } from 'react';
import { Warehouse } from './util';

const MoveStock: React.FC<{ providerId: number | undefined }> = ({ providerId }) => {
    const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<number | undefined>();
    const [quantity, setQuantity] = useState<number>(0);
    const [fromWarehouse, setFromWarehouse] = useState<number | undefined>();
    const [toWarehouse, setToWarehouse] = useState<number | undefined>();
    const url: string = `http://localhost:3001/warehouse?providerId=${providerId}`;
    const url2: string = `http://localhost:3001/warehouse/move/${selectedProduct}`
    const availableProducts = warehouses.flatMap(warehouse => warehouse.products).map((product) => (product.productId))

    useEffect(() => {
        if (providerId) {
            fetch(url)
                .then((response) => response.json())
                .then((response) => setWarehouses(response as Warehouse[]));
        } else {
            setWarehouses([]);
        }
    }, [providerId]);

    const handleMoveStock = () => {
        if (selectedProduct !== undefined && fromWarehouse !== undefined && toWarehouse !== undefined && quantity > 0) {
            fetch(url2, {
                method: "POST",
                headers:{
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    providerId: Number(providerId),
                    fromWarehouseId: fromWarehouse,
                    toWarehouseId: toWarehouse,
                    quantity: Number(quantity)
                })
            })

        }
    };

    const handleProductChange = (e: ChangeEvent<HTMLSelectElement>) => {
        // @ts-ignore
        setSelectedProduct(Number(e.target.value));
    };

    const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        setQuantity(e.target.value);
    };

    const handleFromWarehouseChange = (e: ChangeEvent<HTMLSelectElement>) => {
        // @ts-ignore
        setFromWarehouse(Number(e.target.value));
    };

    const handleToWarehouseChange = (e: ChangeEvent<HTMLSelectElement>) => {
        // @ts-ignore
        setToWarehouse(Number(e.target.value));
    };

    return (
        <div className="mover-stock-style">
            <h2>Mover Stock</h2>
            <div>
                <label>Producto: </label>
                <select onChange={handleProductChange}>
                    <option value="">Seleccionar Producto</option>
                    {availableProducts.filter((product, index, array)=> array.indexOf(product) === index).map((product)=>(<option
                        value={product}
                        key={product}
                    >
                        {product}
                    </option>))}
                </select>
            </div>
            <div>
                <label>Cantidad: </label>
                <input
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange}
                />
            </div>
            <div>
                <label>Desde: </label>
                <select onChange={handleFromWarehouseChange}>
                    <option value="">Seleccionar Almacén</option>
                    {warehouses.map((warehouse) => (
                        <option key={warehouse.id} value={warehouse.id}>
                            {warehouse.id}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Hasta: </label>
                <select onChange={handleToWarehouseChange}>
                    <option value="">Seleccionar Almacén</option>
                    {warehouses.map((warehouse) => (
                        <option key={warehouse.id} value={warehouse.id}>
                            {warehouse.id}
                        </option>
                    ))}
                </select>
            </div>
            <button onClick={handleMoveStock}>Mover</button>
        </div>
    );
};

export default MoveStock;
