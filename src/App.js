import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Drink from './pages/Drink/index';
import DrinkDetails from './pages/DrinkDetails ';
import FoodDetails from './pages/FoodDetails';
import Login from './pages/Login';
import RecipesInProgress from './pages/RecipesInProgress';
import Food from './pages/Food';
import Explore from './pages/Explore';
import ExploreIngredients from './pages/ExploreIngredients';
import NotFound from './pages/NotFound';
import ExploreFood from './pages/ExploreFood';
import ExploreDrink from './pages/ExploreDrink';
import Profile from './pages/Profile';
import RecipesDone from './pages/RecipesDone';
import ExploreNationalities from './pages/ExploreNationalities';
import RecipesFavorites from './pages/RecipesFavorites';
import './App.css';





















































































































function App() {
  return (
    <ThemeProvider theme={ theme }>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route
          path="/foods/:id/in-progress"
          render={ (params) => <RecipesInProgress { ...params } /> }
        />
        <Route path="/foods/:id" render={ (params) => <FoodDetails { ...params } /> } />
        <Route path="/foods" component={ Food } />
        <Route
          path="/drinks/:id/in-progress"
          render={ (params) => <RecipesInProgress { ...params } /> }
        />
        <Route path="/done-recipes" component={ RecipesDone } />
        <Route path="/drinks/:id" render={ (params) => <DrinkDetails { ...params } /> } />
        <Route path="/drinks" component={ Drink } />
        <Route path="/favorite-recipes" component={ RecipesFavorites } />
        <Route path="/done-recipes" component={ RecipesDone } />
        <Route path="/explore/foods/nationalities" component={ ExploreNationalities } />
        <Route path="/explore/foods/ingredients" component={ ExploreIngredients } />
        <Route path="/explore/drinks/ingredients" component={ ExploreIngredients } />
        <Route path="/explore/foods" component={ ExploreFood } />
        <Route exact path="/explore/drinks" component={ ExploreDrink } />
        <Route exact path="/explore" component={ Explore } />
        <Route path="/profile" component={ Profile } />
        <Route path="*"><NotFound /></Route>
      </Switch>
    </ThemeProvider>
  );
}

export default App;
