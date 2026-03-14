<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request): JsonResponse
    {
        $credentials = $request->validate([
            'username' => ['required', 'string', 'max:50'],
            'password' => ['required', 'string', 'min:4'],
        ]);

        $user = User::where('username', $credentials['username'])->first();

        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            return response()->json([
                'message' => 'Sai tài khoản hoặc mật khẩu.',
            ], 401);
        }

        return response()->json([
            'message' => 'Đăng nhập thành công.',
            'user' => [
                'id' => $user->id,
                'username' => $user->username,
                'xp' => $user->xp,
                'coin' => $user->coin,
                'level' => $user->level,
                'lives' => $user->lives,
                'streak' => $user->streak,
                'character_skin_id' => $user->character_skin_id,
            ],
        ]);
    }
}
