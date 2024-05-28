
import './App.css';
import Warehouses from "./getWarehouse";
import {ChangeEventHandler, EventHandler, useState} from "react";
import WarehouseCard from "./WarehouseCard";
import MoveStock from "./MoveStock";

function App() {

    const [providerId, setProviderId] = useState()

  return (
      <div>
          <div className="left-side-style">
              <input
                  className='input-style'
                  value={providerId}
                  type="number"
                  min={0}
                  placeholder={'Introduce un ID'}
                  onChange={(event) => {
                      // @ts-ignore
                      setProviderId(event.target.value)
                  }}
              />
          </div>
          <MoveStock providerId={providerId} />
        <Warehouses providerId={providerId}/>
      </div>

  );
}

export default App;
