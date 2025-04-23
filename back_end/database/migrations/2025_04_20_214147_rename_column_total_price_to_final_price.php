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
        Schema::table('reservation_confirmations', function (Blueprint $table) {
            $table->renameColumn('total_price', 'final_price');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('reservation_confirmations', function (Blueprint $table) {
            $table->renameColumn('final_price', 'total_price');
        });
    }
};
