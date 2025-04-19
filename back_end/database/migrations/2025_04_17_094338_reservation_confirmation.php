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
        Schema::create('reservation_confirmations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('reservation_id')->constrained()->onDelete('cascade');
            $table->string("cin");
            $table->string("permis_number");
            $table->foreignId("permis_city_id")->constrained('cities')->onDelete('cascade');
            $table->string("phone_number");
            $table->string("address");
            $table->integer("final_return");
            $table->integer("advance");
            $table->integer("rest");
            $table->integer("total_price");
            $table->string("comprehensive_insurance"); //ASSURANCE TOUT RISQUE
            $table->string("contract_path")->nullable(); 
            $table->timestamps();
        });
        
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservation_confirmations');
    }
};
