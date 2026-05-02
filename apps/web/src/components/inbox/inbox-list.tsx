"use client";

import { ScrollableContainer } from "@/components/layout/scrollable-container";
import { PageHeader } from "@/components/layout/page-header";
import { mockInbox } from "@/config/dummy-datas/inbox-data";
import { motion } from "motion/react";
import { useState } from "react";
import { InboxItemCard } from "./inbox-item";

export function InboxList() {
	const items = mockInbox.sections.flatMap((s) => s.items);
	const firstId = items[0]?.id;
	const [selectedId, setSelectedId] = useState<string | undefined>(firstId);
	const [readIds, setReadIds] = useState<Set<string>>(
		new Set(firstId ? [firstId] : [])
	);

	function handleSelect(id: string) {
		setSelectedId(id);
		setReadIds((prev) => new Set(prev).add(id));
	}

	return (
		<div className="flex h-full flex-col">
			<PageHeader title={"Inbox"} />
			<ScrollableContainer>
				<div className="flex flex-col gap-px pl-2 mt-2">
					{items.map((item, index) => (
						<motion.div
							animate={{ opacity: 1, y: 0 }}
							initial={{ opacity: 0, y: 4 }}
							key={item.id}
							transition={{
								delay: index * 0.04,
								duration: 0.2,
								ease: [0.23, 1, 0.32, 1],
							}}
						>
							<InboxItemCard
								isRead={readIds.has(item.id)}
								isSelected={selectedId === item.id}
								item={item}
								onSelect={handleSelect}
							/>
						</motion.div>
					))}
				</div>
			</ScrollableContainer>
		</div>
	);
}
