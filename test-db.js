const { createClient } = require('@supabase/supabase-js');

// 创建Supabase客户端
const supabase = createClient(
  'https://wdgsjtksfnztoabdogmp.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkZ3NqdGtzZm56dG9hYmRvZ21wIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0Mjk3MDU4NywiZXhwIjoyMDU4NTQ2NTg3fQ.Ww9MnrFJXwdyFkzZe2-8XStAHLLXem32Rw-KVuleYzA'
);

async function testProducts() {
  try {
    console.log('正在测试数据库连接...');

    // 检查products表
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('*');

    if (productsError) {
      console.error('获取产品时出错:', productsError);
      return;
    }

    console.log(`在products表中找到 ${products.length} 个产品`);
    if (products.length > 0) {
      console.log('第一个产品:', products[0]);
    } else {
      console.log('products表为空！');
    }

    // 检查prices表
    const { data: prices, error: pricesError } = await supabase
      .from('prices')
      .select('*');

    if (pricesError) {
      console.error('获取价格时出错:', pricesError);
      return;
    }

    console.log(`在prices表中找到 ${prices.length} 个价格`);
    if (prices.length > 0) {
      console.log('第一个价格:', prices[0]);
    } else {
      console.log('prices表为空！');
    }

    // 检查表之间的关联
    if (products.length > 0 && prices.length > 0) {
      const firstProductId = products[0].id;
      const { data: relatedPrices, error: relatedError } = await supabase
        .from('prices')
        .select('*')
        .eq('product_id', firstProductId);

      if (relatedError) {
        console.error('获取关联价格时出错:', relatedError);
        return;
      }

      console.log(
        `产品 "${products[0].name}" 有 ${relatedPrices.length} 个关联价格`
      );
    }

    console.log('测试完成!');
  } catch (error) {
    console.error('测试过程中发生错误:', error);
  }
}

testProducts();
