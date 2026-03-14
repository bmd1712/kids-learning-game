<?php

namespace App\Services;

use Illuminate\Support\Arr;

class GamificationService
{
    public function calculateRewards(string $gameKey, float $score): array
    {
        $config = config('gamification.game_scores.' . $gameKey);
        if (!$config) {
            return ['xp' => 0, 'coin' => 0];
        }

        $minScore = Arr::get($config, 'min_score', 0);
        $maxScore = Arr::get($config, 'max_score');
        $xpMultiplier = Arr::get($config, 'xp_multiplier', 0);
        $coinMultiplier = Arr::get($config, 'coin_multiplier', 0);

        $safeScore = max($minScore, $score);
        $cappedScore = $maxScore !== null ? min($safeScore, $maxScore) : $safeScore;

        return [
            'xp' => (int) round($cappedScore * $xpMultiplier),
            'coin' => (int) round($cappedScore * $coinMultiplier),
        ];
    }

    public function calculateMathRewards(int $correct, int $wrong, ?int $lessonBonusCoin = null): array
    {
        $config = config('gamification.math_rewards', []);
        $correctXp = Arr::get($config, 'correct_xp', 0);
        $correctCoin = Arr::get($config, 'correct_coin', 0);
        $wrongLife = Arr::get($config, 'wrong_life', 0);
        $defaultBonus = Arr::get($config, 'lesson_bonus_coin', 0);
        $lifeRecoverCorrect = (int) Arr::get($config, 'life_recover_correct', 0);
        $lifeRecoverAmount = (int) Arr::get($config, 'life_recover_amount', 0);

        $xp = $correct * $correctXp;
        $coin = $correct * $correctCoin + ($lessonBonusCoin ?? $defaultBonus);
        $lifeLoss = $wrong * $wrongLife;
        $lifeGain = $lifeRecoverCorrect > 0
            ? (int) floor($correct / $lifeRecoverCorrect) * $lifeRecoverAmount
            : 0;

        return [
            'xp' => $xp,
            'coin' => $coin,
            'life_delta' => $lifeGain - $lifeLoss,
        ];
    }

    public function resolveUnlocks(array $stats): array
    {
        $rules = config('gamification.unlock_rules', []);

        return [
            'games' => $this->resolveGroup(Arr::get($rules, 'games', []), $stats),
            'badges' => $this->resolveGroup(Arr::get($rules, 'badges', []), $stats),
            'characters' => $this->resolveGroup(Arr::get($rules, 'characters', []), $stats),
        ];
    }

    private function resolveGroup(array $groupRules, array $stats): array
    {
        $result = [];
        foreach ($groupRules as $key => $rule) {
            $result[$key] = $this->isUnlocked($rule, $stats);
        }
        return $result;
    }

    private function isUnlocked(array $rule, array $stats): bool
    {
        $requiredLevel = Arr::get($rule, 'required_level', 0);
        $requiredCorrect = Arr::get($rule, 'required_correct_answers', 0);
        $requiredXp = Arr::get($rule, 'required_xp', 0);
        $requiredStreak = Arr::get($rule, 'required_streak', 0);

        return ($stats['level'] ?? 0) >= $requiredLevel
            && ($stats['correct_answers'] ?? 0) >= $requiredCorrect
            && ($stats['xp'] ?? 0) >= $requiredXp
            && ($stats['streak'] ?? 0) >= $requiredStreak;
    }
}
