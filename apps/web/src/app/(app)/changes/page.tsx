import type { Metadata } from "next";
import { ChangesList } from "@/components/changes/changes-list";

export const metadata: Metadata = {
	title: "Changes",
	description: "Review and track all changes in your workspace.",
};

export default function ChangesPage() {
	return <ChangesList />;
}
