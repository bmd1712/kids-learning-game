<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('question_logs', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id');
            $table->string('question', 255)->nullable();
            $table->integer('correct_answer')->nullable();
            $table->integer('user_answer')->nullable();
            $table->tinyInteger('is_correct')->nullable();
            $table->integer('level')->nullable();
            $table->timestamp('created_at')->useCurrent();
            $table->index('user_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('question_logs');
    }
};
