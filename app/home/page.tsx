import { createClient } from '@/utils/supabase/server';
import { getUser } from '@/utils/supabase/queries';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function UserHomePage() {
  const supabase = createClient();
  const user = await getUser(supabase);

  // 如果未登录，重定向到公共主页
  if (!user) {
    redirect('/');
  }

  // 获取用户的名字
  const name =
    user.user_metadata?.full_name || user.email?.split('@')[0] || '用户';

  return (
    <section className="bg-black">
      <div className="max-w-6xl px-4 py-12 mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold text-white mb-4">
            欢迎回来，{name}
          </h1>
          <p className="text-xl text-zinc-400">
            您的联盟营销数据一目了然，继续您的赚钱之旅吧！
          </p>
        </div>

        {/* 数据概览 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-zinc-900 p-6 rounded-lg">
            <h3 className="text-zinc-500 text-sm mb-1">今日点击</h3>
            <p className="text-3xl font-bold text-white">127</p>
            <div className="text-green-500 text-sm mt-2">↑ 12% 相比昨天</div>
          </div>
          <div className="bg-zinc-900 p-6 rounded-lg">
            <h3 className="text-zinc-500 text-sm mb-1">预估收入</h3>
            <p className="text-3xl font-bold text-white">$24.87</p>
            <div className="text-green-500 text-sm mt-2">↑ 8% 相比昨天</div>
          </div>
          <div className="bg-zinc-900 p-6 rounded-lg">
            <h3 className="text-zinc-500 text-sm mb-1">活跃项目</h3>
            <p className="text-3xl font-bold text-white">4</p>
            <div className="text-pink-500 text-sm mt-2">新增一个推荐项目</div>
          </div>
        </div>

        {/* 推荐项目 */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-4">为您推荐的项目</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: 'Shopify 合作伙伴',
                commission: '最高 $400/推荐',
                match: '98% 匹配度',
                description: '基于您的内容和受众匹配'
              },
              {
                name: 'Webflow 设计师计划',
                commission: '20% 持续佣金',
                match: '95% 匹配度',
                description: '适合您的技术博客读者'
              },
              {
                name: 'DigitalOcean 推荐计划',
                commission: '$25 + 使用额度的25%',
                match: '92% 匹配度',
                description: '与您的开发者受众高度相关'
              }
            ].map((program, i) => (
              <div
                key={i}
                className="bg-zinc-900 rounded-lg p-6 border border-zinc-800"
              >
                <div className="mb-2">
                  <span className="text-xs font-medium bg-pink-600 text-white px-2 py-1 rounded">
                    {program.match}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-1">
                  {program.name}
                </h3>
                <p className="text-pink-500 font-medium mb-3">
                  {program.commission}
                </p>
                <p className="text-zinc-400 text-sm mb-4">
                  {program.description}
                </p>
                <button className="text-white bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded text-sm font-medium w-full">
                  查看详情
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 快速访问区域 */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">快速访问</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Link href="/dashboard">
              <div className="bg-zinc-900 p-4 rounded-lg hover:bg-zinc-800 transition">
                <h3 className="text-white font-medium">完整仪表盘</h3>
              </div>
            </Link>
            <Link href="/tools/link-generator">
              <div className="bg-zinc-900 p-4 rounded-lg hover:bg-zinc-800 transition">
                <h3 className="text-white font-medium">生成链接</h3>
              </div>
            </Link>
            <Link href="/discover">
              <div className="bg-zinc-900 p-4 rounded-lg hover:bg-zinc-800 transition">
                <h3 className="text-white font-medium">浏览项目</h3>
              </div>
            </Link>
            <Link href="/learn">
              <div className="bg-zinc-900 p-4 rounded-lg hover:bg-zinc-800 transition">
                <h3 className="text-white font-medium">学习资源</h3>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
