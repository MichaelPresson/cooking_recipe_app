import Form from '../components/Form';
import Recomend from '../components/Recomend';
import React, { useState } from 'react';



export default function Home({  user, savedRecipes, updateSavedRecipes }) {
    const [recipes, setRecipes] = useState([]);
  
    return (
      <div className='home'>
          <Form setRecipes={setRecipes} />
          <Recomend recipes={recipes} user={ user } savedRecipes={ savedRecipes } updateSavedRecipes={ updateSavedRecipes }/>
      </div>
    );
  } 