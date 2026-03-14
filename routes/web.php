<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect('/login');
});

Route::get('/login', function () {
    return response()->file(public_path('login.html'));
});

Route::get('/dashboard', function () {
    return response()->file(public_path('pages/dashboard/index.html'));
});
