
import './App.css';
import Header from './components/Header';
import Form from './components/Form';
import Recomend from './components/Recomend';
import React, { useState } from 'react';
//import { BrowserRouter as Router, Route} from 'react-router-dom';

function App() {
  const [recipes, setRecipes] = useState([]);

  return (
  
      <div className="App">
        <Header title="CodedCuisine: An Ingredient-Based Recipe Finder" />
      
         
            <div>
              <Form setRecipes={setRecipes} />
              <Recomend recipes={recipes} />
            </div>
         
  
      </div>
 
  );
}

export default App;