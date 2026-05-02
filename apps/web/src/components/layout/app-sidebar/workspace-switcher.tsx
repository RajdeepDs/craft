"use client";

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@craft/ui/components/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLinkItem,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@craft/ui/components/dropdown-menu";
import { Icon } from "@craft/ui/components/icon";
import { Label } from "@craft/ui/components/label";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@craft/ui/components/sidebar";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export function WorkspaceSwitcher() {
	const { data: session } = authClient.useSession();
	const user = session?.user;
	const router = useRouter();

	async function handleLogOut() {
		await authClient.signOut();
		router.push("/login");
	}

	return (
		<SidebarMenu>
			<SidebarMenuItem className="flex items-center justify-between">
				<DropdownMenu>
					<DropdownMenuTrigger
						render={
							<SidebarMenuButton className="h-fit w-fit p-1 text-surface-item-foreground-active active:bg-surface-item-hover">
								<Avatar
									className="after:rounded-md after:border-none"
									size="sm"
								>
									<AvatarFallback className="rounded-md">O</AvatarFallback>
								</Avatar>
								<Label className="text-sm">Craft</Label>
								<Icon
									className="text-gray-11"
									name="IconChevronGrabberVertical"
									size={16}
								/>
							</SidebarMenuButton>
						}
					/>
					<DropdownMenuContent className="w-60">
						<DropdownMenuGroup>
							<DropdownMenuLinkItem href="/settings">
								Settings
							</DropdownMenuLinkItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuSub>
								<DropdownMenuSubTrigger>Switch account</DropdownMenuSubTrigger>
								<DropdownMenuSubContent className="min-w-52" sideOffset={4}>
									<DropdownMenuItem className="gap-2.5">
										<Avatar size="xs">
											{user?.image && <AvatarImage src={user.image} alt={user.name ?? ""} />}
											<AvatarFallback>
												{user?.name?.[0]?.toUpperCase() ?? user?.email?.[0]?.toUpperCase() ?? "?"}
											</AvatarFallback>
										</Avatar>
										<div className="flex min-w-0 flex-col">
											<span className="truncate text-caption text-gray-11">{user?.email}</span>
										</div>
									</DropdownMenuItem>
									<DropdownMenuSeparator />
									<DropdownMenuItem className="pl-3 gap-2.5">
										<Icon name="IconUserAddRight" variant="filled" />
										Add account
									</DropdownMenuItem>
								</DropdownMenuSubContent>
							</DropdownMenuSub>
							<DropdownMenuItem variant="destructive" onClick={handleLogOut}>Log out</DropdownMenuItem>
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
