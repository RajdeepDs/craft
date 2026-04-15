import { SidebarProvider } from "@craft/ui/components/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarLayout } from "@/components/layout/app-sidebar/sidebar-layout";

export default function AppLayout({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarLayout>{children}</SidebarLayout>
		</SidebarProvider>
	);
}
