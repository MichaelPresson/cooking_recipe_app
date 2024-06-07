import React, { useState } from 'react';

function Form() {
  const [item, setItem] = useState('');
  const [items, setItems] = useState([]);
  const maxItems = 7;

  const handleChange = (e) => {
    setItem(e.target.value);
  };

  const addToList = (e) => {
    e.preventDefault();
    if (item.trim() !== '') {
        if (items.length < maxItems) {
            setItems([...items, item]);
            setItem('');
        } else {
            alert('you can not add more items')
        }

    }
  };

  const handleClear = () => {
    setItem('');
    setItems([]);
  };
  
  const search = () => {
    console.log("searching...")
  };

  return (
    <div className='form-container'>
      <div className='form-left-container'>
        <div className='grocerylist'>
          {items.join(', ')}
        </div>
        <form onSubmit={addToList}>
          <div className='form-input-container'>
            <input className='form-input'
              type="text"
              value={item}
              onChange={handleChange}
              placeholder="Add a grocery item"
            />
            <div className='form-button-container'>
              <button className="form-button" type="button" onClick={search}>
                Search
              </button>
              <button className="form-button" type="button" onClick={handleClear}>
                Clear
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className='form-right-container'>
        Type an item you have and press enter to add to list. Press search and we will find a matching recipe!
      </div>
    </div>
  );
}

export default Form;
