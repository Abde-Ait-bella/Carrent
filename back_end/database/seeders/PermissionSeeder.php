<?php

namespace Database\Seeders;

use DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Route;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Récupérer toutes les routes
        $routes = collect(Route::getRoutes())->map(function ($route) {
            return $route->getName(); // Récupère le nom de la route
        })->filter(); // Filtrer pour enlever les valeurs nulles

        // // Ajouter les permissions si elles n'existent pas
        foreach ($routes as $routeName) {
            if (!DB::table('permissions')->where('name', $routeName)->exists()) {
                DB::table('permissions')->insert([
                    'name' => $routeName,
                    'guard_name' => 'api', // Assurez-vous que le champ correspond à votre table
                    'created_at' => now(),
                    'updated_at' => now()
                ]);
            }
        }


    }
}
