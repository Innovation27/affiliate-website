import { createClient } from '@/utils/supabase/server';
import { getUser } from '@/utils/supabase/queries';
import Link from 'next/link';

export default async function LearnPage() {
  const supabase = createClient();
  const user = await getUser(supabase);

  // 模拟教程数据
  const tutorials = [
    {
      id: 1,
      title: '联盟营销入门指南',
      description: '适合初学者的全面入门教程，了解联盟营销的基础知识',
      level: '初级',
      duration: '30分钟',
      thumbnail: '/images/tutorial-1.jpg'
    },
    {
      id: 2,
      title: '如何选择最佳联盟项目',
      description: '学习评估和选择适合您受众的联盟项目',
      level: '初级',
      duration: '25分钟',
      thumbnail: '/images/tutorial-2.jpg'
    },
    {
      id: 3,
      title: '内容营销策略',
      description: '创建能够转化的优质内容，提高佣金收入',
      level: '中级',
      duration: '45分钟',
      thumbnail: '/images/tutorial-3.jpg'
    },
    {
      id: 4,
      title: 'SEO优化技巧',
      description: '优化您的内容以获得更多有机流量',
      level: '中级',
      duration: '50分钟',
      thumbnail: '/images/tutorial-4.jpg'
    }
  ];

  // 模拟社区讨论数据
  const discussions = [
    {
      id: 1,
      title: '2024年最具潜力的联盟项目是什么？',
      author: '营销达人',
      replies: 28,
      views: 342
    },
    {
      id: 2,
      title: '如何提高电子邮件营销的转化率？',
      author: 'Email专家',
      replies: 15,
      views: 187
    },
    {
      id: 3,
      title: '使用社交媒体推广联盟链接的最佳实践',
      author: '社媒大师',
      replies: 32,
      views: 456
    }
  ];

  return (
    <section className="bg-black">
      <div className="max-w-6xl px-4 py-12 mx-auto">
        <h1 className="text-4xl font-extrabold text-white mb-6">学习与社区</h1>

        {/* 教程部分 */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">热门教程</h2>
            <Link
              href="/learn/tutorials"
              className="text-pink-500 hover:text-pink-400"
            >
              查看全部 →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tutorials.map((tutorial) => (
              <div
                key={tutorial.id}
                className="bg-zinc-900 rounded-lg overflow-hidden"
              >
                <div className="h-40 bg-zinc-800 flex items-center justify-center">
                  <span className="text-5xl">📚</span>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {tutorial.title}
                  </h3>
                  <p className="text-zinc-400 text-sm mb-3">
                    {tutorial.description}
                  </p>
                  <div className="flex justify-between text-xs text-zinc-500">
                    <span>{tutorial.level}</span>
                    <span>{tutorial.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 社区讨论部分 */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">社区讨论</h2>
            <Link
              href="/learn/community"
              className="text-pink-500 hover:text-pink-400"
            >
              进入社区 →
            </Link>
          </div>

          <div className="bg-zinc-900 rounded-lg overflow-hidden">
            {discussions.map((discussion, index) => (
              <div
                key={discussion.id}
                className={`p-4 ${
                  index < discussions.length - 1
                    ? 'border-b border-zinc-800'
                    : ''
                }`}
              >
                <h3 className="text-lg font-medium text-white mb-2">
                  {discussion.title}
                </h3>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">by {discussion.author}</span>
                  <div className="text-zinc-500">
                    <span className="mr-4">{discussion.replies} 回复</span>
                    <span>{discussion.views} 浏览</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {!user && (
            <div className="mt-8 bg-zinc-900 p-6 rounded-lg text-center">
              <h2 className="text-xl font-bold text-white mb-3">
                加入我们的社区
              </h2>
              <p className="text-zinc-400 mb-4">
                与数千名联盟营销专家交流经验和技巧
              </p>
              <Link
                href="/signin/signup"
                className="px-6 py-2 text-white bg-pink-600 rounded-md hover:bg-pink-700 inline-block"
              >
                立即注册
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
