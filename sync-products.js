const stripe = require('stripe')('sk_test_51R6mH7PYv2gXOZwVycEIdLARk3uI0ykFAwmSs8DdeaAzxGHNEChuYVG17oqzib95I5nQmuQWO8LvVDE1XKBuhXkP00eTWrv7QB');
const { createClient } = require('@supabase/supabase-js');

// 创建Supabase客户端
const supabase = createClient(
  'https://wdgsjtksfnztoabdogmp.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkZ3NqdGtzZm56dG9hYmRvZ21wIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0Mjk3MDU4NywiZXhwIjoyMDU4NTQ2NTg3fQ.Ww9MnrFJXwdyFkzZe2-8XStAHLLXem32Rw-KVuleYzA'
);

async function syncProducts() {
  try {
    console.log('开始同步产品和价格...');
    
    // 获取所有产品
    const products = await stripe.products.list({ active: true });
    console.log(`找到 ${products.data.length} 个产品`);
    
    for (const product of products.data) {
      console.log(`同步产品: ${product.name}`);
      
      // 插入产品
      const { error: productError } = await supabase
        .from('products')
        .upsert({
          id: product.id,
          active: product.active,
          name: product.name,
          description: product.description,
          image: product.images && product.images[0],
          metadata: product.metadata
        });
      
      if (productError) {
        console.error('产品插入错误:', productError);
        continue;
      }
      
      // 获取产品的价格
      const prices = await stripe.prices.list({ product: product.id, active: true });
      console.log(`产品 ${product.name} 有 ${prices.data.length} 个价格`);
      
      for (const price of prices.data) {
        console.log(`同步价格: ${price.nickname || price.id}`);
        
        // 插入价格
        const { error: priceError } = await supabase
          .from('prices')
          .upsert({
            id: price.id,
            product_id: price.product,
            active: price.active,
            description: price.nickname,
            unit_amount: price.unit_amount,
            currency: price.currency,
            type: price.type,
            interval: price.recurring?.interval,
            interval_count: price.recurring?.interval_count,
            trial_period_days: price.recurring?.trial_period_days,
            metadata: price.metadata
          });
        
        if (priceError) {
          console.error('价格插入错误:', priceError);
        }
      }
    }
    
    console.log('同步完成!');
  } catch (error) {
    console.error('同步过程中发生错误:', error);
  }
}

syncProducts();
