<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('cars', function (Blueprint $table) {
            $table->id();
            $table->string('brand');
            $table->string('model');
            $table->string('registration_number')->unique();
            $table->integer('year');
            $table->string('color');
            $table->string('engine');
            $table->string('image');
            $table->string('quantity');
            $table->integer('mileage');
            $table->integer('stars');
            $table->decimal('price_per_day', 10, 2);
            $table->enum('status', ['disponible', 'reserve', 'loue', 'maintenance']);
            $table->text('description')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cars');
    }
};
