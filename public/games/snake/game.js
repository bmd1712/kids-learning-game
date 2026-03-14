(function () {
    function initSnakeGame(rootId) {
        var root = document.getElementById(rootId);
        if (!root) {
            return;
        }

        root.innerHTML = '';
        var canvas = document.createElement('canvas');
        canvas.width = 720;
        canvas.height = 420;
        canvas.style.borderRadius = '16px';
        canvas.style.background = '#0f172a';
        canvas.style.display = 'block';
        canvas.style.margin = '0 auto';
        root.appendChild(canvas);

        var ctx = canvas.getContext('2d');
        ctx.fillStyle = '#f8fafc';
        ctx.font = '600 20px Public Sans, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Snake game placeholder', canvas.width / 2, canvas.height / 2 - 8);
        ctx.fillStyle = '#94a3b8';
        ctx.font = '14px Public Sans, sans-serif';
        ctx.fillText('Replace /public/games/snake/game.js with real game code', canvas.width / 2, canvas.height / 2 + 18);
    }

    function destroySnakeGame(rootId) {
        var root = document.getElementById(rootId || 'game-root');
        if (root) {
            root.innerHTML = '';
        }
    }

    window.initSnakeGame = initSnakeGame;
    window.destroySnakeGame = destroySnakeGame;
})();
