import LogoCloud from '@/components/ui/LogoCloud';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import { getUser } from '@/utils/supabase/queries';
import { redirect } from 'next/navigation';

export default async function HomePage() {
  const supabase = createClient();
  const user = await getUser(supabase);

  // 如果用户已登录，重定向到用户主页
  if (user) {
    redirect('/home');
  }

  return (
    <section className="bg-black min-h-screen">
      <div className="max-w-6xl px-4 py-20 mx-auto sm:py-32 sm:px-6 lg:px-8">
        {/* 英雄区域 */}
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-white sm:text-7xl">
            联盟营销平台
          </h1>
          <p className="max-w-2xl m-auto mt-6 text-xl text-zinc-300">
            发现、管理和优化您的联盟推广机会，快速实现被动收入增长
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <Link
              href="/signin/signup"
              className="px-8 py-3 text-base font-medium text-white bg-pink-600 rounded-md hover:bg-pink-700"
            >
              免费注册
            </Link>
            <Link
              href="/signin"
              className="px-8 py-3 text-base font-medium text-white bg-zinc-800 rounded-md hover:bg-zinc-700"
            >
              登录
            </Link>
          </div>
        </div>

        {/* 特点展示部分 */}
        <div className="mt-32">
          <h2 className="text-3xl font-bold text-center text-white">
            为什么选择我们的平台？
          </h2>
          <div className="grid grid-cols-1 gap-8 mt-12 sm:grid-cols-2 lg:grid-cols-3">
            {/* 特点卡片 */}
            {[
              {
                title: '全球联盟项目库',
                description: '访问数千个精选联盟计划，涵盖各个行业和地区'
              },
              {
                title: 'AI智能推荐',
                description: '根据您的受众和内容类型，智能匹配最佳联盟项目'
              },
              {
                title: '一键生成推广链接',
                description: '无需复杂设置，快速生成跟踪链接和营销素材'
              },
              {
                title: '实时数据分析',
                description: '随时了解您的推广效果，优化您的营销策略'
              },
              {
                title: '多平台整合',
                description: '将您的所有联盟项目集中管理，一目了然'
              },
              {
                title: '专业社区支持',
                description: '与其他营销专家交流经验，共同成长'
              }
            ].map((feature, i) => (
              <div key={i} className="p-6 bg-zinc-900 rounded-lg">
                <h3 className="text-xl font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-zinc-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 吸引用户注册部分 */}
        <div className="mt-32 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            立即开始您的联盟营销之旅
          </h2>
          <p className="max-w-2xl m-auto text-zinc-300 mb-8">
            已有超过10,000名内容创作者通过我们的平台实现收入增长
          </p>
          <div className="bg-gradient-to-r from-pink-700 to-purple-700 p-8 rounded-lg max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              免费注册，立即获得：
            </h3>
            <ul className="text-left text-white mb-6 mx-auto max-w-md">
              <li className="mb-3 flex items-start">
                <span className="mr-2 text-green-400">✓</span>
                <span>10个精选联盟项目推荐</span>
              </li>
              <li className="mb-3 flex items-start">
                <span className="mr-2 text-green-400">✓</span>
                <span>基础链接生成和追踪工具</span>
              </li>
              <li className="mb-3 flex items-start">
                <span className="mr-2 text-green-400">✓</span>
                <span>核心数据分析功能</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-green-400">✓</span>
                <span>社区学习资源访问</span>
              </li>
            </ul>
            <Link
              href="/signin/signup"
              className="px-8 py-3 text-base font-medium text-white bg-black rounded-md hover:bg-zinc-900 inline-block"
            >
              立即注册 - 完全免费
            </Link>
          </div>
        </div>

        {/* 合作伙伴部分 */}
        <LogoCloud />
      </div>
    </section>
  );
}
