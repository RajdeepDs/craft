import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@craft/ui/components/resizable";
import type { Metadata } from "next";
import { InboxList } from "@/components/inbox/inbox-list";

export const metadata: Metadata = {
	title: "Inbox",
	description: "View your inbox messages and notifications.",
};

export default function InboxPage() {
	return (
		<ResizablePanelGroup orientation="horizontal">
			<ResizablePanel defaultSize="25%">
				<InboxList />
			</ResizablePanel>
			<ResizableHandle />
			<ResizablePanel defaultSize="75%">
				{/* inbox change item detail view */}
			</ResizablePanel>
		</ResizablePanelGroup>
	);
}
