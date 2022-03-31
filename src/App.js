import React from 'react';
import { Route, Switch } from 'react-router-dom';
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
      {/* <Route path="/foods" component={ Food } />
      <Route path="/drinks" component={ Drink } />
      <Route path="/foods/:id" render={ (params) => <Food { ...params } /> } />
      <Route path="/drinks/:id" render={ (params) => <Drink { ...params } /> } />
      <Route path="/explore" component={ Explore } />
      <Route path="/explore/foods" component={ ExploreFood } />
      <Route path="/explore/drink" component={ ExploreDrink } />
      <Route path="/explore/foods/ingredients" component={ ExploreIngredients } />
      <Route path="/explore/drink/ingredients" component={ ExploreIngredients } />
      <Route path="explore/foods/nationalities" component={ ExploreNationalities } />
      <Route path="/profile" component={ Profile } />
      <Route path="/favorite-recipes" component={ RecipesDone } /> */}
    </Switch>

  );
}

export default App;
