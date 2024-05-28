import React from 'react';
import { Warehouse, productInfo } from './util';

const WarehouseCard: React.FC<{ warehouse: Warehouse }> = ({ warehouse }) => {
    return (
        <div className="warehouse-card-style">
            <h2>Warehouse {warehouse.id}</h2>
            <p>{warehouse.address}</p>
            <table className="table-style">
                <thead>
                <tr>
                    <th>Producto</th>
                    <th>Stock</th>
                </tr>
                </thead>
                <tbody>
                {warehouse.products.map((product: productInfo) => (
                    <tr key={product.productId}>
                        <td>{product.productId}</td>
                        <td>{product.stock}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default WarehouseCard;
