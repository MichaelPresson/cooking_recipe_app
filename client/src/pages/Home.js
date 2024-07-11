import Header from '../components/Header';
import Form from '../components/Form';
import Recomend from '../components/Recomend';
import React, { useState } from 'react';




export default function Home() {
    const [recipes, setRecipes] = useState([]);
  
    return (
        <div>
          <Header title="Grocery_List_App" />
              <div>
                <Form setRecipes={setRecipes} />
                <Recomend recipes={recipes} />
              </div>
        </div>
    );
  }