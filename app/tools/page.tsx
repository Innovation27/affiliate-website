import { createClient } from '@/utils/supabase/server';
import { getUser } from '@/utils/supabase/queries';
import Link from 'next/link';

export default async function ToolsPage() {
  const supabase = createClient();
  const user = await getUser(supabase);

  const tools = [
    {
      id: 1,
      name: '链接生成器',
      description: '为任意产品或服务生成追踪链接',
      icon: '🔗',
      path: '/tools/link-generator'
    },
    {
      id: 2,
      name: '链接缩短器',
      description: '缩短长链接，使其更适合分享',
      icon: '✂️',
      path: '/tools/link-shortener'
    },
    {
      id: 3,
      name: '二维码生成器',
      description: '为您的联盟链接创建可扫描的二维码',
      icon: '📱',
      path: '/tools/qr-generator'
    },
    {
      id: 4,
      name: '社交分享工具',
      description: '一键分享到各大社交媒体平台',
      icon: '📢',
      path: '/tools/social-share'
    },
    {
      id: 5,
      name: '广告素材库',
      description: '访问数千个可用的广告素材',
      icon: '🖼️',
      path: '/tools/ad-materials'
    },
    {
      id: 6,
      name: '数据分析仪表盘',
      description: '追踪和分析您的联盟营销表现',
      icon: '📊',
      path: '/tools/analytics'
    }
  ];

  return (
    <section className="bg-black">
      <div className="max-w-6xl px-4 py-12 mx-auto">
        <h1 className="text-4xl font-extrabold text-white mb-6">推广工具集</h1>
        <p className="text-xl text-zinc-400 mb-10">
          使用我们强大的工具提升您的联盟营销效率
        </p>

        {/* 工具列表 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Link key={tool.id} href={user ? tool.path : '/signin'}>
              <div className="bg-zinc-900 rounded-lg overflow-hidden hover:bg-zinc-800 transition duration-300 h-full">
                <div className="p-6">
                  <div className="text-4xl mb-4">{tool.icon}</div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {tool.name}
                  </h3>
                  <p className="text-zinc-400">{tool.description}</p>
                  <div className="mt-4 flex justify-end">
                    <span className="text-pink-500 font-medium">
                      使用工具 →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {!user && (
          <div className="mt-12 bg-zinc-900 p-6 rounded-lg text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              登录以使用全部工具
            </h2>
            <p className="text-zinc-400 mb-6">
              免费用户可以使用基础工具，升级会员以解锁全部功能
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href="/signin"
                className="px-6 py-2 text-white bg-zinc-800 rounded-md hover:bg-zinc-700"
              >
                登录
              </Link>
              <Link
                href="/pricing"
                className="px-6 py-2 text-white bg-pink-600 rounded-md hover:bg-pink-700"
              >
                升级会员
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
