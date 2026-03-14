import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
        }
    }, []);

    const toggleTheme = () => {
        document.documentElement.classList.toggle('dark');
        const isDark = document.documentElement.classList.contains('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setStatus('');

        if (!username.trim() || !password) {
            setError('Vui lòng nhập tài khoản và mật khẩu.');
            return;
        }

        setLoading(true);
        const result = await login({ username: username.trim(), password, remember });
        setLoading(false);

        if (!result.ok) {
            setError(result.message);
            return;
        }

        setStatus(result.message);
        navigate('/', { replace: true });
    };

    return (
        <div className="bg-background-light dark:bg-background-dark font-display min-h-screen flex items-center justify-center p-4 overflow-hidden relative">
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <div className="absolute top-10 left-10 text-primary/40 text-6xl font-bold math-float" style={{ animationDelay: '0s' }}>+</div>
                <div className="absolute top-20 right-20 text-primary/30 text-8xl font-bold math-float" style={{ animationDelay: '1s' }}>-</div>
                <div className="absolute bottom-20 left-1/4 text-primary/40 text-7xl font-bold math-float" style={{ animationDelay: '2s' }}>×</div>
                <div className="absolute bottom-10 right-1/4 text-primary/30 text-9xl font-bold math-float" style={{ animationDelay: '3s' }}>=</div>
                <div className="absolute top-1/2 left-10 text-primary/20 text-5xl font-bold math-float" style={{ animationDelay: '4s' }}>÷</div>
            </div>
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-5%] w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>
                <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 rounded-full bg-primary/10 blur-3xl"></div>
            </div>

            <main className="relative z-10 w-full max-w-lg">
                <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl shadow-primary/10 overflow-hidden border-4 border-primary/10">
                    <div className="relative h-56 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ec5b13_1px,transparent_1px)] [background-size:20px_20px]"></div>
                        <div className="relative z-10 text-center px-6">
                            <div className="flex justify-center mb-4">
                                <div className="bg-white dark:bg-slate-800 p-4 rounded-full shadow-lg border-2 border-primary">
                                    <span className="material-symbols-outlined text-primary text-6xl" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
                                </div>
                            </div>
                            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 mb-1">Học Toán Cùng Bé!</h1>
                            <p className="text-slate-600 dark:text-slate-400 font-medium">Chào mừng bé đến với thế giới con số</p>
                        </div>
                        <div className="absolute -bottom-2 -left-2 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
                        <div className="absolute -top-4 -right-4 w-32 h-32 bg-primary/20 blur-2xl"></div>
                    </div>

                    <div className="p-8 md:p-12">
                        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-bold text-lg" htmlFor="username">
                                        <span className="material-symbols-outlined text-primary">person</span>
                                        Tài khoản
                                    </label>
                                    <div className="relative group">
                                        <input
                                            id="username"
                                            name="username"
                                            type="text"
                                            autoComplete="username"
                                            required
                                            value={username}
                                            onChange={(event) => setUsername(event.target.value)}
                                            className="w-full h-16 px-6 bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl text-xl font-medium focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-slate-400 dark:text-white"
                                            placeholder="Nhập tài khoản..."
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-bold text-lg" htmlFor="password">
                                        <span className="material-symbols-outlined text-primary">lock</span>
                                        Mật khẩu
                                    </label>
                                    <div className="relative group">
                                        <input
                                            id="password"
                                            name="password"
                                            type={showPassword ? 'text' : 'password'}
                                            autoComplete="current-password"
                                            required
                                            minLength={4}
                                            value={password}
                                            onChange={(event) => setPassword(event.target.value)}
                                            className="w-full h-16 px-6 pr-16 bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl text-xl font-medium focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-slate-400 dark:text-white"
                                            placeholder="Nhập mật khẩu..."
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword((prev) => !prev)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition"
                                            aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                                        >
                                            <span className="material-symbols-outlined">{showPassword ? 'visibility_off' : 'visibility'}</span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <label className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-300">
                                    <input
                                        type="checkbox"
                                        checked={remember}
                                        onChange={(event) => setRemember(event.target.checked)}
                                        className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
                                    />
                                    Ghi nhớ đăng nhập
                                </label>
                                <button type="button" className="text-primary font-semibold hover:underline">
                                    Quên mật khẩu?
                                </button>
                            </div>

                            {error && (
                                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-red-700 text-sm font-semibold" role="alert">
                                    {error}
                                </div>
                            )}
                            {status && (
                                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-700 text-sm font-semibold" role="status">
                                    {status}
                                </div>
                            )}

                            <button
                                id="login-submit"
                                type="submit"
                                disabled={loading}
                                className="w-full bg-primary hover:bg-primary/90 text-white font-extrabold text-2xl py-5 rounded-2xl shadow-xl shadow-primary/30 active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-70"
                            >
                                <span>{loading ? 'Đang đăng nhập...' : 'Bắt đầu học thôi!'}</span>
                                {loading && (
                                    <span className="h-6 w-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                )}
                                <span className="material-symbols-outlined text-3xl">rocket_launch</span>
                            </button>

                            <div className="flex items-center justify-center gap-6 pt-4">
                                <div className="flex flex-col items-center gap-1 group cursor-pointer">
                                    <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                        <span className="material-symbols-outlined">settings</span>
                                    </div>
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Cài đặt</span>
                                </div>
                                <div className="flex flex-col items-center gap-1 group cursor-pointer">
                                    <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                        <span className="material-symbols-outlined">help</span>
                                    </div>
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Hướng dẫn</span>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-800/50 py-4 px-8 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                            <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">1,234 bạn đang học</span>
                        </div>
                        <div className="flex gap-1">
                            <span className="material-symbols-outlined text-yellow-500" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                            <span className="material-symbols-outlined text-yellow-500" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                            <span className="material-symbols-outlined text-yellow-500" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex justify-center gap-4">
                    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur px-6 py-3 rounded-full shadow-sm flex items-center gap-3 border border-primary/5">
                        <img
                            alt="Cute owl icon"
                            className="w-8 h-8 rounded-full"
                            data-alt="Cartoon smart owl mascot head icon"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfMTP6GFM-yQBDOf2okZ4-YKKYoT5FQapLdTKMuHGZ-Pds65DyXJMuFT4txFaHLZrI9fXT0ZtoMN1RSc218SgH63Rxrysgf-HVCIdfq0gjtCJx4pq0mY4vYyuTgDOgMza5qf3kXTYWzHM-0m9Os_EZYoY-5jD71-wT0RQKCXWOMdEbj1a1XccqOB77cFbxwNaLcDzBMNLCbszifRS75VOyHWGZ4XBE4PZhLBg6NosYCo6Pmv4aisO6NKmp_TNT8UsnJmidHa6z4ig"
                        />
                        <p className="text-slate-600 dark:text-slate-300 font-bold text-sm">Học toán vui mỗi ngày!</p>
                    </div>
                </div>
            </main>

            <div className="fixed bottom-4 right-4 flex flex-col gap-2">
                <button
                    onClick={toggleTheme}
                    className="p-3 bg-white dark:bg-slate-900 rounded-full shadow-lg text-slate-600 dark:text-slate-400 hover:text-primary transition-colors"
                    type="button"
                >
                    <span className="material-symbols-outlined">dark_mode</span>
                </button>
            </div>
        </div>
    );
}
