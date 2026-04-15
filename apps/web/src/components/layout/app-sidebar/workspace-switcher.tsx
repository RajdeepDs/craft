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
import { SidebarMenu, SidebarMenuItem } from "@craft/ui/components/sidebar";

export function WorkspaceSwitcher() {
	return (
		<SidebarMenu>
			<SidebarMenuItem className="flex items-center justify-between">
				<DropdownMenu>
					<DropdownMenuTrigger>Switcher</DropdownMenuTrigger>
					<DropdownMenuContent className="w-60">
						<DropdownMenuGroup>
							<DropdownMenuLinkItem href="/settings">
								<Icon name="IconSettingsGear2" size={20} variant="filled" />
								Settings
							</DropdownMenuLinkItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuSub>
								<DropdownMenuSubTrigger>Switch account</DropdownMenuSubTrigger>
								<DropdownMenuSubContent>
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
