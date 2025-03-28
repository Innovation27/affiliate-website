import { createClient } from '@/utils/supabase/server';
import { getUser } from '@/utils/supabase/queries';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function DashboardPage() {
  const supabase = createClient();
  const user = await getUser(supabase);

  // 如果未登录，重定向到登录页面
  if (!user) {
    redirect('/signin');
  }

  // 模拟用户数据
  const userData = {
    totalClicks: 1248,
    totalConversions: 37,
    conversionRate: '2.96%',
    totalEarnings: '$341.29',
    pendingEarnings: '$128.75',
    recentPrograms: [
      {
        name: 'Amazon Associates',
        clicks: 432,
        conversions: 12,
        earnings: '$98.45'
      },
      { name: 'Shopify', clicks: 214, conversions: 5, earnings: '$152.80' },
      { name: 'Udemy', clicks: 187, conversions: 8, earnings: '$43.20' }
    ]
  };

  return (
    <section className="bg-black">
      <div className="max-w-6xl px-4 py-12 mx-auto">
        <h1 className="text-4xl font-extrabold text-white mb-8">仪表盘</h1>

        {/* 概览卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-zinc-900 p-6 rounded-lg">
            <h3 className="text-zinc-500 text-sm mb-1">总点击</h3>
            <p className="text-3xl font-bold text-white">
              {userData.totalClicks}
            </p>
          </div>
          <div className="bg-zinc-900 p-6 rounded-lg">
            <h3 className="text-zinc-500 text-sm mb-1">总转化</h3>
            <p className="text-3xl font-bold text-white">
              {userData.totalConversions}
            </p>
          </div>
          <div className="bg-zinc-900 p-6 rounded-lg">
            <h3 className="text-zinc-500 text-sm mb-1">转化率</h3>
            <p className="text-3xl font-bold text-white">
              {userData.conversionRate}
            </p>
          </div>
          <div className="bg-zinc-900 p-6 rounded-lg">
            <h3 className="text-zinc-500 text-sm mb-1">总收入</h3>
            <p className="text-3xl font-bold text-white">
              {userData.totalEarnings}
            </p>
          </div>
        </div>

        {/* 最近项目 */}
        <div className="bg-zinc-900 rounded-lg overflow-hidden mb-10">
          <div className="p-6 border-b border-zinc-800">
            <h2 className="text-xl font-bold text-white">最近项目表现</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-zinc-800">
                  <th className="text-left p-4 text-zinc-400 font-medium">
                    项目
                  </th>
                  <th className="text-right p-4 text-zinc-400 font-medium">
                    点击
                  </th>
                  <th className="text-right p-4 text-zinc-400 font-medium">
                    转化
                  </th>
                  <th className="text-right p-4 text-zinc-400 font-medium">
                    收入
                  </th>
                </tr>
              </thead>
              <tbody>
                {userData.recentPrograms.map((program, index) => (
                  <tr key={index} className="border-b border-zinc-800">
                    <td className="p-4 text-white">{program.name}</td>
                    <td className="p-4 text-right text-white">
                      {program.clicks}
                    </td>
                    <td className="p-4 text-right text-white">
                      {program.conversions}
                    </td>
                    <td className="p-4 text-right text-white">
                      {program.earnings}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 快速链接 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/discover">
            <div className="bg-zinc-900 p-6 rounded-lg hover:bg-zinc-800 transition duration-300">
              <h3 className="text-lg font-semibold text-white mb-2">
                发现新项目
              </h3>
              <p className="text-zinc-400">浏览更多联盟项目以增加收入来源</p>
            </div>
          </Link>
          <Link href="/tools">
            <div className="bg-zinc-900 p-6 rounded-lg hover:bg-zinc-800 transition duration-300">
              <h3 className="text-lg font-semibold text-white mb-2">
                推广工具
              </h3>
              <p className="text-zinc-400">访问链接生成器、缩短器等工具</p>
            </div>
          </Link>
          <Link href="/learn">
            <div className="bg-zinc-900 p-6 rounded-lg hover:bg-zinc-800 transition duration-300">
              <h3 className="text-lg font-semibold text-white mb-2">
                学习资源
              </h3>
              <p className="text-zinc-400">查看教程和最佳实践，提升您的技能</p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
