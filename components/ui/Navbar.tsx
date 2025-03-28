'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Logo from '@/components/icons/Logo';
import { useState, useEffect } from 'react';
import Image from 'next/image';

// 简化的用户类型
type SimpleUser = {
  email?: string;
  avatarUrl?: string;
  name?: string;
};

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<SimpleUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);

  // 检查用户登录状态
  useEffect(() => {
    const checkUserSession = async () => {
      try {
        // 从服务器获取用户状态
        const response = await fetch('/api/user');
        if (response.ok) {
          const userData = await response.json();
          if (userData.user) {
            setUser({
              email: userData.user.email,
              name:
                userData.user.name ||
                userData.user.email?.split('@')[0] ||
                '用户',
              avatarUrl: userData.user.avatar_url
            });
          } else {
            setUser(null);
          }
        } else {
          // 备用方案：检查本地存储
          const storedUser = localStorage.getItem('userSession');
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          }
        }
      } catch (e) {
        console.error('获取用户状态失败', e);
        // 仍然尝试从本地获取
        const storedUser = localStorage.getItem('userSession');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      }
      setLoading(false);
    };

    checkUserSession();

    // 添加路由变化监听以更新用户状态
    const handleRouteChange = () => {
      checkUserSession();
    };

    window.addEventListener('focus', handleRouteChange);
    return () => {
      window.removeEventListener('focus', handleRouteChange);
    };
  }, [pathname]);

  // 控制导航栏滚动显示/隐藏
  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 10) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlNavbar);
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  // 处理登出
  const handleSignOut = async () => {
    try {
      await fetch('/api/auth/signout', {
        method: 'POST'
      });
    } catch (e) {
      console.error('登出失败', e);
    }

    // 备用登出方案
    localStorage.removeItem('userSession');
    setUser(null);
    setShowDropdown(false);
    router.push('/');
  };

  // 切换下拉菜单显示状态
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 border-b border-zinc-800 bg-black transition-transform duration-300 ${
        visible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Logo className="h-8 w-8 mr-2" />
              <span className="text-white font-semibold text-lg">
                联盟营销平台
              </span>
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-center space-x-4">
                <Link
                  href="/"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === '/'
                      ? 'text-white bg-zinc-800'
                      : 'text-zinc-300 hover:text-white hover:bg-zinc-800'
                  }`}
                >
                  首页
                </Link>
                <Link
                  href="/discover"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === '/discover'
                      ? 'text-white bg-zinc-800'
                      : 'text-zinc-300 hover:text-white hover:bg-zinc-800'
                  }`}
                >
                  发现项目
                </Link>
                <Link
                  href="/tools"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === '/tools'
                      ? 'text-white bg-zinc-800'
                      : 'text-zinc-300 hover:text-white hover:bg-zinc-800'
                  }`}
                >
                  推广工具
                </Link>
                <Link
                  href="/learn"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === '/learn'
                      ? 'text-white bg-zinc-800'
                      : 'text-zinc-300 hover:text-white hover:bg-zinc-800'
                  }`}
                >
                  学习资源
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center ml-4 md:ml-6">
              {!loading && (
                <>
                  {user ? (
                    <div className="relative">
                      <button
                        onClick={toggleDropdown}
                        className="flex items-center"
                      >
                        <div className="h-8 w-8 rounded-full bg-zinc-700 flex items-center justify-center text-white border border-zinc-600 hover:border-pink-500">
                          {user.avatarUrl ? (
                            <Image
                              src={user.avatarUrl}
                              alt="用户头像"
                              width={32}
                              height={32}
                              className="rounded-full"
                            />
                          ) : (
                            <span>
                              {user.email?.charAt(0).toUpperCase() || '用户'}
                            </span>
                          )}
                        </div>
                      </button>

                      {showDropdown && (
                        <div className="absolute right-0 mt-2 w-48 bg-zinc-900 rounded-md shadow-lg py-1 border border-zinc-700">
                          <Link
                            href="/dashboard"
                            className="block px-4 py-2 text-sm text-white hover:bg-zinc-800"
                            onClick={() => setShowDropdown(false)}
                          >
                            我的仪表盘
                          </Link>
                          <Link
                            href="/profile"
                            className="block px-4 py-2 text-sm text-white hover:bg-zinc-800"
                            onClick={() => setShowDropdown(false)}
                          >
                            个人资料
                          </Link>
                          <Link
                            href="/settings"
                            className="block px-4 py-2 text-sm text-white hover:bg-zinc-800"
                            onClick={() => setShowDropdown(false)}
                          >
                            设置
                          </Link>
                          <button
                            onClick={handleSignOut}
                            className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-zinc-800 border-t border-zinc-700"
                          >
                            退出登录
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <>
                      <Link
                        href="/signin"
                        className="px-3 py-2 text-sm font-medium text-white bg-zinc-800 rounded-md hover:bg-zinc-700 mr-3"
                      >
                        登录
                      </Link>
                      <Link
                        href="/signin/signup"
                        className="px-3 py-2 text-sm font-medium text-white bg-pink-600 rounded-md hover:bg-pink-700"
                      >
                        注册
                      </Link>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
