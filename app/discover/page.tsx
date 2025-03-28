import { createClient } from '@/utils/supabase/server';
import { getUser } from '@/utils/supabase/queries';

export default async function DiscoverPage() {
  const supabase = createClient();
  const user = await getUser(supabase);

  // 这里可以添加从数据库获取联盟项目的逻辑

  // 模拟项目数据
  const affiliatePrograms = [
    {
      id: 1,
      name: 'Amazon Associates',
      description: '亚马逊联盟计划，推广百万种产品获得佣金',
      commission: '1% - 10%',
      category: '电子商务',
      region: '全球'
    },
    {
      id: 2,
      name: 'Shopify 联盟计划',
      description: '推广电商平台，每位付费用户获得高额回报',
      commission: '200美元/用户',
      category: '电商平台',
      region: '全球'
    },
    {
      id: 3,
      name: 'Aliexpress 联盟计划',
      description: '推广全球最大批发平台的产品获得佣金',
      commission: '4% - 8%',
      category: '电子商务',
      region: '全球'
    },
    {
      id: 4,
      name: 'JD 联盟',
      description: '推广京东平台商品获得佣金',
      commission: '2% - 20%',
      category: '电子商务',
      region: '中国'
    },
    {
      id: 5,
      name: 'Taobao 联盟',
      description: '推广淘宝、天猫的商品获得佣金',
      commission: '3% - 15%',
      category: '电子商务',
      region: '中国'
    },
    {
      id: 6,
      name: 'Udemy 联盟计划',
      description: '推广在线课程，每销售一个课程获得佣金',
      commission: '20% - 50%',
      category: '教育',
      region: '全球'
    }
  ];

  return (
    <section className="bg-black">
      <div className="max-w-6xl px-4 py-12 mx-auto">
        <h1 className="text-4xl font-extrabold text-white mb-6">
          发现联盟项目
        </h1>

        {/* 搜索和筛选 */}
        <div className="bg-zinc-900 p-4 rounded-lg mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-zinc-400 mb-1 text-sm">
                搜索关键词
              </label>
              <input
                type="text"
                className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white"
                placeholder="输入关键词..."
              />
            </div>
            <div>
              <label className="block text-zinc-400 mb-1 text-sm">类别</label>
              <select className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white">
                <option value="">所有类别</option>
                <option value="电子商务">电子商务</option>
                <option value="软件">软件</option>
                <option value="教育">教育</option>
                <option value="金融">金融</option>
              </select>
            </div>
            <div>
              <label className="block text-zinc-400 mb-1 text-sm">
                佣金类型
              </label>
              <select className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white">
                <option value="">所有类型</option>
                <option value="销售">销售佣金</option>
                <option value="引荐">引荐佣金</option>
                <option value="订阅">订阅佣金</option>
              </select>
            </div>
            <div>
              <label className="block text-zinc-400 mb-1 text-sm">地区</label>
              <select className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white">
                <option value="">全球</option>
                <option value="中国">中国</option>
                <option value="美国">美国</option>
                <option value="欧洲">欧洲</option>
              </select>
            </div>
          </div>
        </div>

        {/* 项目列表 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {affiliatePrograms.map((program) => (
            <div
              key={program.id}
              className="bg-zinc-900 rounded-lg overflow-hidden"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {program.name}
                </h3>
                <p className="text-zinc-400 mb-4">{program.description}</p>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-300">
                    <span className="text-zinc-500">佣金: </span>
                    {program.commission}
                  </span>
                  <span className="text-zinc-300">
                    <span className="text-zinc-500">类别: </span>
                    {program.category}
                  </span>
                </div>
                <div className="mt-2 text-sm">
                  <span className="text-zinc-300">
                    <span className="text-zinc-500">地区: </span>
                    {program.region}
                  </span>
                </div>
                <div className="mt-6">
                  <button className="w-full bg-pink-600 hover:bg-pink-700 text-white font-medium py-2 px-4 rounded">
                    申请加入
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
