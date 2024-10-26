import { integer, text, pgTable, timestamp, serial } from "drizzle-orm/pg-core";
export const secrets = pgTable("secrets", {
  id: integer("id").primaryKey(),
  blizzard_access_token: text("text").notNull(),
  created_at: timestamp("created_at"),
  updated_at: timestamp("updated_at"),
});

export const forum_posts = pgTable("forum_posts", {
  id: serial("id").primaryKey(),
  user: text("user"),
  title: text("title"),
  content: text("content"),
  replies: integer("replies"),
  created_at: timestamp("created_at"),
});
