<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('game_scores', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id');
            $table->string('game_name', 50)->nullable();
            $table->integer('score')->nullable();
            $table->integer('coin_reward')->nullable();
            $table->integer('xp_reward')->nullable();
            $table->timestamp('created_at')->useCurrent();
            $table->index('user_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('game_scores');
    }
};
