import { Avatar, AvatarFallback } from "@craft/ui/components/avatar";
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

export function WorkspaceSwitcher() {
	return (
		<SidebarMenu>
			<SidebarMenuItem className="flex items-center justify-between">
				<DropdownMenu>
					<DropdownMenuTrigger
						render={
							<SidebarMenuButton className="h-fit w-fit p-1 text-surface-item-foreground-active">
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
									<DropdownMenuItem>John Doe</DropdownMenuItem>
									<DropdownMenuSeparator />
									<DropdownMenuItem className="pl-2.5">
										<Icon name="IconUserAddRight" variant="filled" />
										Add account
									</DropdownMenuItem>
								</DropdownMenuSubContent>
							</DropdownMenuSub>
							<DropdownMenuItem variant="destructive">Log out</DropdownMenuItem>
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
