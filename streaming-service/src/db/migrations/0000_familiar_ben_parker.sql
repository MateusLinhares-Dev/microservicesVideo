CREATE TABLE "streaming" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"content_id" text NOT NULL,
	"started_at" timestamp NOT NULL,
	"ended_at" timestamp,
	"is_live" boolean DEFAULT false NOT NULL,
	"device" text,
	"quality" text,
	"duration_watched" integer DEFAULT 0
);
