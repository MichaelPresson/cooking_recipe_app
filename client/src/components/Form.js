import React, { useState } from 'react';

function Form({ setRecipes }) {
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
        alert('You cannot add more items');
      }
    }
  };

  const handleClear = () => {
    setItem('');
    setItems([]);
    setRecipes([]);
  };

  const search = async () => {
    try {
      const response = await fetch('http://localhost:3001/getOnlineRecommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ingredients: items }),
      });
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  return (
    <div className='form-container'>
      <div className='form-left-container'>
        <div className='grocerylist'>
          {items.join(', ')}
        </div>
        <form onSubmit={addToList}>
          <div className='form-input-container'>
            <input
              className='form-input'
              type="text"
              value={item}
              onChange={handleChange}
              placeholder="Add a grocery item"
            />
            <div className='form-button-container'>
              <button className="form-button" type="button" onClick={ addToList }>
                Add Item
              </button>
              <button className="form-button" type="button" onClick={handleClear}>
                Clear
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className='form-right-container'>
        <div>
          Type an item you have and press enter to add to list. 
          Press search and we will find a matching recipe!
        </div>
        <button className="form-button-search" type="button" onClick={search}>
          Search
        </button>
      </div>
    </div>
  );
}

export default Form;
