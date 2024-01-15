import "./App.css";
import { useState } from "react";
import { data } from "./data.js";

function App() {
  const [input, setInput] = useState("");
  const [showList, setShowList] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const inputHandler = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setInput(value);
    setShowList(value !== "");
  };

  const showNamesHandler = () => {
    setShowList(true);
  };

  const addChip = (item) => {
    setSelectedItems([...selectedItems, item]);
    setInput("");
  };

  const removeChip = (item) => {
    const updatedSelectedItems = selectedItems.filter(
      (selectedItem) => selectedItem !== item
    );
  
    setSelectedItems(updatedSelectedItems);
  
    if (input === "") {
      setShowList(false);
    }
  };
  

  const filteredList = data.filter(
    (item) =>
      !selectedItems.includes(item) &&
      item.name.toLowerCase().includes(input.toLowerCase())
  );

  return (
    <div className="App">
      <label>
        <div className="selected-chips">
          {selectedItems.map((item) => (
            <div key={item.name} className="chip">
              {item.name}
              <button onClick={() => removeChip(item)}>X</button>
            </div>
          ))}
        </div>
        <input
          placeholder="Enter a name"
          onChange={inputHandler}
          value={input}
          onFocus={showNamesHandler}
        />
      </label>

      {showList && (
        <div className="menu-bar">
          {filteredList.map((item) => (
            <div key={item.name} onClick={() => addChip(item)}>
              <img
                src={item.image}
                alt={item.name}
                width="30"
                height="30"
                style={{ borderRadius: "50%", marginRight: "8px" }}
              />
              {item.name} - {item.email}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
