(() => {
    const form = document.getElementById('login-form');
    if (!form) {
        return;
    }

    const errorBox = document.getElementById('login-error');
    const statusBox = document.getElementById('login-status');
    const submitButton = document.getElementById('login-submit');
    const submitText = document.getElementById('login-submit-text');
    const loadingSpinner = document.getElementById('login-loading');
    const themeToggle = document.getElementById('theme-toggle');

    const setLoading = (isLoading) => {
        if (!submitButton || !submitText || !loadingSpinner) {
            return;
        }
        submitButton.disabled = isLoading;
        submitButton.classList.toggle('opacity-70', isLoading);
        loadingSpinner.classList.toggle('hidden', !isLoading);
        submitText.textContent = isLoading ? 'Đang đăng nhập...' : 'Bắt đầu học thôi!';
    };

    const showError = (message) => {
        if (!errorBox) {
            return;
        }
        errorBox.textContent = message;
        errorBox.classList.remove('hidden');
    };

    const hideError = () => {
        if (!errorBox) {
            return;
        }
        errorBox.classList.add('hidden');
        errorBox.textContent = '';
    };

    const showStatus = (message) => {
        if (!statusBox) {
            return;
        }
        statusBox.textContent = message;
        statusBox.classList.remove('hidden');
    };

    const hideStatus = () => {
        if (!statusBox) {
            return;
        }
        statusBox.classList.add('hidden');
        statusBox.textContent = '';
    };

    const initTheme = () => {
        if (!themeToggle) {
            return;
        }
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
        }

        themeToggle.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
            const isDark = document.documentElement.classList.contains('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    };

    initTheme();

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        hideError();
        hideStatus();

        const username = form.querySelector('#username')?.value?.trim();
        const password = form.querySelector('#password')?.value ?? '';

        if (!username || !password) {
            showError('Vui lòng nhập tài khoản và mật khẩu.');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });

            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                showError(data.message || 'Đăng nhập thất bại. Vui lòng thử lại.');
                return;
            }

            if (data.user) {
                localStorage.setItem('kidz_user', JSON.stringify(data.user));
            }

            showStatus(data.message || 'Đăng nhập thành công.');
            window.location.href = '/dashboard';
        } catch (error) {
            showError('Không thể kết nối máy chủ. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    });
})();

