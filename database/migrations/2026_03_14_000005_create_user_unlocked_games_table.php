<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('user_unlocked_games', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id');
            $table->string('game_name', 50);
            $table->timestamp('unlocked_at')->useCurrent();
            $table->index('user_id');
            $table->unique(['user_id', 'game_name']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('user_unlocked_games');
    }
};
