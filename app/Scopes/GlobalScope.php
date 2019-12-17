<?php

namespace App\Scopes;

use Illuminate\Database\Eloquent\Scope;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Auth;
//use App\Group;

class GlobalScope implements Scope
{
    /**
     * Apply the scope to a given Eloquent query builder.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $builder
     * @param  \Illuminate\Database\Eloquent\Model  $model
     * @return void
     */
     public function apply(Builder $builder, Model $model)
     {
       if (Auth::hasUser()) {
         $user = Auth::user();
         $user_college = $user->college;
         if ($user_college){
           $user_college_id= $user_college->id;
           if ($user->hasRole('student affairs')){
             $builder->where('college_id','=', $user_college_id);
           }
           else {
             $builder;
           }
         }
         else {
           $builder;
         }
       }
     }
}
