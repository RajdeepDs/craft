"use client";

import { useSidebar } from "@craft/ui/components/sidebar";
import { cn } from "@craft/ui/lib/utils";

interface SidebarLayoutProps {
	readonly children: React.ReactNode;
}

export function SidebarLayout({ children }: SidebarLayoutProps) {
	const { isMobile } = useSidebar();
	return (
		<div
			className={cn(
				"flex h-screen w-full flex-col overflow-hidden py-1.5 pr-1.5",
				{
					"py-0 pr-0": isMobile,
				}
			)}
		>
			<div
				className={cn(
					"flex h-full min-h-0 flex-1 flex-col overflow-hidden bg-page",
					!isMobile && "cft-border-shadow ml-px rounded-lg"
				)}
			>
				{children}
			</div>
		</div>
	);
}
