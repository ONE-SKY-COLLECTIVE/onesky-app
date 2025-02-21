import { relations, sql } from "drizzle-orm";
import { pgTable, primaryKey } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const Post = pgTable("post", (t) => ({
  id: t.uuid().notNull().primaryKey().defaultRandom(),
  title: t.varchar({ length: 256 }).notNull(),
  content: t.text().notNull(),
  createdAt: t.timestamp().defaultNow().notNull(),
  updatedAt: t
    .timestamp({ mode: "date", withTimezone: true })
    .$onUpdateFn(() => sql`now()`),
}));

export const CreatePostSchema = createInsertSchema(Post, {
  title: z.string().max(256),
  content: z.string().max(256),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});


export const User = pgTable("user", (t) => ({
  id: t.uuid().notNull().primaryKey().defaultRandom(),
  name: t.varchar({ length: 255 }),
  email: t.varchar({ length: 255 }).notNull(),
  emailVerified: t.timestamp({ mode: "date", withTimezone: true }),
  image: t.varchar({ length: 255 }),
  
}));

export const Activity = pgTable("activity", (t) => ({
  id: t.uuid().notNull().primaryKey().defaultRandom(),
  userId: t.uuid().notNull().references(() => User.id, {onDelete: "cascade"}),
  date: t.timestamp({mode: "date", withTimezone: true}).notNull(),
  type: t.varchar({ length: 255 }).notNull(),
  limitPerDay: t.integer().notNull(),
}));

export const CreateActivitySchema = createInsertSchema(Activity, {
  userId: z.string(),
  date: z.string(),
  type: z.string(),
  limitPerDay: z.number(),
}).omit({
  id: true,
});

export type CreateActivityType = z.infer<typeof CreateActivitySchema>;

export const RefillWaterContainer = pgTable("refill_water_container", (t) => ({  
  id: t.uuid().notNull().primaryKey().defaultRandom(),
  proofUrl: t.varchar({ length: 255 }).notNull(),
  activityId: t.uuid().notNull().references(() => Activity.id, {onDelete: "cascade"}),

}))

export const CreateRefillWaterContainerSchema = createInsertSchema(RefillWaterContainer, {
  proofUrl: z.string(),
  activityId: z.string(),
}).omit({
  id: true,
});


export const UserRelations = relations(User, ({ many }) => ({
  accounts: many(Account),
}));

export const activitiesRelations = relations(Activity, ({one}) => ({   
  RefillWaterContainer: one(RefillWaterContainer, {
    fields: [Activity.id],
    references: [RefillWaterContainer.activityId]
  }),
}));

export const Account = pgTable(
  "account",
  (t) => ({
    userId: t
      .uuid()
      .notNull()
      .references(() => User.id, { onDelete: "cascade" }),
    type: t
      .varchar({ length: 255 })
      .$type<"email" | "oauth" | "oidc" | "webauthn">()
      .notNull(),
    provider: t.varchar({ length: 255 }).notNull(),
    providerAccountId: t.varchar({ length: 255 }).notNull(),
    refresh_token: t.varchar({ length: 255 }),
    access_token: t.text(),
    expires_at: t.integer(),
    token_type: t.varchar({ length: 255 }),
    scope: t.varchar({ length: 255 }),
    id_token: t.text(),
    session_state: t.varchar({ length: 255 }),
  }),
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
);

export const AccountRelations = relations(Account, ({ one }) => ({
  user: one(User, { fields: [Account.userId], references: [User.id] }),
}));

export const Session = pgTable("session", (t) => ({
  sessionToken: t.varchar({ length: 255 }).notNull().primaryKey(),
  userId: t
    .uuid()
    .notNull()
    .references(() => User.id, { onDelete: "cascade" }),
  expires: t.timestamp({ mode: "date", withTimezone: true }).notNull(),
}));

export const SessionRelations = relations(Session, ({ one }) => ({
  user: one(User, { fields: [Session.userId], references: [User.id] }),
}));
