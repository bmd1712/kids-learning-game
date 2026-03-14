# Kids Learning Game — Tổng quan dự án

Tài liệu này mô tả **luồng chơi**, **logic game hóa**, **cấu trúc file**, và **kiến trúc hệ thống** để developer hoặc người dùng hiểu dự án nhanh.

## 1) Mục tiêu dự án
- Game học toán cho bé, vừa học vừa chơi.
- Đăng nhập trước khi chơi game.
- Học toán để kiếm mạng/lives, XP, coin và mở khóa game.
- Hệ thống gamification: XP, coin, streak, badge, daily quest, map level, shop.

## 2) Luồng chơi chính (Core Loop)
```
Học toán → nhận XP/coin → mở khóa game → chơi game → mất mạng → quay lại học
```

Chi tiết:
- Người chơi **phải làm bài toán** để kiếm mạng và mở khóa game.
- Khi chơi game, **sai hoặc thua** sẽ **mất mạng**.
- Hết mạng phải quay lại **học toán** để hồi mạng.

## 3) Hệ thống game hóa (Gamification)

### 3.1 XP (Kinh nghiệm)
- Đúng: +10 XP
- Sai: +0 XP

Ví dụ level:
- Level 1: 0 XP
- Level 2: 100 XP
- Level 3: 250 XP
- Level 4: 500 XP

### 3.2 Coin
- Đúng: +2 coin
- Hoàn thành bài: +10 coin
- Coin được thưởng chủ yếu từ **game toán**.

Dùng coin để:
- Mua nhân vật (character)
- Mua skin / trang bị
- Mua mạng (lives)

### 3.3 Streak (Chuỗi đúng)
- x1, x2, x3, x5
- Thưởng:
  - streak 5: +20 XP
  - streak 10: +50 XP

### 3.4 Lives (Mạng)
- Mặc định: ❤️❤️❤️
- Sai → mất mạng
- Hết mạng: làm 5 bài toán để hồi
- Không hồi theo thời gian; **qua ngày sẽ reset**

### 3.5 Unlock game
Game mở khóa theo **cả 2 điều kiện**:
- Lên **level** đủ yêu cầu
- Làm **đủ số bài/câu toán** theo yêu cầu

### 3.6 Badge (Huy hiệu)
- 🏅 Người mới: làm đúng 10 câu
- 🏅 Siêu toán: làm đúng 100 câu
- 🏅 Chuỗi lửa: streak 10

### 3.7 Daily Quest
Ví dụ:
- Giải 10 bài toán → thưởng 20 coin
- Chơi 3 game → thưởng 10 coin

### 3.8 Map Level
- Level 1: cộng
- Level 2: trừ
- Level 3: bảng nhân
- Level 4: số lớn

Hiển thị dạng bản đồ (map game).

## 4) Danh sách game

### 4.1 Game làm toán (Math Games)
1. Điền số còn thiếu
2. Chọn đáp án đúng
3. Đúng / Sai
4. Bảng nhân nhanh
5. So sánh số
6. Điền dãy số
7. Đếm đồ vật
8. Ghép phép tính
9. Tìm phép tính tạo ra số
10. Bài toán chữ
11. Sắp xếp số

### 4.2 Game toán + hành động
1. Đua xe trả lời nhanh
2. Bắn thiên thạch số (Math Shooter)
3. Bắn súng số
4. Bắn bong bóng toán
5. Flappy Bird toán
6. Đập chuột toán (Whack a mole)
7. Game nhảy platform

### 4.3 Game giải trí thuần (không toán)
1. Snake
2. Flappy bird
3. Pong
4. Breakout
5. Dino jump
6. Whack a mole
7. Memory card
8. Tic tac toe
9. Reaction speed game
10. Maze game

## 5) Nhân vật (Character)
- Dùng ảnh: `cat.png`, `panda.png`, `fox.png`, `frog.png`...
- Có thể mở khóa hoặc mua bằng coin.

## 6) Shop
- Trong cửa hàng có thể dùng coin để mua:
  - Trang bị
  - Quần áo
  - Mạng (lives)

## 7) Stack kỹ thuật
- Backend: Laravel API
- Frontend: React + Vite + Tailwind
- Game: JS thuần đặt trong `public/games` để nhẹ

## 8) Kiến trúc auth + route
- Login bắt buộc trước khi vào game.
- JWT token lưu **mặc định ở `localStorage`**.
- Route React:
  - `/login` public
  - `/` home (protected)
  - `/:slug` game (protected)

## 9) Tổ chức thư mục

### 9.1 Frontend (React)
```
resources/
  js/
    App.jsx
    main.jsx
    context/
      AuthContext.jsx
    pages/
      Login.jsx
      Home.jsx
      GameLoader.jsx
      NotFound.jsx
    lib/
      games.js
  css/
    app.css
```

### 9.2 Game JS độc lập
```
public/
  games/
    snake/
      game.js
```

### 9.3 Backend (Laravel)
```
app/
  Http/Controllers/Api/
    AuthController.php
routes/
  api.php
  web.php
config/
  jwt.php
  gamification.php
```

## 10) Dữ liệu & bảng (DB)
Các bảng quan trọng:
- `users` (username, password, xp, coin, level, lives, streak, character_skin_id)
- `question_logs` (log câu hỏi + đáp án)
- `game_scores` (điểm game + phần thưởng)
- `badges`, `user_badges`
- `shop_items`, `user_inventory`
- `user_progress`, `daily_quests`
- `user_unlocked_games`

## 11) Logic chấm điểm gợi ý
- Mỗi câu đúng: +10 XP, +2 coin
- Mỗi câu sai: -1 mạng
- Hoàn thành 1 bài: +10 coin
- 5 câu đúng liên tiếp: +20 XP
- 10 câu đúng liên tiếp: +50 XP

## 12) Config duy nhất (Backend)
Tất cả thông số game-score và unlock **chỉ chỉnh 1 chỗ**:
- `config/gamification.php`

Frontend **không giữ config riêng**, chỉ lấy dữ liệu từ API.

## 13) Config unlock (game / badge / character)
Sẽ có **file config** quy định:
- Số câu đúng cần để unlock game
- Mức XP cần để unlock game
- Điều kiện mở badge
- Điều kiện mở character

Các điều kiện sẽ được tính từ dữ liệu lưu trong DB (đúng câu, XP, streak...).

## 14) Cách thêm game mới
1. Thêm JS game vào:
   `public/games/<game-name>/game.js`
2. Thêm 1 dòng config trong:
   `resources/js/lib/games.js`
3. Link sẽ tự xuất hiện ở Home và route `/:slug` sẽ tự load game.

## 15) Thông tin đã chốt
- Unlock game: **cần đủ level + đủ số bài/câu toán**.
- Level chỉ để tạo hứng thú (không tăng độ khó bắt buộc).
- Lives: không hồi theo thời gian; qua ngày reset, hồi bằng làm bài.
- Điểm XP/coin/mất mạng sẽ theo **file config**.
- Token mặc định lưu `localStorage`.
- Game mở sẵn sẽ cấu hình trong DB (chưa chốt ở đây).

## 16) Kết nối config vào API/DB

### 16.1 Config backend (Laravel)
Các file cấu hình nằm ở backend để **API là nguồn sự thật**:
- `config/gamification.php`
  - `game_scores`: quy đổi score → XP/coin
  - `unlock_rules`: điều kiện mở game/badge/character

### 16.2 API endpoints
Tất cả endpoint dưới đây cần header:
```
Authorization: Bearer <token>
```

**POST /api/game/score**
- Dùng khi game kết thúc và trả điểm.
- Body:
```json
{
  "game_key": "snake",
  "score": 120
}
```
- Backend sẽ:
  - tính thưởng theo config (`config/gamification.php`)
  - lưu vào `game_scores`
  - cộng XP + coin vào `users`
  - trả về **unlocks** ngay (không cần gọi thêm)

Response mẫu:
```json
{
  "message": "Ghi điểm thành công.",
  "rewards": {"xp": 120, "coin": 24},
  "totals": {"xp": 540, "coin": 130, "lives": 3, "streak": 4},
  "stats": {"level": 2, "xp": 540, "streak": 4, "correct_answers": 55, "solved_questions": 80},
  "unlocks": {"games": {"snake": true}, "badges": {"newbie": true}, "characters": {"cat": true}}
}
```

**POST /api/math/complete**
- Dùng khi kết thúc một bài tập toán.
- Body:
```json
{
  "correct": 8,
  "wrong": 2,
  "lesson_bonus_coin": 10
}
```
- Backend sẽ:
  - cộng `user_progress.correct_questions` + `solved_questions`
  - tính XP/coin/lives theo `config/gamification.php`
  - trả về **unlocks** ngay

Response mẫu:
```json
{
  "message": "Cập nhật bài tập thành công.",
  "rewards": {"xp": 80, "coin": 26, "life_delta": 1},
  "totals": {"xp": 620, "coin": 156, "lives": 4, "streak": 8},
  "stats": {"level": 2, "xp": 620, "streak": 8, "correct_answers": 63, "solved_questions": 90},
  "unlocks": {"games": {"snake": true}, "badges": {"newbie": true}, "characters": {"cat": true}}
}
```

**GET /api/unlocks**
- Dùng khi cần refresh trạng thái unlock (không bắt buộc, vì `/api/game/score` và `/api/math/complete` đã trả về unlocks).

### 16.3 Mapping dữ liệu DB
- `game_scores` lưu lịch sử điểm game
- `users` lưu tổng XP/coin/level/streak
- `user_progress` lưu số câu đúng (để unlock)

### 16.4 Frontend gọi API như thế nào
- Khi game kết thúc: gọi `/api/game/score` (response đã có `unlocks`)
- Khi hoàn thành bài tập toán: gọi `/api/math/complete` (response đã có `unlocks`)
- `/api/unlocks` chỉ dùng khi cần refresh lại trạng thái

### 16.5 Lưu ý
- Token JWT vẫn lưu ở `localStorage`
- Config unlock sẽ do bạn chỉnh trong `config/gamification.php`


