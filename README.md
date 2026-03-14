# Kids Learning Game

Dự án web game học tập toán cho bé, có đăng nhập, hệ thống XP/coin/lives, mở khóa game, huy hiệu, cửa hàng và các game JS nhẹ.

## Tóm tắt
- Frontend: React + Vite + Tailwind
- Backend: Laravel API + JWT
- Game: JS thuần đặt trong `public/games/<game-name>/game.js`
- File config cho gamification: `config/gamification.php`

## Cấu trúc chính
```
resources/
  js/              # React app
  css/             # Tailwind
public/
  games/           # Game JS độc lập
config/
  gamification.php # config XP/coin/unlock
```


yarn install
yarn build
yarn dev
```

## Tài liệu chi tiết
Xem `docs/PROJECT_OVERVIEW.md` để hiểu toàn bộ luồng và logic.
