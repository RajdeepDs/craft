import { Sidebar, SidebarHeader } from "@craft/ui/components/sidebar";
import { WorkspaceSwitcher } from "./workspace-switcher";

export function AppSidebar() {
	return (
		<Sidebar className="border-none">
			<SidebarHeader className="mt-1.5 flex h-11 w-full items-center justify-between">
				<WorkspaceSwitcher />
			</SidebarHeader>
		</Sidebar>
	);
}
