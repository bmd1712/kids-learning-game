CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY /* ID người dùng */,

    username VARCHAR(50) NOT NULL UNIQUE /* Tên đăng nhập */,
    password VARCHAR(255) NOT NULL /* Mật khẩu đã hash */,

    xp INT DEFAULT 0 /* Tổng XP */,
    coin INT DEFAULT 0 /* Tiền coin */,

    level INT DEFAULT 1 /* Level hiện tại */,

    lives INT DEFAULT 3 /* Số mạng hiện tại */,

    streak INT DEFAULT 0 /* Chuỗi trả lời đúng */,

    character_skin_id INT DEFAULT 1 /* Nhân vật đang dùng */,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP /* Ngày tạo tài khoản */,

    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP /* Ngày cập nhật */
);

CREATE TABLE characters (

    id INT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(50),

    sprite VARCHAR(255), /* đường dẫn hình */

    rarity VARCHAR(20), /* common, rare, epic */
    
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE badges (
    id INT AUTO_INCREMENT PRIMARY KEY,

    badge_name VARCHAR(50) /* tên huy hiệu */,

    description VARCHAR(255) /* mô tả */,

    icon VARCHAR(255) /* icon huy hiệu */,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_badges (
    id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT /* ID người chơi */,

    badge_id INT /* ID huy hiệu */,

    unlocked_at DATETIME DEFAULT CURRENT_TIMESTAMP /* ngày nhận huy hiệu */,

    INDEX(user_id),

    UNIQUE(user_id, badge_id)
);

CREATE TABLE user_unlocked_games (
    id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT /* ID người chơi */,

    game_name VARCHAR(50) /* tên game: snake, flappy... */,

    unlocked_at DATETIME DEFAULT CURRENT_TIMESTAMP /* ngày mở khóa */,

    INDEX(user_id),

    UNIQUE(user_id, game_name)
);

CREATE TABLE question_logs (
    id INT AUTO_INCREMENT PRIMARY KEY /* ID log */,

    user_id INT /* ID người chơi */,

    question VARCHAR(255) /* Câu hỏi ví dụ: 3 + 5 */,

    correct_answer INT /* Đáp án đúng */,

    user_answer INT /* Đáp án người chơi */,

    is_correct TINYINT /* 1 đúng 0 sai */,

    level INT /* Level bài toán */,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP /* Thời gian làm bài */,

    INDEX(user_id)
);


CREATE TABLE game_scores (
    id INT AUTO_INCREMENT PRIMARY KEY /* ID */,

    user_id INT /* ID người chơi */,

    game_name VARCHAR(50) /* Tên game: snake, flappy... */,

    score INT /* Điểm đạt được */,

    coin_reward INT /* Coin thưởng */,

    xp_reward INT /* XP thưởng */,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP /* Ngày chơi */,

    INDEX(user_id)
);


CREATE TABLE daily_quests (
    id INT AUTO_INCREMENT PRIMARY KEY /* ID nhiệm vụ */,

    quest_date DATE /* Ngày nhiệm vụ */,

    quest_data TEXT /* Danh sách nhiệm vụ dạng JSON */,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP /* Ngày tạo */
);


CREATE TABLE user_progress (
    id INT AUTO_INCREMENT PRIMARY KEY /* ID */,

    user_id INT /* ID người chơi */,

    map_level INT /* Level map hiện tại */,

    solved_questions INT DEFAULT 0 /* Tổng câu đã giải */,

    correct_questions INT DEFAULT 0 /* Tổng câu đúng */,

    wrong_questions TEXT /* Danh sách câu sai để ôn tập */,

    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP /* Cập nhật lần cuối */,

    INDEX(user_id)
);


CREATE TABLE shop_items (
    id INT AUTO_INCREMENT PRIMARY KEY /* ID vật phẩm */,

    item_name VARCHAR(50) /* Tên item */,

    item_type VARCHAR(50) /* Loại: character, hat, glasses */,

    price INT /* Giá coin */,

    item_data TEXT /* Thông tin thêm dạng JSON */,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP /* Ngày tạo */
);


CREATE TABLE user_inventory (
    id INT AUTO_INCREMENT PRIMARY KEY /* ID */,

    user_id INT /* ID người chơi */,

    items TEXT NULL /* Danh sách item dạng JSON */,

    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP /* Ngày cập nhật */,

    INDEX(user_id)
);