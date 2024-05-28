import {useEffect, useState} from "react";
import {Warehouse} from "./util";
import WarehouseCard from "./WarehouseCard";

const Warehouses = ({providerId}:{providerId:number|undefined}) => {
    const [warehouse, setWarehouse] = useState<Warehouse[]>([]);
    const url: string =`http://localhost:3001/warehouse?providerId=${providerId}`


    const getWarehouse = () => {
        if(
            providerId
        ) {
            fetch(url)
                .then((response) => response.json())
                .then((response) => setWarehouse(response as Warehouse[]));
        } else {
            setWarehouse([])
        }
    };

    useEffect(() => {
        getWarehouse();
    }, [providerId]);

    return(
        <div className="map-style">
            {warehouse?.map((warehouse) => (
                <WarehouseCard key={warehouse.id} warehouse={warehouse} />
            ))}
        </div>
    )
}

export default Warehouses