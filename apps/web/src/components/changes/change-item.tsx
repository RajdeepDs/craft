"use client";

import { Checkbox } from "@craft/ui/components/checkbox";
import { cn } from "@craft/ui/lib/utils";
import type { Route } from "next";
import Link from "next/link";
import { useState } from "react";
import type { Change } from "@/types/craft";

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

export interface ReviewerData {
	initials: string;
	ringColor: "green" | "yellow" | "red" | "neutral";
}

interface ChangeItemProps {
	change: Change;
	reviewers: ReviewerData[];
}

const ringColorClass: Record<ReviewerData["ringColor"], string> = {
	green: "border-positive-foreground",
	yellow: "border-warning-foreground",
	red: "border-danger-foreground",
	neutral: "border-border",
};

export function ChangeItem({ change, reviewers }: ChangeItemProps) {
	const [checked, setChecked] = useState(false);

	return (
		<div className="group flex w-full cursor-default select-none items-center gap-4 rounded-md px-3.5 py-3 transition-colors duration-100 hover:bg-surface-item-hover">
			<Checkbox
				checked={checked}
				className={cn(
					"transition-opacity",
					checked ? "opacity-100" : "opacity-0 group-hover:opacity-100"
				)}
				onCheckedChange={(val) => setChecked(val === true)}
				onClick={(e) => e.stopPropagation()}
			/>
			<Link
				className="flex flex-1 items-center gap-4.5"
				href={`change/${change.identifier}` as Route}
			>
				<div className="min-w-16 shrink-0">
					<p className="select-none text-caption text-secondary-foreground">
						{change.identifier}
					</p>
				</div>
				<div className="max-w-72 flex-1">
					<p className="select-none truncate font-medium text-caption text-foreground">
						{change.title}
					</p>
				</div>
				<div className="min-w-0 flex-1">
					<p className="select-none truncate text-caption text-secondary-foreground">
						{change.brief.what_changed}
					</p>
				</div>
				<div className="flex shrink-0 items-center gap-3">
					<div className="flex shrink-0 items-center gap-3">
						{reviewers.length > 0 && (
							<div className="flex -space-x-1.5">
								{reviewers.slice(0, 3).map((reviewer) => (
									<div
										className={cn(
											"flex size-6 items-center justify-center rounded-full border-2 bg-standout font-medium text-[10px] text-standout-foreground",
											ringColorClass[reviewer.ringColor]
										)}
										key={reviewer.initials}
									>
										{reviewer.initials}
									</div>
								))}
							</div>
						)}
					</div>
					<p className="min-w-8 select-none whitespace-nowrap text-right text-label text-secondary-foreground">
						{relativeTime(change.created_at)}
					</p>
				</div>
			</Link>
		</div>
	);
}
