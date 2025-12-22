<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\RecipeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/index', [RecipeController::class, "getRecipes"]);
Route::get('showRecipe/{id}',[RecipeController::class, "showRecipe"]);
Route::post('/recipes/store', [RecipeController::class, "store"])->middleware('auth:sanctum');;
Route::put('/recipes/update/{id}',[RecipeController::class, "update"])->middleware('auth:sanctum');;
Route::delete('recipes/destroy/{id}',[RecipeController::class, "destroy"])->middleware('auth:sanctum');;
Route::get('/recipesByCategory/{id}',[RecipeController::class, "recipesByCategory"]);
Route::get('/getFiveRecipeByCategory/{id}',[RecipeController::class, "getFiveRecipeByCategory"]);

Route::get('/categories/index',[CategoryController::class, "getCategories"]);
Route::get('/categories/{id}',[CategoryController::class, "showCategory"]);
Route::post('/categories/store',[CategoryController::class, "store"])->middleware('auth:sanctum');;
Route::put('/categories/update/{id}',[CategoryController::class, "update"])->middleware('auth:sanctum');;
Route::delete('categories/destroy/{id}',[CategoryController::class, "destroy"])->middleware('auth:sanctum');;


Route::post('/login',[AuthController::class, "login"]);
Route::post('/register',[AuthController::class, "register"]);
Route::post('/logout',[AuthController::class, "logout"])->middleware('auth:sanctum');


