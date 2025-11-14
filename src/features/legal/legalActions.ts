'use server';

import { and, eq } from 'drizzle-orm';

import { db } from '@/libs/DB';
import { legalDocumentSchema } from '@/models/Schema';

export type LegalDocument = typeof legalDocumentSchema.$inferSelect;
export type LegalDocumentListItem = Pick<LegalDocument, 'id' | 'slug' | 'title' | 'sortOrder'>;

/**
 * Get all active legal documents by language
 */
export async function getLegalDocuments(language: string = 'tr') {
  try {
    const documents = await db
      .select()
      .from(legalDocumentSchema)
      .where(
        and(
          eq(legalDocumentSchema.language, language),
          eq(legalDocumentSchema.isActive, true),
        ),
      )
      .orderBy(legalDocumentSchema.sortOrder);

    return documents;
  } catch (error) {
    console.error('Error fetching legal documents:', error);
    return [];
  }
}

/**
 * Get a single legal document by slug and language
 */
export async function getLegalDocumentBySlug(slug: string, language: string = 'tr') {
  try {
    const [document] = await db
      .select()
      .from(legalDocumentSchema)
      .where(
        and(
          eq(legalDocumentSchema.slug, slug),
          eq(legalDocumentSchema.language, language),
        ),
      )
      .limit(1);

    return document || null;
  } catch (error) {
    console.error('Error fetching legal document:', error);
    return null;
  }
}

/**
 * Get all active legal documents (for navigation/footer)
 */
export async function getActiveLegalDocuments(language: string = 'tr') {
  try {
    const documents = await db
      .select({
        id: legalDocumentSchema.id,
        slug: legalDocumentSchema.slug,
        title: legalDocumentSchema.title,
        sortOrder: legalDocumentSchema.sortOrder,
      })
      .from(legalDocumentSchema)
      .where(
        and(
          eq(legalDocumentSchema.language, language),
          eq(legalDocumentSchema.isActive, true),
        ),
      )
      .orderBy(legalDocumentSchema.sortOrder);

    return documents;
  } catch (error) {
    console.error('Error fetching active legal documents:', error);
    return [];
  }
}
