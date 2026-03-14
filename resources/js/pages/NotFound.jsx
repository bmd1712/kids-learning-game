import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-800">
            <h1 className="text-4xl font-extrabold mb-2">Không tìm thấy trang</h1>
            <p className="text-slate-600 mb-6">Đường dẫn bạn truy cập không tồn tại.</p>
            <Link className="px-4 py-2 rounded-xl bg-primary text-white font-semibold" to="/">
                Về trang chủ
            </Link>
        </div>
    );
}
