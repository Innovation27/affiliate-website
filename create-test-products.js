const stripe = require('stripe')('sk_test_51R6mH7PYv2gXOZwVycEIdLARk3uI0ykFAwmSs8DdeaAzxGHNEChuYVG17oqzib95I5nQmuQWO8LvVDE1XKBuhXkP00eTWrv7QB');

async function createTestProducts() {
  try {
    // 创建Hobby产品
    const hobby = await stripe.products.create({
      name: 'Hobby',
      description: 'All the basics for starting a new business'
    });
    
    await stripe.prices.create({
      product: hobby.id,
      unit_amount: 1200,
      currency: 'usd',
      recurring: { interval: 'month' },
      nickname: 'Hobby Monthly'
    });
    
    // 创建Freelancer产品
    const freelancer = await stripe.products.create({
      name: 'Freelancer',
      description: 'All the basics for starting a new business'
    });
    
    await stripe.prices.create({
      product: freelancer.id,
      unit_amount: 2400,
      currency: 'usd',
      recurring: { interval: 'month' },
      nickname: 'Freelancer Monthly'
    });
    
    // 创建Startup产品
    const startup = await stripe.products.create({
      name: 'Startup',
      description: 'All the basics for starting a new business'
    });
    
    await stripe.prices.create({
      product: startup.id,
      unit_amount: 3200,
      currency: 'usd',
      recurring: { interval: 'month' },
      nickname: 'Startup Monthly'
    });
    
    // 创建Enterprise产品
    const enterprise = await stripe.products.create({
      name: 'Enterprise',
      description: 'All the basics for starting a new business'
    });
    
    await stripe.prices.create({
      product: enterprise.id,
      unit_amount: 4800,
      currency: 'usd',
      recurring: { interval: 'month' },
      nickname: 'Enterprise Monthly'
    });
    
    console.log('测试产品和价格创建成功!');
  } catch (error) {
    console.error('创建测试产品时出错:', error);
  }
}

createTestProducts();
