<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use Illuminate\Http\Request;

class RecipeController extends Controller
{
    public function getRecipes()
    {
        $recipes = Recipe::with('category')->get();

        return response()->json([
            'recipes' => $recipes,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'category_id' => 'required|exists:categories,id',
            'ingredients' => 'required|array|min:1',
            'ingredients.*.name' => 'required|string|max:255',
            'ingredients.*.quantity' => 'required|string|max:255',
            'steps' => 'required|array|min:1',
            'steps.*.step_number' => 'required|integer|min:1',
            'steps.*.description' => 'required|string',
            'informations' => 'required|array|min:1',
            'informations.*.name' => 'required|string',
            'informations.*.quantity' => 'required|string',

        ], [
            'ingredients.*.name.required' => 'The ingredient name field is required.',
            'ingredients.*.quantity.required' => 'The ingredient quantity field is required.',
            'steps.*.description.required' => 'The step description field is required.',
        ]);
        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('images/recipes', 'public');
        }
        $recipe = Recipe::create([
            'title' => $request->title,
            'description' => $request->description,
            'image' => $imagePath,
            'category_id' => $request->category_id,
            'user_id' => 1,
        ]);
        foreach ($request->ingredients as $ingredient) {
            $recipe->ingredients()->create([
                'name' => $ingredient['name'],
                'quantity' => $ingredient['quantity'],
            ]);
        }
        foreach ($request->steps as $step) {
            $recipe->steps()->create([
                'step_number' => $step['step_number'],
                'description' => $step['description'],
            ]);
        }
        foreach ($request->informations as $information) {

            $recipe->informations()->create([
                'name' => $information['name'],
                'quantity' => $information['quantity'],
            ]);
        }

        return response()->json([
            'message' => 'Recipe created successfully!',
            'recipe' => $recipe->load(['ingredients', 'steps', 'informations']),
        ], 201);

    }

    public function update(Request $request, $id)
    {
        $recipe = Recipe::findOrFail($id);

        $request->validate(
            [
                'title' => 'required|string|max:255',
                'description' => 'required|string',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
                'category_id' => 'required|exists:categories,id',
                'ingredients' => 'required|array|min:1',
                'ingredients.*.name' => 'required|string|max:255',
                'ingredients.*.quantity' => 'required|string|max:255',
                'steps' => 'required|array|min:1',
                'steps.*.step_number' => 'required|integer|min:1',
                'steps.*.description' => 'required|string',
                'informations' => 'required|array|min:1',
                'informations.*.name' => 'required|string',
                'informations.*.quantity' => 'required|string',

            ],
            [
                'ingredients.*.name.required' => 'The ingredient name field is required.',
                'ingredients.*.quantity.required' => 'The ingredient quantity field is required.',
                'steps.*.description.required' => 'The step description field is required.',
            ]
        );

        $data = [
            'title' => $request->title,
            'description' => $request->description,
            'category_id' => $request->category_id,
        ];
        if ($request->hasFile('image')) {
            if ($recipe->image && \Storage::disk('public')->exists($recipe->image)) {
                \Storage::disk('public')->delete($recipe->image);
            }

            $data['image'] = $request->file('image')
                ->store('images/recipes', 'public');
        }

        $recipe->update($data);
        $recipe->ingredients()->delete();
        $recipe->steps()->delete();

        foreach ($request->ingredients as $ingredient) {
            $recipe->ingredients()->create([
                'name' => $ingredient['name'],
                'quantity' => $ingredient['quantity'],
            ]);
        }
        foreach ($request->informations as $information) {

            $recipe->informations()->create([
                'name' => $information['name'],
                'quantity' => $information['quantity'],
            ]);
        }

        foreach ($request->steps as $step) {
            $recipe->steps()->create([
                'step_number' => $step['step_number'],
                'description' => $step['description'],
            ]);
        }

        return response()->json([
            'message' => 'Recipe updated successfully!',
            'recipe' => $recipe->load(['ingredients', 'steps', 'informations']),
        ], 200);
    }

    public function showRecipe($id)
    {
        $recipe = Recipe::findOrFail($id);

        return response()->json([
            'recipe' => $recipe->load(['ingredients', 'steps', 'informations']),
        ]);
    }

    public function destroy($id)
    {
        $recipe = Recipe::findOrFail($id);
        $recipe->delete();

        return response()->json([
            'message' => 'Recipe deleted successfully!',
        ]);
    }
    public function getFiveRecipeByCategory($id){
        $recipes = Recipe::where("category_id",$id)->limit(5)->get();
        return response()->json([
            'recipes' => $recipes,
        ]);
    }
    public function recipesByCategory($id){
        $recipes = Recipe::where("category_id",$id)->with('category')->get();
        return response()->json([
            'recipes' => $recipes,
        ]);
    }
}

