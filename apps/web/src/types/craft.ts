export type UserRole = "LEAD" | "REVIEWER" | "AUTHOR";

export type ChangeStatus =
	| "DRAFTING"
	| "READY"
	| "IN_REVIEW"
	| "REVISING"
	| "SHIPPED";

export type RiskLevel = "LOW" | "MEDIUM" | "HIGH";

export type CommentType = "BLOCKER" | "NIT" | "SUGGESTION";

export type VerdictType = "SHIP_IT" | "NEEDS_REREVIEW" | "REJECTED";

export interface User {
	avatar_url: string | null;
	created_at: string;
	email: string;
	id: string;
	initials: string;
	name: string;
	role: UserRole;
}

export interface VerifyItem {
	checked: boolean;
	id: string;
	text: string;
}

export interface Brief {
	how_to_verify: VerifyItem[];
	risk_notes: string | null;
	what_changed: string;
	why: string;
}

export interface Comment {
	author_id: string;
	body: string;
	created_at: string;
	id: string;
	line_reference: string | null;
	resolved: boolean;
	resolved_at: string | null;
	resolved_by: string | null;
	type: CommentType;
}

export interface Verdict {
	note: string | null;
	submitted_at: string;
	submitted_by: string;
	type: VerdictType;
}

export interface Change {
	affected_areas: string[];
	author_id: string;
	brief: Brief;
	comments: Comment[];
	created_at: string;
	first_review_at: string | null;
	github_pr_url: string | null;
	id: string;
	identifier: string;
	linked_issue_url: string | null;
	ready_at: string | null;
	resolved_at: string | null;
	reviewer_ids: string[];
	risk_level: RiskLevel;
	shipped_at: string | null;
	status: ChangeStatus;
	title: string;
	verdict: Verdict | null;
}
