import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Drink from './pages/Drink';
import Food from './pages/Food';
import Login from './pages/Login';
import Profile from './pages/Profile';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/foods" component={ Food } />
      <Route path="/drinks" component={ Drink } />
      {/* <Route path="/foods/:id" render={ (params) => <Food { ...params } /> } />
      <Route path="/drinks/:id" render={ (params) => <Drink { ...params } /> } />
      <Route
        path="/foods/:id/in-progress"
        render={ (params) => <Food { ...params } /> }
      />
      <Route
        path="/drinks/:id/in-progress"
        render={ (params) => <Drink { ...params } /> }
      />
      <Route path="/explore" component={ Explore } />
      <Route path="/explore/foods" component={ ExploreFood } />
      <Route path="/explore/drink" component={ ExploreDrink } />
      <Route path="/explore/foods/ingredients" component={ ExploreIngredients } />
      <Route path="/explore/drink/ingredients" component={ ExploreIngredients } />
      <Route path="explore/foods/nationalities" component={ ExploreNationalities } /> */}
      <Route path="/profile" component={ Profile } />
      {/* <Route path="/done-recipes" component={ RecipesDone } />
      <Route path="/favorite-recipes" component={ RecipesDone } /> */}
    </Switch>

  );
}

export default App;
