import path from 'node:path';

import { PGlite } from '@electric-sql/pglite';
import { drizzle as drizzlePg } from 'drizzle-orm/node-postgres';
import { migrate as migratePg } from 'drizzle-orm/node-postgres/migrator';
import { drizzle as drizzlePglite, type PgliteDatabase } from 'drizzle-orm/pglite';
import { migrate as migratePglite } from 'drizzle-orm/pglite/migrator';
import { PHASE_PRODUCTION_BUILD } from 'next/dist/shared/lib/constants';
import { Client } from 'pg';

import * as schema from '@/models/Schema';

let client;
let drizzle;

// Need a database for production? Check out https://www.prisma.io/?via=saasboilerplatesrc
// Tested and compatible with Next.js Boilerplate
if (process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD) {
  // During build time, don't connect to database at all
  // This prevents build-time database queries
  drizzle = null as any;
} else if (process.env.DATABASE_URL) {
  // Production/Development with real PostgreSQL
  console.log('🔌 Connecting to PostgreSQL database...');
  client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  await client.connect();
  console.log('✅ Connected to PostgreSQL');

  drizzle = drizzlePg(client, { schema });
  console.log('🚀 Running migrations...');
  await migratePg(drizzle, {
    migrationsFolder: path.join(process.cwd(), 'migrations'),
  });
  console.log('✅ Migrations completed');
} else {
  // Local development with PGlite (in-memory database)
  console.log('⚠️  No DATABASE_URL found, using PGlite in-memory database');
  // Stores the db connection in the global scope to prevent multiple instances due to hot reloading with Next.js
  const global = globalThis as unknown as { client: PGlite; drizzle: PgliteDatabase<typeof schema> };

  if (!global.client) {
    global.client = new PGlite();
    await global.client.waitReady;

    global.drizzle = drizzlePglite(global.client, { schema });
  }

  drizzle = global.drizzle;
  await migratePglite(global.drizzle, {
    migrationsFolder: path.join(process.cwd(), 'migrations'),
  });
}

export const db = drizzle;
