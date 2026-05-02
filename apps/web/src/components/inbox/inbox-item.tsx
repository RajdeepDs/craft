"use client";

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@craft/ui/components/avatar";
import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemMedia,
	ItemTitle,
} from "@craft/ui/components/item";
import { cn } from "@craft/ui/lib/utils";

interface InboxItem {
	action: "needs_review" | "blocked" | "re_review";
	author: { name: string; avatar?: string };
	id: string;
	title: string;
	waitingSince: string;
}

const actionLabel: Record<InboxItem["action"], string> = {
	needs_review: "assigned you",
	blocked: "is waiting on you",
	re_review: "requested re-review",
};

function getInitials(name: string) {
	return name
		.split(" ")
		.map((n) => n[0])
		.join("")
		.toUpperCase()
		.slice(0, 2);
}

function relativeTime(iso: string): string {
	const diffMs = Date.now() - new Date(iso).getTime();
	const mins = Math.floor(diffMs / 60_000);
	if (mins < 60) {
		return `${mins}m`;
	}
	const hrs = Math.floor(mins / 60);
	if (hrs < 24) {
		return `${hrs}h`;
	}
	return `${Math.floor(hrs / 24)}d`;
}

interface InboxItemCardProps {
	isRead?: boolean;
	isSelected?: boolean;
	item: InboxItem;
	onSelect?: (id: string) => void;
}

export function InboxItemCard({
	item,
	isSelected,
	isRead,
	onSelect,
}: InboxItemCardProps) {
	return (
		<Item
			className="cursor-default transition-[transform,background-color] duration-150 hover:bg-surface-item-hover data-[selected=true]:bg-surface-item-active"
			data-selected={isSelected}
			onClick={() => onSelect?.(item.id)}
			variant="default"
		>
			<ItemMedia>
				<Avatar className="size-8">
					{item.author.avatar && <AvatarImage src={item.author.avatar} />}
					<AvatarFallback>{getInitials(item.author.name)}</AvatarFallback>
				</Avatar>
			</ItemMedia>
			<ItemContent className="min-w-0 gap-0">
				<ItemTitle className="w-full items-center">
					{!isRead && (
						<span className="size-1.5 shrink-0 rounded-full bg-(--indigo-a10)" />
					)}
					<span
						className={cn(
							"truncate",
							isSelected
								? "text-primary-foreground"
								: isRead && "text-secondary-foreground"
						)}
					>
						{item.title}
					</span>
				</ItemTitle>
				<ItemDescription className="text-caption text-secondary-foreground">
					{item.author.name} {actionLabel[item.action]}
				</ItemDescription>
			</ItemContent>
			<ItemActions className="self-end">
				<span className="text-caption text-secondary-foreground tabular-nums">
					{relativeTime(item.waitingSince)}
				</span>
			</ItemActions>
		</Item>
	);
}
