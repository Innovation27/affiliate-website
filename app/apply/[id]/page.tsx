'use client';

import { useEffect, useState, FormEvent, ChangeEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

// 定义项目类型
type Program = {
  id: string;
  name: string;
  description: string;
  fullDescription: string;
  commission: string;
  category: string;
  region: string;
  requirements: string[];
  benefits: string[];
  logo: string;
};

// 模拟项目数据库
const programsDatabase: Program[] = [
  {
    id: '1',
    name: 'Amazon Associates',
    description: '亚马逊联盟计划，推广百万种产品获得佣金',
    fullDescription:
      '亚马逊联盟计划是全球最大的联盟营销项目之一，允许您推广亚马逊平台上的数百万种产品。' +
      '无论您经营的是博客、信息网站、价格比较网站还是移动应用程序，您都可以通过分享亚马逊产品链接获取收入。' +
      '根据产品类别不同，佣金率从1%到10%不等。最适合有大量流量的内容创作者。',
    commission: '1% - 10%',
    category: '电子商务',
    region: '全球',
    requirements: [
      '网站或应用程序至少有3个月的历史',
      '网站内容必须为原创，无复制内容',
      '网站每月至少有1000个独立访客',
      '符合亚马逊联盟计划的运营政策'
    ],
    benefits: [
      '推广全球数百万种产品',
      '获得高达10%的销售佣金',
      '访问详细的报告和分析工具',
      '多种广告素材和API可用',
      '24小时全天候支持'
    ],
    logo: '🛒'
  },
  {
    id: '2',
    name: 'Shopify 联盟计划',
    description: '推广电商平台，每位付费用户获得高额回报',
    fullDescription:
      'Shopify联盟计划允许您通过推荐商家使用Shopify平台建立在线商店来赚取佣金。' +
      '每当您推荐的人注册Shopify付费计划，您将获得一次性付款或持续的月度收入分成。' +
      '这是一个高价值的合作伙伴计划，特别适合面向企业主、电商爱好者和数字营销人员的内容创作者。',
    commission: '200美元/用户',
    category: '电商平台',
    region: '全球',
    requirements: [
      '必须有活跃的网站、博客或社交媒体渠道',
      '内容必须与电子商务、创业或数字营销相关',
      '申请时提供有关您如何推广Shopify的详细计划',
      '遵守Shopify联盟计划条款和条件'
    ],
    benefits: [
      '每个推荐可获得高达$2,000的佣金',
      '200多个国家和地区的覆盖',
      '提供丰富的营销材料和支持',
      '自动支付系统',
      '专属联盟经理支持'
    ],
    logo: '🏪'
  },
  {
    id: '3',
    name: 'Aliexpress 联盟计划',
    description: '推广全球最大批发平台的产品获得佣金',
    fullDescription:
      'Aliexpress联盟计划让您可以推广来自全球最大批发平台的数百万种产品。' +
      '作为联盟成员，您可以获得购物者通过您的链接或优惠券购买的所有商品佣金。' +
      '无论您经营的是价格比较网站、优惠券网站、博客还是社交媒体渠道，都能找到适合推广的产品。',
    commission: '4% - 8%',
    category: '电子商务',
    region: '全球',
    requirements: [
      '拥有活跃的网站或社交媒体账号',
      '平台内容必须合法且无争议',
      '能够定期推广产品',
      '符合Aliexpress联盟计划政策'
    ],
    benefits: [
      '推广超过1亿种产品',
      '具有竞争力的佣金率',
      '60天的跟踪Cookie期限',
      '多种推广工具和API',
      '定期促销活动增加收入机会'
    ],
    logo: '🌐'
  },
  {
    id: '4',
    name: 'JD 联盟',
    description: '推广京东平台商品获得佣金',
    fullDescription:
      '京东联盟是中国领先的电商联盟平台，让您通过推广京东平台上的商品获得佣金。' +
      '作为联盟成员，您可以访问数亿种商品并获得推广工具。' +
      '佣金根据产品类别不同，从2%到20%不等，特别适合中文内容创作者和面向中国市场的营销人员。',
    commission: '2% - 20%',
    category: '电子商务',
    region: '中国',
    requirements: [
      '拥有中文网站或社交媒体渠道',
      '网站每月至少有5000次访问',
      '内容必须符合中国法律法规',
      '遵守京东联盟政策和规定'
    ],
    benefits: [
      '推广中国最大电商平台商品',
      '高达20%的佣金率',
      '专业的推广工具和素材',
      '24小时联盟支持',
      '稳定的结算系统'
    ],
    logo: '🛍️'
  },
  {
    id: '5',
    name: 'Taobao 联盟',
    description: '推广淘宝、天猫的商品获得佣金',
    fullDescription:
      '淘宝联盟允许推广淘宝和天猫平台上的海量商品。' +
      '作为联盟成员，您可以选择数亿种产品进行推广，并从每次销售中获得佣金。' +
      '佣金率根据产品类别从3%到15%不等，是面向中国市场的内容创作者的理想选择。',
    commission: '3% - 15%',
    category: '电子商务',
    region: '中国',
    requirements: [
      '拥有中文网站或社交媒体账号',
      '能够定期发布原创内容',
      '符合阿里巴巴平台规则',
      '通过实名认证'
    ],
    benefits: [
      '推广中国最大电商平台商品',
      '具有竞争力的佣金率',
      '多种推广工具和素材',
      '特别活动和促销增加收入',
      '稳定可靠的支付系统'
    ],
    logo: '🛒'
  },
  {
    id: '6',
    name: 'Udemy 联盟计划',
    description: '推广在线课程，每销售一个课程获得佣金',
    fullDescription:
      'Udemy联盟计划让您通过推广全球最大在线学习平台上的课程获得佣金。' +
      '平台上有超过18万门课程，涵盖技术、商业、设计等多个领域。' +
      '佣金率高达50%，非常适合教育、自我提升和技能发展内容的创作者。',
    commission: '20% - 50%',
    category: '教育',
    region: '全球',
    requirements: [
      '拥有活跃的博客、网站或社交媒体渠道',
      '内容与教育、技能发展相关',
      '能够定期推广课程',
      '遵守Udemy联盟计划条款'
    ],
    benefits: [
      '推广超过18万门优质课程',
      '高达50%的佣金率',
      '7天Cookie跟踪窗口',
      '定期促销活动和折扣',
      '详细的报表和分析'
    ],
    logo: '📚'
  }
];

// 表单数据类型
type FormData = {
  name: string;
  email: string;
  website: string;
  social: string;
  experience: string;
  promotion: string;
};

export default function ApplyPage() {
  const params = useParams();
  const router = useRouter();
  const [program, setProgram] = useState<Program | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    website: '',
    social: '',
    experience: '',
    promotion: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (params.id) {
      // 在实际应用中，这里应该从API获取数据
      const foundProgram = programsDatabase.find((p) => p.id === params.id);
      setProgram(foundProgram || null);
      setLoading(false);
    }
  }, [params.id]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 模拟API提交
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      // 在实际应用中，这里应该向API发送数据
      console.log('提交的数据:', formData);
    }, 1500);
  };

  if (loading) {
    return (
      <section className="bg-black min-h-screen">
        <div className="max-w-6xl px-4 py-12 mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-zinc-800 rounded w-1/3 mb-6"></div>
            <div className="h-64 bg-zinc-800 rounded mb-6"></div>
            <div className="h-96 bg-zinc-800 rounded"></div>
          </div>
        </div>
      </section>
    );
  }

  if (!program) {
    return (
      <section className="bg-black min-h-screen">
        <div className="max-w-6xl px-4 py-12 mx-auto text-center">
          <h1 className="text-4xl font-extrabold text-white mb-6">
            项目未找到
          </h1>
          <p className="text-xl text-zinc-400 mb-8">
            抱歉，您要申请的联盟项目不存在或已被移除。
          </p>
          <Link
            href="/discover"
            className="px-6 py-3 text-white bg-pink-600 rounded-md hover:bg-pink-700"
          >
            返回发现页面
          </Link>
        </div>
      </section>
    );
  }

  if (submitted) {
    return (
      <section className="bg-black min-h-screen">
        <div className="max-w-6xl px-4 py-12 mx-auto text-center">
          <div className="text-5xl mb-6">✅</div>
          <h1 className="text-4xl font-extrabold text-white mb-6">
            申请已提交
          </h1>
          <p className="text-xl text-zinc-400 mb-8">
            您对 {program.name}{' '}
            的申请已成功提交！我们会尽快审核您的申请并通过邮件联系您。
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/discover"
              className="px-6 py-3 text-white bg-zinc-800 rounded-md hover:bg-zinc-700"
            >
              浏览更多项目
            </Link>
            <Link
              href="/"
              className="px-6 py-3 text-white bg-pink-600 rounded-md hover:bg-pink-700"
            >
              返回首页
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-black min-h-screen">
      <div className="max-w-6xl px-4 py-12 mx-auto">
        <Link
          href="/discover"
          className="inline-flex items-center text-pink-500 hover:text-pink-400 mb-6"
        >
          ← 返回项目列表
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 项目信息 */}
          <div className="md:col-span-1">
            <div className="bg-zinc-900 rounded-lg p-6 sticky top-24">
              <div className="text-5xl mb-4">{program.logo}</div>
              <h1 className="text-2xl font-bold text-white mb-3">
                {program.name}
              </h1>
              <p className="text-zinc-400 mb-4">
                {program.fullDescription || program.description}
              </p>

              <div className="mb-4">
                <h3 className="text-sm font-medium text-zinc-500 mb-2">
                  基本信息
                </h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-zinc-400">佣金：</div>
                  <div className="text-white">{program.commission}</div>
                  <div className="text-zinc-400">类别：</div>
                  <div className="text-white">{program.category}</div>
                  <div className="text-zinc-400">地区：</div>
                  <div className="text-white">{program.region}</div>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="text-sm font-medium text-zinc-500 mb-2">
                  项目要求
                </h3>
                <ul className="text-sm text-zinc-400 space-y-1">
                  {program.requirements?.map((req, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-xs text-pink-500 mr-2 mt-1">■</span>{' '}
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-medium text-zinc-500 mb-2">
                  项目福利
                </h3>
                <ul className="text-sm text-zinc-400 space-y-1">
                  {program.benefits?.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-xs text-green-500 mr-2 mt-1">
                        ■
                      </span>{' '}
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* 申请表单 */}
          <div className="md:col-span-2">
            <div className="bg-zinc-900 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-6">
                申请加入 {program.name}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1">
                      您的姓名 *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1">
                      电子邮箱 *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1">
                      网站或博客 URL
                    </label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                      placeholder="https://"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1">
                      社交媒体账号
                    </label>
                    <input
                      type="text"
                      name="social"
                      value={formData.social}
                      onChange={handleChange}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                      placeholder="Instagram, Twitter, TikTok 等"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1">
                      联盟营销经验 *
                    </label>
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      required
                      className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                    >
                      <option value="">请选择</option>
                      <option value="none">没有经验</option>
                      <option value="beginner">初学者（0-1年）</option>
                      <option value="intermediate">中级（1-3年）</option>
                      <option value="advanced">高级（3-5年）</option>
                      <option value="expert">专家（5年以上）</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1">
                      您计划如何推广这个项目？ *
                    </label>
                    <textarea
                      name="promotion"
                      value={formData.promotion}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                      placeholder="请详细描述您的推广计划、目标受众和预期效果..."
                    ></textarea>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-3 px-4 rounded-md text-white font-medium ${
                        isSubmitting
                          ? 'bg-zinc-700 cursor-not-allowed'
                          : 'bg-pink-600 hover:bg-pink-700'
                      }`}
                    >
                      {isSubmitting ? '提交中...' : '提交申请'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
