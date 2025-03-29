'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 模拟注册成功
      const mockUser = {
        id: '123',
        name: name,
        email: email,
        avatar: null
      };

      // 存储用户会话
      localStorage.setItem('userSession', JSON.stringify(mockUser));

      // 注册成功后重定向到仪表盘
      router.push('/dashboard');
    } catch (err) {
      setError('注册失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-black">
      <div className="max-w-md mx-auto px-4 py-20">
        <div className="bg-zinc-900 p-8 rounded-lg">
          <h1 className="text-2xl font-bold text-white mb-6">创建新账户</h1>

          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 rounded p-3 mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSignUp}>
            <div className="mb-4">
              <label className="block text-zinc-400 mb-1 text-sm">姓名</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-zinc-400 mb-1 text-sm">邮箱</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-zinc-400 mb-1 text-sm">密码</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded font-medium"
            >
              {loading ? '注册中...' : '创建账户'}
            </button>
          </form>

          <div className="mt-4 text-center text-zinc-400 text-sm">
            已有账户？{' '}
            <Link href="/signin" className="text-pink-500 hover:text-pink-400">
              登录
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
