<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('reservations', function (Blueprint $table) {

            $table->dropColumn([
                'reservation_id',
                'payment_method',
                'payment_status',
                'amount'
            ]);

            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('car_id')->constrained()->onDelete('cascade');
            $table->date('rental_start');
            $table->date('rental_end');
            $table->decimal('daily_rate', 10, 2);
            $table->decimal('final_price', 10, 2);
            $table->enum('state', ['pending', 'confirmed', 'canceled', 'completed'])->default('pending');
        });
    }

    public function down()
    {
        Schema::table('reservations', function (Blueprint $table) {

            $table->dropForeign(['user_id']);
            $table->dropForeign(['car_id']);
            $table->dropColumn([
                'user_id',
                'car_id',
                'rental_start',
                'rental_end',
                'daily_rate',
                'final_price',
                'state'
            ]);

            $table->foreignId('reservation_id')->constrained()->onDelete('cascade');
            $table->enum('payment_method', ['credit_card', 'paypal', 'cash']);
            $table->enum('payment_status', ['pending', 'completed', 'failed'])->default('pending');
            $table->decimal('amount', 10, 2);
        });
    }
};
