interface SidebarSection {
	id: string;
	items: SidebarItem[];
	label?: string;
}

interface SidebarItem {
	href: string;
	icon: string;
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
				icon: "IconArrow",
			},
		],
	},
	{
		id: "try",
		label: "Try",
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
