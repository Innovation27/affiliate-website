'use client';

import LogoCloud from '@/components/ui/LogoCloud';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function MarketingHomepage() {
  return (
    <section className="bg-black min-h-screen">
      <div className="max-w-6xl px-4 py-20 mx-auto sm:py-32 sm:px-6 lg:px-8">
        {/* 英雄区域 - 使用动画效果 */}
        <div className="text-center">
          <motion.h1
            className="text-5xl font-extrabold text-white sm:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            联盟营销平台
          </motion.h1>
          <motion.p
            className="max-w-2xl m-auto mt-6 text-xl text-zinc-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            发现、管理和优化您的联盟推广机会，快速实现被动收入增长
          </motion.p>
          <motion.div
            className="flex flex-wrap justify-center gap-4 mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link
              href="/signin/signup"
              className="px-8 py-3 text-base font-medium text-white bg-pink-600 rounded-md hover:bg-pink-700 shadow-lg shadow-pink-500/20 transition-all hover:shadow-pink-500/40"
            >
              免费注册
            </Link>
            <Link
              href="/signin"
              className="px-8 py-3 text-base font-medium text-white bg-zinc-800 rounded-md hover:bg-zinc-700 transition-all"
            >
              立即登录
            </Link>
          </motion.div>
        </div>

        {/* 特点展示部分 */}
        <div className="mt-32">
          <motion.h2
            className="text-3xl font-bold text-center text-white"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            为什么选择我们的平台？
          </motion.h2>
          <div className="grid grid-cols-1 gap-8 mt-12 sm:grid-cols-2 lg:grid-cols-3">
            {/* 特点卡片 */}
            {[
              {
                title: '全球联盟项目库',
                description: '访问数千个精选联盟计划，涵盖各个行业和地区',
                icon: '🌎'
              },
              {
                title: 'AI智能推荐',
                description: '根据您的受众和内容类型，智能匹配最佳联盟项目',
                icon: '🤖'
              },
              {
                title: '一键生成推广链接',
                description: '无需复杂设置，快速生成跟踪链接和营销素材',
                icon: '🔗'
              },
              {
                title: '实时数据分析',
                description: '追踪您的推广表现，了解转化率和收入情况',
                icon: '📊'
              },
              {
                title: '多平台推广工具',
                description: '支持社交媒体、网站、邮件等多种渠道推广',
                icon: '📱'
              },
              {
                title: '专家社区支持',
                description: '加入专业社区，学习最佳实践和营销技巧',
                icon: '👥'
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                className="p-6 bg-zinc-900 rounded-lg border border-zinc-800 hover:border-pink-500/50 transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-zinc-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 会员计划部分 */}
        <motion.div
          className="mt-32 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-white">
            选择适合您的会员计划
          </h2>
          <p className="max-w-2xl m-auto mt-4 text-zinc-300">
            从免费方案开始，随着业务增长升级到高级计划
          </p>
          <div className="mt-8">
            <Link
              href="/pricing"
              className="px-8 py-3 text-base font-medium text-white bg-pink-600 rounded-md hover:bg-pink-700 transition-all hover:scale-105"
            >
              查看详细价格
            </Link>
          </div>
        </motion.div>

        {/* 用户评价部分 */}
        <motion.div
          className="mt-32"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            用户心声
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote:
                  '加入平台后，我的被动收入增长了3倍，推广工具极大地简化了我的工作流程。',
                author: '李明',
                title: '内容创作者'
              },
              {
                quote:
                  'AI推荐引擎帮我找到了完美匹配的项目，为我的博客带来了额外收入。',
                author: '张华',
                title: '博主'
              },
              {
                quote:
                  '作为兼职营销人员，这个平台让我能够高效管理多个联盟计划，节省了大量时间。',
                author: '王芳',
                title: '自由职业者'
              }
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                className="bg-zinc-900 p-6 rounded-lg border border-zinc-800"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <p className="italic text-zinc-300 mb-4">
                  "{testimonial.quote}"
                </p>
                <div className="font-semibold text-white">
                  {testimonial.author}
                </div>
                <div className="text-zinc-500 text-sm">{testimonial.title}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 注册行动号召 */}
        <motion.div
          className="mt-32 py-16 bg-gradient-to-r from-zinc-900 to-zinc-800 rounded-xl text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-white mb-6">
            今天就开始您的联盟营销之旅
          </h2>
          <p className="max-w-2xl m-auto text-zinc-300 mb-8">
            加入成千上万的内容创作者，开始将您的影响力转化为收入
          </p>
          <Link
            href="/signin/signup"
            className="px-8 py-4 text-lg font-medium text-white bg-pink-600 rounded-md hover:bg-pink-700 transition-all shadow-lg shadow-pink-500/20 hover:shadow-pink-500/40"
          >
            免费注册
          </Link>
        </motion.div>

        {/* 合作伙伴部分 */}
        <LogoCloud />
      </div>
    </section>
  );
}
