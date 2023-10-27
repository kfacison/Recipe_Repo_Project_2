# Recipe Repo
A  Repository for all your recipies. Add all your favorite Recipe here.


## Tech Being Used
* HTML/CSS
* JavaScript
* express
* mongoDB
* ejs


## WireFrame

| HTTP METHOD (_Verb_) | URL (_Nouns_)                                | CRUD   | Response                                                  | Notes                        |
| -------------------- | -------------------------------------------- | ------ | --------------------------------------------------------- | ---------------------------- |
| `users`              |                                              |        |                                                           |                              |
|                      |                                              |        |                                                           |                              |
| POST                 | /users                                       | CREATE | create new user                                           | done in user Auth            |
| PUT/PATCH            | /users/:userId/recipes/:recipeId             | UPDATE | link recipe with recipeId to user with userId             | add recipe to cookbook       |
| `recipes`            |                                              |        |                                                           |                              |
| GET                  | /recipes                                     | READ   | displays array of all recipes                             |                              |
| GET                  | /recipes/:recipesId                          | READ   | display a single recipe with recipesId                    |                              |
| POST                 | /recipes                                     | CREATE | create new recipe                                         | create/update uses same view |
| PUT/PATCH            | /recipes/:recipesId                          | UPDATE | update user with recipesId                                | create/update uses same view |
| PUT/PATCH            | /recipes/:recipeId/ingredients/:ingredientId | UPDATE | link ingredient with ingredientId to recipe with recipeId |                              |
| DELETE               | /recipes/:recipesId                          | DELETE | delete user with recipesId                                |                              |
| `ingredients`        |                                              |        |                                                           |                              |
| POST                 | /ingredients                                 | CREATE | create new ingredient                                     |                              |
|                      |                                              |        |                                                           |                              |


## MVP Checklist
* user signs in
* user sees list of all their recipies (cookbook)
* user see a recipie 
* user CRUDs recipies
* user can favorirte recipes (add to cookbook)
* user CR ingredients
* user can see all recipies in database
* user:Recipie (1:M)
* Recipies:ingredients(M:N)

## Stretch Goals
* user CRUD comments on recipie
* comments:Recipies(M:N)&User:Comments(M:N)



## Maybe Roadblocks
* Feature creep
