import { pgTable, text, timestamp} from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
    id: text().primaryKey(),
    name: text().notNull(),
    email: text().notNull(),
    createdAt: timestamp('created_at').defaultNow(),
})