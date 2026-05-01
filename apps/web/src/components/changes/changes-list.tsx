"use client";

import { Button } from "@craft/ui/components/button";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@craft/ui/components/collapsible";
import type { IconName } from "@craft/ui/components/icon";
import { Icon } from "@craft/ui/components/icon";
import { Kbd } from "@craft/ui/components/kbd";
import { cn } from "@craft/ui/lib/utils";
import { motion } from "motion/react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { ScrollableContainer } from "@/components/layout/scrollable-container";
import { mockChanges, mockUsers } from "@/config/dummy-datas/changes-data";
import type { Change, ChangeStatus } from "@/types/craft";
import type { ReviewerData } from "./change-item";
import { ChangeItem } from "./change-item";

const GROUP_LABELS: Record<ChangeStatus, string> = {
	IN_REVIEW: "In Review",
	REVISING: "Needs Changes",
	READY: "Ready to Ship",
	DRAFTING: "Drafting",
	SHIPPED: "Shipped",
};

const ICON_MAP: Record<string, IconName> = {
	"Ready to Ship": "IconPush",
	"Needs Changes": "IconExclamationTriangle",
	Shipped: "IconCheckCircle2",
};

const COLOR_MAP: Record<string, string> = {
	"Ready to Ship": "text-emerald-500",
	"Needs Changes": "text-amber-500",
	Shipped: "text-indigo-500",
};

const GRADIENT_LIGHT_MAP: Record<string, string> = {
	"Ready to Ship":
		"linear-gradient(90deg, lch(96.024 3.659 136.2) 0%, lch(95.94 0.5 282) 100%)",
	"Needs Changes":
		"linear-gradient(90deg, lch(96.024 0.825 69.481) 0%, lch(95.94 0.5 282) 100%)",
	Shipped:
		"linear-gradient(90deg, lch(96.024 3.659 282.977) 0%, lch(95.94 0.5 282) 100%)",
};

const GRADIENT_DARK_MAP: Record<string, string> = {
	"Ready to Ship":
		"linear-gradient(90deg, lch(9.38 3.59 140) 0%, lch(7.67 0.75 272) 100%)",
	"Needs Changes":
		"linear-gradient(90deg, lch(9.38 1.88 78.116) 0%, lch(7.67 0.75 272) 100%)",
	Shipped:
		"linear-gradient(90deg, lch(9.38 6.126 283.311) 0%, lch(7.67 0.75 272) 100%)",
};

const DEFAULT_LIGHT_GRADIENT =
	"linear-gradient(90deg, lch(95.94 0.5 282) 0%, lch(95.94 0.5 282) 100%)";
const DEFAULT_DARK_GRADIENT =
	"linear-gradient(90deg, lch(9.38 0.805 269.936) 0%, lch(7.67 0.75 272) 100%)";
const DEFAULT_ICON = "IconSpeedDots" as IconName;
const DEFAULT_COLOR = "text-gray-11";

const STATUS_ORDER: ChangeStatus[] = [
	"IN_REVIEW",
	"REVISING",
	"READY",
	"DRAFTING",
	"SHIPPED",
];

const usersById = Object.fromEntries(mockUsers.map((u) => [u.id, u]));

function getReviewerRingColor(
	change: Change,
	reviewerId: string
): ReviewerData["ringColor"] {
	if (change.verdict?.submitted_by === reviewerId) {
		if (change.verdict.type === "SHIP_IT") {
			return "green";
		}
		if (change.verdict.type === "NEEDS_REREVIEW") {
			return "yellow";
		}
		if (change.verdict.type === "REJECTED") {
			return "red";
		}
	}
	const hasUnresolvedBlocker = change.comments.some(
		(c) => c.author_id === reviewerId && c.type === "BLOCKER" && !c.resolved
	);
	if (hasUnresolvedBlocker) {
		return "red";
	}
	return "neutral";
}

export function ChangesList() {
	const { resolvedTheme } = useTheme();
	const isDark = resolvedTheme === "dark";

	const [openGroups, setOpenGroups] = useState<Set<ChangeStatus>>(
		new Set<ChangeStatus>(["IN_REVIEW", "REVISING", "READY", "DRAFTING"])
	);

	function toggleGroup(status: ChangeStatus) {
		setOpenGroups((prev) => {
			const next = new Set(prev);
			if (next.has(status)) {
				next.delete(status);
			} else {
				next.add(status);
			}
			return next;
		});
	}

	const grouped = Object.fromEntries(
		STATUS_ORDER.map((status) => [
			status,
			mockChanges.filter((c) => c.status === status),
		])
	) as Record<ChangeStatus, typeof mockChanges>;

	return (
		<div className="flex h-full flex-col">
			<PageHeader title="Changes" />
			<ScrollableContainer>
				<div className="flex flex-col gap-0.5 p-2">
					{STATUS_ORDER.map((status, groupIndex) => {
						const items = grouped[status];
						if (items.length === 0) {
							return null;
						}
						const isOpen = openGroups.has(status);
						const label = GROUP_LABELS[status];
						const iconName = ICON_MAP[label] ?? DEFAULT_ICON;
						const iconColor = COLOR_MAP[label] ?? DEFAULT_COLOR;
						const gradientMap = isDark ? GRADIENT_DARK_MAP : GRADIENT_LIGHT_MAP;
						const defaultGradient = isDark
							? DEFAULT_DARK_GRADIENT
							: DEFAULT_LIGHT_GRADIENT;
						const gradient = gradientMap[label] ?? defaultGradient;

						return (
							<motion.div
								animate={{ opacity: 1, y: 0 }}
								initial={{ opacity: 0, y: 3 }}
								key={status}
								transition={{
									delay: groupIndex * 0.05,
									duration: 0.18,
									ease: [0.23, 1, 0.32, 1],
								}}
							>
								<Collapsible
									onOpenChange={() => toggleGroup(status)}
									open={isOpen}
								>
									<CollapsibleTrigger
										className="queue-group-trigger relative flex w-full items-center gap-3 overflow-hidden rounded-md px-2 py-1.5"
										nativeButton={false}
										render={
											<div className="relative z-10">
												<Button
													className={cn(
														"queue-group-chevron group",
														isOpen ? "" : "-rotate-90"
													)}
													size={"icon-sm"}
													variant={"tertiary"}
												>
													<Icon
														className="queue-group-icon text-gray-11 group-hover:text-gray-12"
														name="IconChevronTriangleDownSmall"
														variant="filled"
													/>
												</Button>
												<div className="flex items-center gap-3">
													<Icon
														className={cn(
															"queue-group-icon transition-colors duration-200",
															iconColor
														)}
														name={iconName}
														variant="filled"
													/>
													<span className="select-none font-medium text-label text-secondary-foreground uppercase tracking-wider">
														{label}
													</span>
													<Kbd className="text-label text-secondary-foreground">
														{items.length}
													</Kbd>
												</div>
											</div>
										}
										style={{ background: gradient }}
									/>
									<CollapsibleContent>
										<div className="mt-0.5 flex flex-col gap-px">
											{items.map((change, i) => {
												const reviewers: ReviewerData[] =
													change.reviewer_ids.map((rid) => ({
														initials: usersById[rid]?.initials ?? "??",
														ringColor: getReviewerRingColor(change, rid),
													}));
												return (
													<motion.div
														animate={{ opacity: 1 }}
														initial={{ opacity: 0 }}
														key={change.id}
														transition={{
															delay: groupIndex * 0.05 + i * 0.03,
															duration: 0.12,
														}}
													>
														<ChangeItem change={change} reviewers={reviewers} />
													</motion.div>
												);
											})}
										</div>
									</CollapsibleContent>
								</Collapsible>
							</motion.div>
						);
					})}
				</div>
			</ScrollableContainer>
		</div>
	);
}
