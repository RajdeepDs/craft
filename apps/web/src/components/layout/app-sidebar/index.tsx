"use client";

import { Icon } from "@craft/ui/components/icon";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@craft/ui/components/sidebar";
import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { APP_SIDEBAR_ITEMS } from "@/config/app-sidebar";
import { WorkspaceSwitcher } from "./workspace-switcher";

export function AppSidebar() {
	const pathname = usePathname();

	return (
		<Sidebar className="border-none">
			<SidebarHeader className="mt-1.5 flex h-11 w-full items-center justify-between">
				<WorkspaceSwitcher />
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarMenu className="gap-px">
						{APP_SIDEBAR_ITEMS.map((item) => {
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
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}
