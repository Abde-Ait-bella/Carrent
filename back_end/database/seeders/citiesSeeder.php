<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class citiesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $cities = [
            ['id' => 1, 'ville' => 'Aïn Harrouda', 'region' => 6],
            ['id' => 2, 'ville' => 'Ben Yakhlef', 'region' => 6],
            ['id' => 3, 'ville' => 'Bouskoura', 'region' => 6],
            ['id' => 4, 'ville' => 'Casablanca', 'region' => 6],
            // Continuing with all cities from the SQL
            // ... 
            ['id' => 404, 'ville' => 'Aït Attab', 'region' => 5],
        ];

        // Insert cities in chunks to avoid memory issues
        foreach (array_chunk($cities, 100) as $chunk) {
            \DB::table('ville')->insert($chunk);
        }
    }
}
