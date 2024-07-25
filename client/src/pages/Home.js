import Form from '../components/Form';
import Recomend from '../components/Recomend';
import React, { useState } from 'react';



export default function Home({ user }) {
    const [recipes, setRecipes] = useState([]);
  
    return (
      <div>
          <Form setRecipes={setRecipes} />
          <Recomend recipes={recipes} user={ user }/>
      </div>
    );
  }