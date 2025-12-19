<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use Illuminate\Http\Request;

class RecipeController extends Controller
{
    public function getRecipes(){
        $recipes = Recipe::all();
        return response()->json([
            "recipes"=>$recipes
        ]);
    }
    public function store(Request $request){
        $request->validate([
            "title"=>'required|string|max:255',
            "description"=>"required|string",
            "image"=>"nullable|image|mimes:jpeg,png,jpg,gif|max:2048",
            "ingredients"=>"required|array|min:1",
            "ingredients.*.name"=>"required|string|max:255",
            "ingredients.*.quantity"=>"required|string|max:255",
            "steps"=>"required|array|min:1",
            "steps.*.step_number"=>"required|integer|min:1",
            "steps.*.description"=>"required|string"
        ]);
        $imagePath = null;
        if($request->hasFile('image')){
            $imagePath = $request->file('image')->store('images/recipes',"public");
        }
        $recipe = Recipe::create([
            "title"=>$request->title,
            "description"=>$request->description,
            "image"=>$imagePath,
            "user_id"=>1
        ]);
        foreach($request->ingredients as $ingredient){
            $recipe->ingredients()->create([
                'name'=>$ingredient['name'],
                "quantity"=>$ingredient['quantity'],
            ]);
        }
        foreach($request->steps as $step){
            $recipe->steps()->create([
                "step_number"=>$step['step_number'],
                "description"=>$step['description']
            ]);
        }
        return response()->json([
            'message' => 'Recipe created successfully!',
            'recipe' => $recipe->load(['ingredients', 'steps']),
        ], 201);

    }
}
