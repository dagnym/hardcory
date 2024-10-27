import { timeStamp } from "console";
import { integer, text, pgTable, timestamp, serial } from "drizzle-orm/pg-core";
export const secrets = pgTable("secrets", {
  id: integer("id").primaryKey(),
  blizzard_access_token: text("text").notNull(),
  created_at: timestamp("created_at"),
  updated_at: timestamp("updated_at"),
});

export const forum_posts = pgTable("forum_posts", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").references(() => users.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
  title: text("title"),
  content: text("content"),
  replies: integer("replies"),
  created_at: timestamp("created_at"),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  battlenet_id: text("battlenet_id").notNull(),
  character: text("character"),
  username: text("username"),
  profilepicture: text("profilepicture"),
  created_at: timestamp("created_at"),
});

export const forum_replies = pgTable("forum_replies", {
  id: serial("id").primaryKey(),
  post_id: integer("post_id"),
  user_id: integer("user_id").references(() => users.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),

  reply_content: text("reply_content"),
  created_at: timestamp("created_at"),
  updated_at: timestamp("updated_at"),
});
