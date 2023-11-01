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

![ERD](assets/ERD.drawio.png)

## Restful Routing Chart
| HTTP METHOD (_Verb_) | URL (_Nouns_)                                | CRUD   | Response                                                  | Notes                        |
| -------------------- | -------------------------------------------- | ------ | --------------------------------------------------------- | ---------------------------- |
| `users`              |                                              |        |                                                           |                              |
| GET                  | /users/user:id                               | READ   | display user cookbook with userId                         |                              |
| GET                  | /auth2callback                               | R/C    | login or add user to database after google oauth          |                              |
| PUT/PATCH            | /users/:userId/recipes/:recipeId             | UPDATE | link recipe with recipeId to user with userId             | add recipe to cookbook       |
| `recipes`            |                                              |        |                                                           |                              |
| GET                  | /recipes                                     | READ   | displays array of all recipes                             |                              |
| GET                  | /recipes/:recipesId                          | READ   | display a single recipe with recipesId                    |                              |
| GET                  | /recipes/new                                 | CREATE | display new recipe view                                   | create/update uses same view |
| POST                 | /recipes                                     | CREATE | create new recipe                                         |                              |
| GET                  | /recipes/:recipesId/edit                     | UPDATE | display new recipe view populated with recipe info        | create/update uses same view |
| PUT/PATCH            | /recipes/:recipesId                          | UPDATE | update user with recipesId                                |                              |
| PUT/PATCH            | /recipes/:recipeId/ingredients/:ingredientId | UPDATE | link ingredient with ingredientId to recipe with recipeId |                              |
| DELETE               | /recipes/:recipesId                          | DELETE | delete user with recipesId                                |                              |
| `ingredients`        |                                              |        |                                                           |                              |
| GET                  | /ingredients/new                             | READ   | display new ingredient view                               |                              |
| POST                 | /ingredients                                 | CREATE | create new ingredient                                     |                              |


## WireFrame
![Landing/ Home Page](assets/Landing_HomePage.drawio.png)
![All Recipes in Database View](assets/All-Recipes-in-Database-View.drawio.png)
![Cookbook View](assets/Cookbook-View.drawio.png)
![Recipe View](assets/Recipe-View.drawio.png)
![Recipe Create/Update View](assets/Recipe-Create_Update-View.drawio.png)
![Ingredient Create View](assets/Ingredient-Create-View.drawio.png)

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
* user can see all recipes in database
* user CRUDs recipes
* user see a recipe details
* user sees all their recipes (cookbook)
* user can favorite recipes (add to cookbook)
* user CR ingredients

## Stretch Goals
* user CRUD comments on recipie
* comments:Recipies(M:N) & User:Comments(M:N)


## Maybe Roadblocks
* Feature creep
* Route mix up
