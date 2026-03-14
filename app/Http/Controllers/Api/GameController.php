<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\GamificationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GameController extends Controller
{
    public function submitScore(Request $request, GamificationService $gamification): JsonResponse
    {
        $data = $request->validate([
            'game_key' => ['required', 'string', 'max:50'],
            'score' => ['required', 'numeric'],
        ]);

        $user = $request->user('api');
        $gameKey = $data['game_key'];
        $score = (float) $data['score'];

        $rewards = $gamification->calculateRewards($gameKey, $score);

        DB::table('game_scores')->insert([
            'user_id' => $user->id,
            'game_name' => $gameKey,
            'score' => (int) $score,
            'coin_reward' => $rewards['coin'],
            'xp_reward' => $rewards['xp'],
        ]);

        $user->xp = ($user->xp ?? 0) + $rewards['xp'];
        $user->coin = ($user->coin ?? 0) + $rewards['coin'];
        $user->save();

        $stats = $this->buildStats($user->id, $user);
        $unlocks = $gamification->resolveUnlocks($stats);

        return response()->json([
            'message' => 'Ghi điểm thành công.',
            'rewards' => $rewards,
            'totals' => [
                'xp' => $user->xp,
                'coin' => $user->coin,
                'lives' => $user->lives,
                'streak' => $user->streak,
            ],
            'stats' => $stats,
            'unlocks' => $unlocks,
        ]);
    }

    public function submitMath(Request $request, GamificationService $gamification): JsonResponse
    {
        $data = $request->validate([
            'correct' => ['required', 'integer', 'min:0'],
            'wrong' => ['required', 'integer', 'min:0'],
            'lesson_bonus_coin' => ['nullable', 'integer', 'min:0'],
        ]);

        $user = $request->user('api');
        $correct = (int) $data['correct'];
        $wrong = (int) $data['wrong'];
        $total = $correct + $wrong;

        $this->ensureProgress($user->id);

        if ($total > 0) {
            DB::table('user_progress')
                ->where('user_id', $user->id)
                ->update([
                    'solved_questions' => DB::raw('solved_questions + ' . $total),
                    'correct_questions' => DB::raw('correct_questions + ' . $correct),
                ]);
        }

        $rewards = $gamification->calculateMathRewards($correct, $wrong, $data['lesson_bonus_coin'] ?? null);

        $user->xp = ($user->xp ?? 0) + $rewards['xp'];
        $user->coin = ($user->coin ?? 0) + $rewards['coin'];
        $user->lives = max(0, ($user->lives ?? 0) + $rewards['life_delta']);

        if ($wrong > 0) {
            $user->streak = 0;
        } else {
            $user->streak = ($user->streak ?? 0) + $correct;
        }

        $user->save();

        $stats = $this->buildStats($user->id, $user);
        $unlocks = $gamification->resolveUnlocks($stats);

        return response()->json([
            'message' => 'Cập nhật bài tập thành công.',
            'rewards' => [
                'xp' => $rewards['xp'],
                'coin' => $rewards['coin'],
                'life_delta' => $rewards['life_delta'],
            ],
            'totals' => [
                'xp' => $user->xp,
                'coin' => $user->coin,
                'lives' => $user->lives,
                'streak' => $user->streak,
            ],
            'stats' => $stats,
            'unlocks' => $unlocks,
        ]);
    }

    public function unlocks(Request $request, GamificationService $gamification): JsonResponse
    {
        $user = $request->user('api');
        $stats = $this->buildStats($user->id, $user);

        return response()->json([
            'stats' => $stats,
            'unlocks' => $gamification->resolveUnlocks($stats),
        ]);
    }

    private function ensureProgress(int $userId): void
    {
        $exists = DB::table('user_progress')->where('user_id', $userId)->exists();
        if (!$exists) {
            DB::table('user_progress')->insert([
                'user_id' => $userId,
                'map_level' => 1,
                'solved_questions' => 0,
                'correct_questions' => 0,
                'wrong_questions' => null,
            ]);
        }
    }

    private function buildStats(int $userId, $user): array
    {
        $this->ensureProgress($userId);
        $progress = DB::table('user_progress')->where('user_id', $userId)->first();

        return [
            'level' => $user->level ?? 1,
            'xp' => $user->xp ?? 0,
            'streak' => $user->streak ?? 0,
            'correct_answers' => $progress->correct_questions ?? 0,
            'solved_questions' => $progress->solved_questions ?? 0,
        ];
    }
}
