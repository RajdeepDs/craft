import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@craft/ui/components/resizable";
import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = {
	title: "Inbox",
	description: "View your inbox messages and notifications.",
};

export default function InboxPage() {
	return (
		<ResizablePanelGroup orientation="horizontal">
			<ResizablePanel defaultSize="20%">
				<PageHeader title="Inbox" />
			</ResizablePanel>
			<ResizableHandle />
			<ResizablePanel defaultSize="65%">Right</ResizablePanel>
		</ResizablePanelGroup>
	);
}
