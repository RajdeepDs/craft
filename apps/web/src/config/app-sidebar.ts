import type { IconName } from "@craft/ui/components/icon";

export interface SidebarItem {
	href: string;
	icon: IconName;
	id: string;
	label: string;
}

export const APP_SIDEBAR_ITEMS: SidebarItem[] = [
	{
		id: "inbox",
		label: "Inbox",
		href: "/inbox",
		icon: "IconInboxEmpty",
	},
	{
		id: "my-changes",
		label: "My Changes",
		href: "/my-changes",
		icon: "IconPullRequest",
	},
];
