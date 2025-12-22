<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Recipe;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function getCategories(){
        $categories = Category::withCount('recipes')->get();
        return response()->json([
            'categories' => $categories,
        ]);
    }
    public function showCategory($id){
        $category = Category::findOrFail($id);
        return response()->json([
            'category' => $category,
        ]);
    }
    public function store(Request $request){
        $request->validate([
            "name"=>"required|string|max:255",
            'description' => 'required|string',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
        $imagePath = null;
        if($request->hasFile('image')){
            $imagePath = $request->file('image')->store('images/categories',"public");
        }
        $category = Category::create([
            "name"=>$request->name,
            "description"=>$request->description,
            "image"=>$imagePath,
        ]);
         return response()->json([
            'message' => 'Category created successfully!',
            'category' => $category,
            "image"=>$imagePath
        ], 201);
    }
    public function update(Request $request,$id){
        $category = Category::findOrFail($id);
        $request->validate([
            "name"=>"required|string|max:255",
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
        $data = [
            "name"=>$request->name,
            "description"=>$request->description,
        ];

        if($request->hasFile('image')){
            if($category->image && Storage::disk('public')->exists($category->image)){
                    \Storage::disk('public')->delete($category->image);
            }
            $data['image']= $request->file('image')
            ->store('images/categories', 'public');
        }
        $category->update($data);
         return response()->json([
            'message' => 'Category created successfully!',
            'category' => $category,
        ], 201);
    }
     public function destroy($id)
    {
        $category = Category::findOrFail($id);
        $category->delete();

        return response()->json([
            'message' => 'Category deleted successfully!',
        ]);
    }
}
