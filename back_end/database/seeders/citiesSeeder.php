<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class citiesSeeder extends Seeder

{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

                $sql = File::get(database_path('data_cities/sql/ville.sql'));
                DB::unprepared($sql);
    }
}
