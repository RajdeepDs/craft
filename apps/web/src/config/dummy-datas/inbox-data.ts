type Inbox = {
  totalCount: number;
  sections: InboxSection[];
};

type InboxSection = {
  id: "needs_review" | "blocked" | "re_review";
  title: string;
  count: number;
  items: InboxItem[];
};

type InboxItem = {
  id: string;

  // What is this?
  title: string;
  changeId: string;

  // Who / context
  author: {
    name: string;
    avatar?: string;
  };

  repo: string;

  // Why is it here?
  action: "needs_review" | "blocked" | "re_review";

  // Urgency
  waitingSince: string;
  waitingHuman: string; // "2h", "1d"
  isOverdue: boolean;

  // Decision context
  risk: "low" | "medium" | "high";
  size: "small" | "medium" | "large";

  // Review context
  review: {
    blockers: number;
    comments: number;
    lastUpdatedAt: string;
  };

  // Diff summary (quick signal)
  diff: {
    filesChanged: number;
    additions: number;
    deletions: number;
  };

  // Status hint
  stateLabel: string; // "Needs review", "Blocked", etc.

  // Quick actions availability
  canQuickApprove: boolean;
};

export const mockInbox: Inbox = {
  "totalCount": 7,
  "sections": [
    {
      "id": "needs_review",
      "title": "Needs your review",
      "count": 3,
      "items": [
        {
          "id": "inbox-1",
          "changeId": "CH-142",
          "title": "Refactor Stripe webhook retry logic to prevent duplicates",
          "author": { "name": "Rahul" },
          "repo": "payments-service",
          "action": "needs_review",
          "waitingSince": "2026-04-23T08:10:00Z",
          "waitingHuman": "2h",
          "isOverdue": false,
          "risk": "medium",
          "size": "medium",
          "review": { "blockers": 0, "comments": 3, "lastUpdatedAt": "2026-04-23T08:20:00Z" },
          "diff": { "filesChanged": 6, "additions": 120, "deletions": 45 },
          "stateLabel": "Needs review",
          "canQuickApprove": true
        },
        {
          "id": "inbox-2",
          "changeId": "CH-139",
          "title": "Add rate limiting middleware for auth endpoints",
          "author": { "name": "Ankit" },
          "repo": "api-gateway",
          "action": "needs_review",
          "waitingSince": "2026-04-23T06:00:00Z",
          "waitingHuman": "4h",
          "isOverdue": true,
          "risk": "high",
          "size": "large",
          "review": { "blockers": 0, "comments": 5, "lastUpdatedAt": "2026-04-23T06:10:00Z" },
          "diff": { "filesChanged": 10, "additions": 240, "deletions": 30 },
          "stateLabel": "Needs review",
          "canQuickApprove": false
        },
        {
          "id": "inbox-3",
          "changeId": "CH-136",
          "title": "Migrate user preferences to new JSON schema",
          "author": { "name": "Sara" },
          "repo": "user-service",
          "action": "needs_review",
          "waitingSince": "2026-04-22T22:30:00Z",
          "waitingHuman": "12h",
          "isOverdue": true,
          "risk": "medium",
          "size": "large",
          "review": { "blockers": 1, "comments": 8, "lastUpdatedAt": "2026-04-22T23:00:00Z" },
          "diff": { "filesChanged": 15, "additions": 310, "deletions": 120 },
          "stateLabel": "Needs review",
          "canQuickApprove": false
        }
      ]
    },
    {
      "id": "blocked",
      "title": "Blocked by you",
      "count": 2,
      "items": [
        {
          "id": "inbox-4",
          "changeId": "CH-131",
          "title": "Update onboarding copy and CTA button hierarchy",
          "author": { "name": "Neha" },
          "repo": "web-app",
          "action": "blocked",
          "waitingSince": "2026-04-23T05:30:00Z",
          "waitingHuman": "5h",
          "isOverdue": true,
          "risk": "low",
          "size": "small",
          "review": { "blockers": 1, "comments": 2, "lastUpdatedAt": "2026-04-23T05:40:00Z" },
          "diff": { "filesChanged": 2, "additions": 18, "deletions": 10 },
          "stateLabel": "Blocked by you",
          "canQuickApprove": false
        },
        {
          "id": "inbox-5",
          "changeId": "CH-128",
          "title": "Fix pagination offset bug in dashboard list view",
          "author": { "name": "Aman" },
          "repo": "dashboard",
          "action": "blocked",
          "waitingSince": "2026-04-22T20:00:00Z",
          "waitingHuman": "14h",
          "isOverdue": true,
          "risk": "high",
          "size": "small",
          "review": { "blockers": 2, "comments": 4, "lastUpdatedAt": "2026-04-22T20:20:00Z" },
          "diff": { "filesChanged": 3, "additions": 12, "deletions": 8 },
          "stateLabel": "Blocked by you",
          "canQuickApprove": false
        }
      ]
    },
    {
      "id": "re_review",
      "title": "Needs re-review",
      "count": 2,
      "items": [
        {
          "id": "inbox-6",
          "changeId": "CH-125",
          "title": "Replace legacy feature flag system with LaunchDarkly SDK",
          "author": { "name": "Vikram" },
          "repo": "core-platform",
          "action": "re_review",
          "waitingSince": "2026-04-23T07:45:00Z",
          "waitingHuman": "3h",
          "isOverdue": false,
          "risk": "high",
          "size": "large",
          "review": { "blockers": 0, "comments": 6, "lastUpdatedAt": "2026-04-23T07:50:00Z" },
          "diff": { "filesChanged": 22, "additions": 500, "deletions": 200 },
          "stateLabel": "Needs re-review",
          "canQuickApprove": false
        },
        {
          "id": "inbox-7",
          "changeId": "CH-122",
          "title": "Refactor mobile navigation stack for performance",
          "author": { "name": "Priya" },
          "repo": "mobile-app",
          "action": "re_review",
          "waitingSince": "2026-04-23T04:15:00Z",
          "waitingHuman": "6h",
          "isOverdue": true,
          "risk": "medium",
          "size": "medium",
          "review": { "blockers": 0, "comments": 2, "lastUpdatedAt": "2026-04-23T04:30:00Z" },
          "diff": { "filesChanged": 8, "additions": 150, "deletions": 60 },
          "stateLabel": "Needs re-review",
          "canQuickApprove": true
        }
      ]
    }
  ]
}
