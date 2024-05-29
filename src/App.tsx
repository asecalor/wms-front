
import './App.css';
import Warehouses from "./getWarehouse";
import {useState} from "react";
import MoveStock from "./MoveStock";

function App() {

    const [providerId, setProviderId] = useState()

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
                      setProviderId(event.target.value)
                  }}
              />
              <MoveStock providerId={providerId} />
          </div>

        <Warehouses providerId={providerId}/>
      </div>

  );
}

export default App;
