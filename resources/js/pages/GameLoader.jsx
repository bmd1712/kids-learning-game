import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { GAME_CONFIGS } from '../lib/games.js';

export default function GameLoaderPage() {
    const { slug } = useParams();
    const game = GAME_CONFIGS.find((item) => item.key === slug);
    const [status, setStatus] = useState('Đang tải game...');

    useEffect(() => {
        if (!game) {
            return;
        }

        let isMounted = true;
        const scriptId = `game-script-${game.key}`;
        const existing = document.getElementById(scriptId);

        const load = () => {
            if (window.initSnakeGame || window.initGame) {
                const initFn = window.initGame || window.initSnakeGame;
                if (typeof initFn === 'function') {
                    initFn('game-root');
                    if (isMounted) {
                        setStatus('');
                    }
                }
            }
        };

        if (existing) {
            load();
            return () => {
                isMounted = false;
                if (window.destroyGame) {
                    window.destroyGame('game-root');
                } else if (window.destroySnakeGame) {
                    window.destroySnakeGame('game-root');
                }
            };
        }

        const script = document.createElement('script');
        script.id = scriptId;
        script.src = game.script;
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
            if (window.destroyGame) {
                window.destroyGame('game-root');
            } else if (window.destroySnakeGame) {
                window.destroySnakeGame('game-root');
            }
        };
    }, [game]);

    if (!game) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-800">
                <div className="text-center">
                    <h1 className="text-2xl font-bold">Không tìm thấy game</h1>
                    <Link className="text-primary font-semibold hover:underline" to="/">
                        Về trang chủ
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800">
            <div className="max-w-5xl mx-auto p-6 space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-extrabold">{game.name}</h1>
                        <p className="text-slate-600">{game.description}</p>
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
