-- Initial Fabrico Template Schema
-- User table for storing user information
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text,
	`name` text,
	`avatar_url` text,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` text DEFAULT (CURRENT_TIMESTAMP),
	`sync_status` text DEFAULT 'local',
	`last_synced_at` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);
--> statement-breakpoint

-- Database configuration table for dual-mode support
CREATE TABLE `db_config` (
	`key` text PRIMARY KEY NOT NULL,
	`value` text NOT NULL,
	`updated_at` text DEFAULT (CURRENT_TIMESTAMP)
);
--> statement-breakpoint

-- Insert default configuration
INSERT INTO `db_config` (`key`, `value`) VALUES ('db_mode', 'local');
