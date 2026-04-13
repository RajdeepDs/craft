import { SidebarProvider } from "@craft/ui/components/sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
	return <SidebarProvider>{children}</SidebarProvider>;
}
