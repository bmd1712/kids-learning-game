import React from 'react';
import { useAuth } from '../context/AuthContext.jsx';

export default function HomePage() {
    const { user, logout } = useAuth();

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800">
            <main className="max-w-4xl mx-auto p-8">
                <div className="rounded-3xl bg-white shadow-xl border border-slate-100 p-8 space-y-4">
                    <h1 className="text-3xl font-extrabold">Trang chủ (tạm)</h1>
                    <p className="text-slate-600">Đây là trang home sau khi đăng nhập. Bạn có thể thay bằng dashboard thật sau.</p>
                    {user?.username && (
                        <div className="text-slate-700 font-semibold">Xin chào, {user.username}!</div>
                    )}
                    <button
                        onClick={logout}
                        className="px-4 py-2 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600"
                    >
                        Đăng xuất
                    </button>
                </div>
            </main>
        </div>
    );
}
