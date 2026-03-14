<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('user_progress', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id');
            $table->integer('map_level')->nullable();
            $table->integer('solved_questions')->default(0);
            $table->integer('correct_questions')->default(0);
            $table->text('wrong_questions')->nullable();
            $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();
            $table->index('user_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('user_progress');
    }
};
