<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Information extends Model
{
    protected $table = 'informations';
    protected $fillable = [
        'recipe_id',
        'name',
        'quantity',
    ];
    public function recipe(){
        return $this->belongsTo(Recipe::class);
    }
}
