"use client";

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@craft/ui/components/collapsible";
import { CollapseDownIcon, Icon } from "@craft/ui/components/icon";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@craft/ui/components/sidebar";
import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { APP_SIDEBAR } from "@/config/app-sidebar";
import { WorkspaceSwitcher } from "./workspace-switcher";

export function AppSidebar() {
	const pathname = usePathname();
	const [openSections, setOpenSections] = React.useState<
		Record<string, boolean>
	>(() =>
		Object.fromEntries(
			APP_SIDEBAR.map((section) => [section.id, !section.collapsible])
		)
	);

	return (
		<Sidebar className="border-none">
			<SidebarHeader className="mt-1.5 flex h-11 w-full items-center justify-between">
				<WorkspaceSwitcher />
			</SidebarHeader>
			<SidebarContent>
				{APP_SIDEBAR.map((section) => (
					<SidebarGroup key={section.id}>
						<Collapsible
							onOpenChange={(open) => {
								if (!section.collapsible) {
									return;
								}

								setOpenSections((currentSections) => ({
									...currentSections,
									[section.id]: open,
								}));
							}}
							open={section.collapsible ? openSections[section.id] : true}
						>
							{section.label ? (
								<SidebarGroupLabel
									render={
										section.collapsible ? (
											<CollapsibleTrigger className="w-full gap-1 hover:bg-surface-item-hover hover:text-surface-item-foreground-active">
												<span>{section.label}</span>
												<CollapseDownIcon
													className={`transition-transform duration-200 ${
														openSections[section.id] ? "" : "-rotate-90"
													}`}
												/>
											</CollapsibleTrigger>
										) : undefined
									}
								>
									{section.collapsible ? undefined : section.label}
								</SidebarGroupLabel>
							) : null}
							<CollapsibleContent>
								<SidebarMenu className="gap-px">
									{section.items.map((item) => {
										const isActive = pathname === item.href;
										return (
											<SidebarMenuItem key={item.id}>
												<SidebarMenuButton
													className="pl-2"
													isActive={isActive}
													render={
														<Link href={item.href as Route}>
															<Icon
																name={item.icon}
																variant={isActive ? "filled" : "outline"}
															/>
															{item.label}
														</Link>
													}
												/>
											</SidebarMenuItem>
										);
									})}
								</SidebarMenu>
							</CollapsibleContent>
						</Collapsible>
					</SidebarGroup>
				))}
			</SidebarContent>
		</Sidebar>
	);
}
