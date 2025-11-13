// Debug script - Check orders in database
import { db } from './src/libs/DB.ts';
import { orderSchema } from './src/models/Schema.ts';

async function checkOrders() {
  try {
    console.log('🔍 Checking all orders in database...\n');

    const allOrders = await db.select().from(orderSchema);

    console.log(`📊 Total orders: ${allOrders.length}\n`);

    if (allOrders.length > 0) {
      console.log('First order details:');
      console.log(JSON.stringify(allOrders[0], null, 2));

      console.log('\n\nAll user IDs:');
      allOrders.forEach((order, index) => {
        console.log(`Order ${index + 1}: userId = "${order.userId}", merchantOid = ${order.merchantOid}`);
      });
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

checkOrders();
