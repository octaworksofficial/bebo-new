import {
  bigint,
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from 'drizzle-orm/pg-core';

// This file defines the structure of your database tables using the Drizzle ORM.

// To modify the database schema:
// 1. Update this file with your desired changes.
// 2. Generate a new migration by running: `npm run db:generate`

// The generated migration file will reflect your schema changes.
// The migration is automatically applied during the next database interaction,
// so there's no need to run it manually or restart the Next.js server.

// Need a database for production? Check out https://www.prisma.io/?via=saasboilerplatesrc
// Tested and compatible with Next.js Boilerplate
export const organizationSchema = pgTable(
  'organization',
  {
    id: text('id').primaryKey(),
    stripeCustomerId: text('stripe_customer_id'),
    stripeSubscriptionId: text('stripe_subscription_id'),
    stripeSubscriptionPriceId: text('stripe_subscription_price_id'),
    stripeSubscriptionStatus: text('stripe_subscription_status'),
    stripeSubscriptionCurrentPeriodEnd: bigint(
      'stripe_subscription_current_period_end',
      { mode: 'number' },
    ),
    updatedAt: timestamp('updated_at', { mode: 'date' })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  },
  (table) => {
    return {
      stripeCustomerIdIdx: uniqueIndex('stripe_customer_id_idx').on(
        table.stripeCustomerId,
      ),
    };
  },
);

export const todoSchema = pgTable('todo', {
  id: serial('id').primaryKey(),
  ownerId: text('owner_id').notNull(),
  title: text('title').notNull(),
  message: text('message').notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
});

// Users table for Birebiro - tracking user credits and settings
export const userSchema = pgTable('users', {
  id: text('id').primaryKey(), // Clerk user ID
  artCredits: integer('art_credits').default(10).notNull(), // Sanat Hakkı - starting credits
  updatedAt: timestamp('updated_at', { mode: 'date' })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
});

// Product tables for Birebiro
export const productSchema = pgTable('product', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  name: text('name').notNull(),
  nameEn: text('name_en'),
  nameFr: text('name_fr'),
  description: text('description').notNull(),
  descriptionEn: text('description_en'),
  descriptionFr: text('description_fr'),
  isActive: boolean('is_active').default(true).notNull(),
  sortOrder: integer('sort_order').default(0).notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
});

export const productSizeSchema = pgTable('product_size', {
  id: serial('id').primaryKey(),
  productId: integer('product_id').notNull().references(() => productSchema.id, { onDelete: 'cascade' }),
  slug: varchar('slug', { length: 100 }).notNull(),
  name: text('name').notNull(),
  nameEn: text('name_en'),
  nameFr: text('name_fr'),
  dimensions: varchar('dimensions', { length: 50 }).notNull(),
  priceAmount: integer('price_amount').notNull(), // in cents (kuruş)
  sortOrder: integer('sort_order').default(0).notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
});

export const productFrameSchema = pgTable('product_frame', {
  id: serial('id').primaryKey(),
  productId: integer('product_id').notNull().references(() => productSchema.id, { onDelete: 'cascade' }),
  slug: varchar('slug', { length: 100 }).notNull(),
  name: text('name').notNull(),
  nameEn: text('name_en'),
  nameFr: text('name_fr'),
  priceAmount: integer('price_amount').notNull(), // in cents (kuruş)
  sortOrder: integer('sort_order').default(0).notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
});

// Generated images table for storing user-created designs
export const generatedImageSchema = pgTable('generated_image', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(), // Clerk user ID
  chatSessionId: varchar('chat_session_id', { length: 255 }).notNull(),
  generationId: varchar('generation_id', { length: 255 }).notNull().unique(), // From n8n API
  productId: integer('product_id').references(() => productSchema.id, { onDelete: 'set null' }),
  productSizeId: integer('product_size_id').references(() => productSizeSchema.id, { onDelete: 'set null' }),
  productFrameId: integer('product_frame_id').references(() => productFrameSchema.id, { onDelete: 'set null' }),
  textPrompt: text('text_prompt').notNull(), // User's original prompt
  improvedPrompt: text('improved_prompt'), // AI-improved prompt
  imageUrl: text('image_url').notNull(), // Generated image URL
  uploadedImageUrl: text('uploaded_image_url'), // User uploaded reference image
  userGenerationIntent: text('user_generation_intent'), // What user wants to create
  isGenerateMode: boolean('is_generate_mode').default(true).notNull(), // Generate vs inspiration mode
  creditUsed: integer('credit_used').default(1).notNull(), // Credits consumed
  isSelected: boolean('is_selected').default(false).notNull(), // Did user select this for purchase?
  updatedAt: timestamp('updated_at', { mode: 'date' })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
});

// Orders table for tracking customer purchases
export const orderSchema = pgTable('order', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(), // Clerk user ID
  generationId: varchar('generation_id', { length: 255 }).notNull(), // Generated image ID
  imageUrl: text('image_url'), // Görselin URL'i
  productId: integer('product_id').notNull().references(() => productSchema.id, { onDelete: 'restrict' }),
  productSizeId: integer('product_size_id').notNull().references(() => productSizeSchema.id, { onDelete: 'restrict' }),
  productFrameId: integer('product_frame_id').notNull().references(() => productFrameSchema.id, { onDelete: 'restrict' }),
  merchantOid: varchar('merchant_oid', { length: 64 }).notNull().unique(), // PayTR sipariş numarası
  paymentAmount: integer('payment_amount').notNull(), // Ödeme tutarı (kuruş cinsinden)
  totalAmount: integer('total_amount'), // Müşteriden tahsil edilen toplam tutar (taksit vs. ile değişebilir)
  currency: varchar('currency', { length: 10 }).default('TL').notNull(),
  paymentStatus: varchar('payment_status', { length: 20 }).default('pending').notNull(), // pending, success, failed
  paymentType: varchar('payment_type', { length: 20 }), // card, eft
  paytrToken: text('paytr_token'), // PayTR iframe token
  failedReasonCode: varchar('failed_reason_code', { length: 10 }), // Başarısız ödeme kodu
  failedReasonMsg: text('failed_reason_msg'), // Başarısız ödeme mesajı
  customerName: text('customer_name').notNull(),
  customerEmail: text('customer_email').notNull(),
  customerPhone: varchar('customer_phone', { length: 20 }).notNull(),
  customerAddress: text('customer_address').notNull(),
  shippingStatus: varchar('shipping_status', { length: 20 }).default('pending').notNull(), // pending, preparing, shipped, delivered
  trackingNumber: varchar('tracking_number', { length: 100 }),
  notes: text('notes'), // Admin notları
  paidAt: timestamp('paid_at', { mode: 'date' }),
  updatedAt: timestamp('updated_at', { mode: 'date' })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
});

// Art Credit Settings Schema
export const artCreditSettingsSchema = pgTable('art_credit_settings', {
  id: serial('id').primaryKey(),
  pricePerCredit: integer('price_per_credit').default(100).notNull(), // Kuruş cinsinden (100 kuruş = 1 TL)
  isActive: boolean('is_active').default(true).notNull(),
  minPurchase: integer('min_purchase').default(1).notNull(), // Minimum satın alma adedi
  maxPurchase: integer('max_purchase').default(1000).notNull(), // Maximum satın alma adedi
  updatedAt: timestamp('updated_at', { mode: 'date' })
    .defaultNow()
    .$onUpdate(() => new Date()),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
});
