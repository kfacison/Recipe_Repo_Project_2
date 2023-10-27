# Recipe Repo
A  Repository for all your recipies. Add all your favorite recipes to your cookbook and veiw other users recipes. The user logs In with google. 


## Tech Being Used
* HTML/CSS
* JavaScript
* express
* mongoDB
* oAuth 2.0

## ERD
* user : recipe (1:M)
* recipes : ingredients (M:N)


## Restful Routing Chart
| HTTP METHOD (_Verb_) | URL (_Nouns_)                                | CRUD   | Response                                                  | Notes                        |
| -------------------- | -------------------------------------------- | ------ | --------------------------------------------------------- | ---------------------------- |
| `users`              |                                              |        |                                                           |                              |
| GET                  | /auth2callback                               | R/C    | login or add user to database after google oauth          |                              |
| PUT/PATCH            | /users/:userId/recipes/:recipeId             | UPDATE | link recipe with recipeId to user with userId             | add recipe to cookbook       |
| `recipes`            |                                              |        |                                                           |                              |
| GET                  | /recipes                                     | READ   | displays array of all recipes                             |                              |
| GET                  | /recipes/:recipesId                          | READ   | display a single recipe with recipesId                    |                              |
| GET                  | /recipes/new                                 | READ   | display new recipe view                                   |                              |
| POST                 | /recipes                                     | CREATE | create new recipe                                         | create/update uses same view |
| PUT/PATCH            | /recipes/:recipesId                          | UPDATE | update user with recipesId                                | create/update uses same view |
| PUT/PATCH            | /recipes/:recipeId/ingredients/:ingredientId | UPDATE | link ingredient with ingredientId to recipe with recipeId |                              |
| DELETE               | /recipes/:recipesId                          | DELETE | delete user with recipesId                                |                              |
| `ingredients`        |                                              |        |                                                           |                              |
| GET                  | /ingredients/new                             | READ   | display new ingredient view                               |                              |
| POST                 | /ingredients                                 | CREATE | create new ingredient                                     |                              |


## WireFrame


## User Stories
* As a user I want to signs in and out
* As a user and viewer I want to be able to see a list of all recipes in the database
* As a user I want to sees list of all My recipes (cookbook)
* As a user I want to see a recipe and ingredients
* As a user I want to create and update my recipes
* As a user I want to favorite recipes and add them to my cookbook
* As a user I want to create ingredients

## MVP Checklist
* user signs in and out
* user sees list of all their recipes (cookbook)
* user see a recipe
* user CRUDs recipes
* user can favorite recipes (add to cookbook)
* user CR ingredients
* user can see all recipes in database

## Stretch Goals
* user CRUD comments on recipie
* comments:Recipies(M:N) & User:Comments(M:N)


## Maybe Roadblocks
* Feature creep
* Route mix up
