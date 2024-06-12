import './App.css';
import Header from './components/Header';
import Form from './components/Form';
import Recomend from './components/Recomend';
import React, { useState } from 'react';

function App() {
  const [recipes, setRecipes] = useState([]);

  return (
    <div className="App">
      <Header title="Grocery_List_App" />
      <Form setRecipes={ setRecipes }/>
      <Recomend recipes={ recipes }/>
    </div>
  );
}

export default App;



