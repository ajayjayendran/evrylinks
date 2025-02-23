import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { users } from "./user";

export const bookmarks = pgTable("bookmarks", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  url: varchar("url", { length: 2083 }).notNull(),
  meta_title: varchar("meta_title", { length: 120 }).notNull(),
  tag: varchar("tag", { length: 255 }).notNull(),
  meta_description: varchar("meta_description", { length: 300 }).notNull(),
  meta_image: varchar("meta_image", { length: 255 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  note: text("note"),
  createdAt: timestamp("created_at").defaultNow(),
});
