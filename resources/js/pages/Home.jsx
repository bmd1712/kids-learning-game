import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function HomePage() {
    const { user, logout } = useAuth();

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800">
            <main className="max-w-4xl mx-auto p-8 space-y-6">
                <div className="rounded-3xl bg-white shadow-xl border border-slate-100 p-8 space-y-4">
                    <h1 className="text-3xl font-extrabold">Trang chủ</h1>
                    <p className="text-slate-600">Chọn game để bắt đầu.</p>
                    {user?.username && (
                        <div className="text-slate-700 font-semibold">Xin chào, {user.username}!</div>
                    )}
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <Link
                        to="/snake"
                        className="rounded-3xl bg-white border border-slate-100 p-6 shadow-lg hover:shadow-xl transition"
                    >
                        <h2 className="text-2xl font-bold">Snake</h2>
                        <p className="text-slate-600 mt-2">Rèn luyện phản xạ và tính điểm.</p>
                    </Link>
                </div>

                <button
                    onClick={logout}
                    className="px-4 py-2 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600"
                >
                    Đăng xuất
                </button>
            </main>
        </div>
    );
}
