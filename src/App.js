import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DrinkDetails from './pages/DrinkDetails ';
import FoodDetails from './pages/FoodDetails';
import Login from './pages/Login';
import RecipesInProgress from './pages/RecipesInProgress';
import RecipesDoneOrFavorite from './pages/RecipesDoneOrFavorite';
import Food from './pages/Food';
import Drink from './pages/Drink';
import Explore from './pages/Explore';
import ExploreFood from './pages/ExploreFood';
import ExploreDrink from './pages/ExploreDrink';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route
        path="/foods/:id/in-progress"
        render={ (params) => <RecipesInProgress { ...params } /> }
      />
      <Route
        path="/drinks/:id/in-progress"
        render={ (params) => <RecipesInProgress { ...params } /> }
      />
      <Route path="/done-recipes" component={ RecipesDoneOrFavorite } />
      <Route path="/foods/:id" render={ (params) => <FoodDetails { ...params } /> } />
      <Route path="/drinks/:id" render={ (params) => <DrinkDetails { ...params } /> } />
      <Route path="/foods" component={ Food } />
      <Route path="/drinks" component={ Drink } />
      <Route path="/explore/foods" component={ ExploreFood } />
      <Route path="/explore/drinks" component={ ExploreDrink } />
      <Route path="/explore" component={ Explore } />
      {/*
      <Route path="/explore/foods/ingredients" component={ ExploreIngredients } />
      <Route path="/explore/drink/ingredients" component={ ExploreIngredients } />
      <Route path="explore/foods/nationalities" component={ ExploreNationalities } />
      <Route path="/profile" component={ Profile } />
      <Route path="/done-recipes" component={ RecipesDone } />
      <Route path="/favorite-recipes" component={ RecipesDone } />
     */}
    </Switch>

  );
}

export default App;
