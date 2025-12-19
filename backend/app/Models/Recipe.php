<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Recipe extends Model
{
    protected $fillable = [
        'title',
        'description',
        'image',
        'user_id',
    ];
    public function ingredients(){
        return $this->hasMany(Ingredient::class);
    }
    public function steps(){
        return $this->hasMany(Step::class);
    }
    public function user(){
        return $this->belongsTo(User::class);
    }
}
