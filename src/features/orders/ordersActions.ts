'use server';

import { auth } from '@clerk/nextjs/server';
import { desc, eq } from 'drizzle-orm';

import { db } from '@/libs/DB';
import {
  orderSchema,
  productFrameSchema,
  productSchema,
  productSizeSchema,
} from '@/models/Schema';

export async function getUserOrders() {
  const { userId } = await auth();

  console.log('🔐 User ID from auth:', userId);

  if (!userId) {
    throw new Error('Unauthorized');
  }

  try {
    const orders = await db
      .select({
        id: orderSchema.id,
        userId: orderSchema.userId,
        generationId: orderSchema.generationId,
        imageUrl: orderSchema.imageUrl,
        merchantOid: orderSchema.merchantOid,
        paymentAmount: orderSchema.paymentAmount,
        totalAmount: orderSchema.totalAmount,
        currency: orderSchema.currency,
        paymentStatus: orderSchema.paymentStatus,
        paymentType: orderSchema.paymentType,
        customerName: orderSchema.customerName,
        customerEmail: orderSchema.customerEmail,
        customerPhone: orderSchema.customerPhone,
        customerAddress: orderSchema.customerAddress,
        shippingStatus: orderSchema.shippingStatus,
        trackingNumber: orderSchema.trackingNumber,
        paidAt: orderSchema.paidAt,
        createdAt: orderSchema.createdAt,
        updatedAt: orderSchema.updatedAt,
        // Product info
        productId: productSchema.id,
        productName: productSchema.name,
        // Size info
        productSizeId: productSizeSchema.id,
        sizeName: productSizeSchema.name,
        sizeDimensions: productSizeSchema.dimensions,
        // Frame info
        productFrameId: productFrameSchema.id,
        frameName: productFrameSchema.name,
      })
      .from(orderSchema)
      .leftJoin(productSchema, eq(orderSchema.productId, productSchema.id))
      .leftJoin(
        productSizeSchema,
        eq(orderSchema.productSizeId, productSizeSchema.id),
      )
      .leftJoin(
        productFrameSchema,
        eq(orderSchema.productFrameId, productFrameSchema.id),
      )
      .where(eq(orderSchema.userId, userId))
      .orderBy(desc(orderSchema.createdAt));

    console.log('📊 Total orders found:', orders.length);
    console.log('🔍 First order:', orders[0]);

    return orders;
  } catch (error) {
    console.error('Error fetching user orders:', error);
    throw new Error('Failed to fetch orders');
  }
}
