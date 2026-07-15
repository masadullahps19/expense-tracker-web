CREATE TABLE "categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now(),
	"deleted_at" timestamp,
	"name" text NOT NULL,
	"user_id" text NOT NULL,
	CONSTRAINT "unique_user_category" UNIQUE("name","user_id")
);
