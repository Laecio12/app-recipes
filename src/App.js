import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DrinkDetails from './pages/DrinkDetails ';
import FoodDetails from './pages/FoodDetails';
import Login from './pages/Login';
import RecipesInProgress from './pages/RecipesInProgress';
import RecipesDoneOrFavorite from './pages/RecipesDoneOrFavorite';

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
      {/* <Route path="/foods" component={ Food } />
      <Route path="/foods/:id" render={ (params) => <Food { ...params } /> } />
      <Route path="/drinks/:id" render={ (params) => <Drink { ...params } /> } />
      <Route path="/drinks" component={ Drink } />
      {/* <Route path="/foods" component={ Food } />
      <Route path="/drinks" component={ Drink } />
      <Route path="/foods/:id/in-progress" render={ (params) => <Food { ...params } /> } />
      <Route path="/drinks/:id/in-progress" render={ (params) => <Drink { ...params } /> } />
     */}
    </Switch>

  );
}

export default App;
