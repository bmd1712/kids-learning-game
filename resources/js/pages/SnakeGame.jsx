import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function SnakeGamePage() {
    const [status, setStatus] = useState('Đang tải game...');

    useEffect(() => {
        let isMounted = true;
        const scriptId = 'snake-game-script';
        const existing = document.getElementById(scriptId);

        const load = () => {
            if (window.initSnakeGame) {
                window.initSnakeGame('game-root');
                if (isMounted) {
                    setStatus('');
                }
            }
        };

        if (existing) {
            load();
            return () => {
                isMounted = false;
                if (window.destroySnakeGame) {
                    window.destroySnakeGame('game-root');
                }
            };
        }

        const script = document.createElement('script');
        script.id = scriptId;
        script.src = '/games/snake/game.js';
        script.async = true;
        script.onload = load;
        script.onerror = () => {
            if (isMounted) {
                setStatus('Không thể tải game.');
            }
        };
        document.body.appendChild(script);

        return () => {
            isMounted = false;
            if (window.destroySnakeGame) {
                window.destroySnakeGame('game-root');
            }
        };
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800">
            <div className="max-w-5xl mx-auto p-6 space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-extrabold">Snake</h1>
                        <p className="text-slate-600">Chơi game và tích điểm.</p>
                    </div>
                    <Link className="text-primary font-semibold hover:underline" to="/">
                        Về trang chủ
                    </Link>
                </div>

                <div className="rounded-3xl bg-white shadow-xl border border-slate-100 p-6">
                    {status && (
                        <div className="text-slate-500 font-semibold mb-4">{status}</div>
                    )}
                    <div id="game-root" className="w-full"></div>
                </div>
            </div>
        </div>
    );
}
