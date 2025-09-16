'use client'

import {useState} from "react";

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: any) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setSubmitted(true);
        setFormData({name: '', email: '', message: ''});
    };

    return (
        <section className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Gửi Tin Nhắn Cho Chúng Tôi
            </h2>
            {submitted && (
                <p className="text-green-600 mb-4">
                    Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.
                </p>
            )}
            <div
                className="space-y-6"
                onSubmit={handleSubmit}
            >
                <div>
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Họ và Tên
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                        placeholder="Nhập họ và tên của bạn"
                    />
                </div>
                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                        placeholder="Nhập email của bạn"
                    />
                </div>
                <div>
                    <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Tin Nhắn
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                        placeholder="Mô tả vấn đề hoặc câu hỏi của bạn (ví dụ: tìm thú cưng thất lạc, đăng bài tìm chủ nhân...)"
                    ></textarea>
                </div>
                <button
                    type="submit"
                    onClick={handleSubmit}
                    className="w-full bg-orange-500 text-white py-3 rounded-md hover:bg-orange-600 transition-colors"
                >
                    Gửi Tin Nhắn
                </button>
            </div>
        </section>
    );
}