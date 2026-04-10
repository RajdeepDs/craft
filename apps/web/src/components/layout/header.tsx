"use client";

import { Button } from "@craft/ui/components/button";
import type { Route } from "next";
import Link from "next/link";
import { WordMark } from "../ui/word-mark";
import UserMenu from "../user-menu";

const links = [
	{ to: "/changelog", label: "Changelog" },
	{ to: "/contact", label: "Contact" },
] as const;

export default function Header() {
	return (
		<header className="sticky inset-x-0 top-0 z-50 h-(--header-height) items-stretch border-border/50 border-b bg-gray-1/80 backdrop-blur-2xl supports-backdrop-filter:bg-gray-1/60">
			<div className="mx-auto flex h-(--header-height) w-full items-center py-3">
				<div className="mx-auto flex w-full items-center justify-between px-6 sm:max-w-7xl">
					<div className="flex flex-1 items-center justify-start">
						<Link href={"/"}>
							<WordMark height={18} width={"auto"} />
						</Link>
					</div>
					<nav className="hidden flex-1 justify-center gap-4 text-[13px]">
						{links.map(({ to, label }) => {
							return (
								<Link
									className="group relative text-muted-foreground transition-colors duration-150 ease-out hover:text-foreground"
									href={to as Route}
									key={to}
								>
									<span className="relative">
										{label}
										<span className="absolute -bottom-0.5 left-0 h-px w-0 bg-foreground transition-[width] duration-200 ease-out group-hover:w-full" />
									</span>
								</Link>
							);
						})}
					</nav>
					<div className="flex flex-1 items-center justify-end gap-2">
						<UserMenu />
						<Button size={"lg"} variant={"secondary"}>
							<span>Join waitlist</span>
						</Button>
					</div>
				</div>
			</div>
		</header>
	);
}
