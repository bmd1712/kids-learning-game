<?php

return [
    'game_scores' => [
        'snake' => [
            'xp_multiplier' => 1,
            'coin_multiplier' => 0.2,
            'min_score' => 0,
            'max_score' => null,
        ],
        'flappy' => [
            'xp_multiplier' => 2,
            'coin_multiplier' => 0.1,
            'min_score' => 0,
            'max_score' => null,
        ],
        'pong' => [
            'xp_multiplier' => 1.5,
            'coin_multiplier' => 0.15,
            'min_score' => 0,
            'max_score' => null,
        ],
    ],
    'math_rewards' => [
        'correct_xp' => 10,
        'correct_coin' => 2,
        'wrong_life' => 1,
        'lesson_bonus_coin' => 10,
        'life_recover_correct' => 5,
        'life_recover_amount' => 1,
    ],
    'unlock_rules' => [
        'games' => [
            'snake' => [
                'required_level' => 2,
                'required_correct_answers' => 50,
                'required_xp' => 200,
            ],
            'flappy' => [
                'required_level' => 3,
                'required_correct_answers' => 80,
                'required_xp' => 350,
            ],
            'pong' => [
                'required_level' => 4,
                'required_correct_answers' => 120,
                'required_xp' => 500,
            ],
        ],
        'badges' => [
            'newbie' => [
                'required_correct_answers' => 10,
            ],
            'super_math' => [
                'required_correct_answers' => 100,
            ],
            'fire_streak' => [
                'required_streak' => 10,
            ],
        ],
        'characters' => [
            'cat' => [
                'required_correct_answers' => 30,
                'required_xp' => 150,
            ],
            'panda' => [
                'required_correct_answers' => 60,
                'required_xp' => 300,
            ],
            'fox' => [
                'required_correct_answers' => 90,
                'required_xp' => 450,
            ],
        ],
    ],
];
