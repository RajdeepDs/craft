import type { IconName } from "@craft/ui/components/icon";

interface SidebarSection {
	collapsible?: boolean;
	id: string;
	items: SidebarItem[];
	label?: string;
}

interface SidebarItem {
	href: string;
	icon: IconName;
	id: string;
	label: string;
}

export const APP_SIDEBAR: SidebarSection[] = [
	{
		id: "core",
		items: [
			{
				id: "inbox",
				label: "Inbox",
				href: "/inbox",
				icon: "IconInboxEmpty",
			},
			{
				id: "changes",
				label: "Changes",
				href: "/changes",
				icon: "IconRandom",
			},
			{
				id: "review",
				label: "Review",
				href: "/review",
				icon: "IconArrowsRepeatRightLeft",
			},
		],
	},
	{
		collapsible: true,
		id: "setup",
		label: "Setup",
		items: [
			{
				id: "connect-github",
				label: "Connect GitHub",
				href: "/settings/integrations/github",
				icon: "IconGithub",
			},
			{
				id: "invite",
				label: "Invite people",
				href: "/settings/invite",
				icon: "IconPlusMedium",
			},
		],
	},
];
