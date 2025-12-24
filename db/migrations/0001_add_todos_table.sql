-- Add todos table for todo app functionality
CREATE TABLE `todos` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`completed` integer DEFAULT false NOT NULL,
	`priority` text DEFAULT 'medium',
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` text DEFAULT (CURRENT_TIMESTAMP),
	`sync_status` text DEFAULT 'local',
	`last_synced_at` text
);
