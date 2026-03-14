<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('shop_items', function (Blueprint $table) {
            $table->increments('id');
            $table->string('item_name', 50)->nullable();
            $table->string('item_type', 50)->nullable();
            $table->integer('price')->nullable();
            $table->text('item_data')->nullable();
            $table->timestamp('created_at')->useCurrent();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('shop_items');
    }
};
