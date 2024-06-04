// getWarehouse.js
import React from 'react';
import { Warehouse } from "./util";
import WarehouseCard from "./WarehouseCard";

const Warehouses = ({ providerId, warehouses }: { providerId: number | undefined, warehouses: Warehouse[] }) => {

    return (
        <div className="map-style">
            {warehouses?.map((warehouse) => (
                <WarehouseCard key={warehouse.id} warehouse={warehouse} />
            ))}
        </div>
    )
}

export default Warehouses;
