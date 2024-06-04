// App.js
import './App.css';
import Warehouses from "./getWarehouse";
import {useState, useEffect} from "react";
import MoveStock from "./MoveStock";
import { Warehouse } from './util';

function App() {

    const [providerId, setProviderId] = useState();
    const [warehouses, setWarehouses] = useState<Warehouse[]>([]);

    const fetchWarehouses = (providerId: number) => {
        if (providerId) {
            const url = `http://localhost:3001/warehouse?providerId=${providerId}`;
            fetch(url)
                .then((response) => response.json())
                .then((response) => setWarehouses(response as Warehouse[]));
        } else {
            setWarehouses([]);
        }
    };

    useEffect(() => {
        if(providerId){
            fetchWarehouses(providerId);
        }
    }, [providerId]);

    return (
        <div className="container-style">
            <div>
                <input
                    className='input-style'
                    value={providerId}
                    type="number"
                    min={0}
                    placeholder={'Introduce un ID'}
                    onChange={(event) => {
                        // @ts-ignore
                        setProviderId(event.target.value);
                    }}
                />
                <MoveStock providerId={providerId} warehouses={warehouses} fetchWarehouses={fetchWarehouses} />
            </div>
            <Warehouses providerId={providerId} warehouses={warehouses} />
        </div>
    );
}

export default App;
