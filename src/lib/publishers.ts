/**
 * Build-time publisher queries for the Tailspin Toys catalog.
 *
 * This helper reads the local SQLite database and returns the publisher summary
 * data needed by Astro pages and components during static generation.
 */
import { asc } from 'drizzle-orm';
import type { Database } from './db';
import { publishers } from '../../db/schema';
import type { Publisher } from '../types/game';

/**
 * Return all publishers in the catalog with their id and name values.
 *
 * @param db - The Drizzle database client used to query the publishers table.
 * @returns A list of publisher summaries ordered alphabetically by name.
 */
export async function getAllPublishers(db: Database): Promise<Publisher[]> {
    const rows = await db
        .select({
            id: publishers.id,
            name: publishers.name,
        })
        .from(publishers)
        .orderBy(asc(publishers.name));

    return rows.map((row) => ({
        id: row.id,
        name: row.name,
    }));
}
