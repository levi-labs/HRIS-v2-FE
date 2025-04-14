import { Home } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

// Menu items.
// const items = [
//   { title: 'Home', url: '#', icon: Home },
//   { title: 'Inbox', url: '#', icon: Inbox },
//   { title: 'Calendar', url: '#', icon: Calendar },
//   { title: 'Search', url: '#', icon: Search },
//   { title: 'Settings', url: '#', icon: Settings },
// ];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarMenu>
            {/* Product */}
            <Collapsible>
              <CollapsibleTrigger asChild>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Home />
                    Product
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuButton asChild>
                      <a href="/product/list">Daftar Product</a>
                    </SidebarMenuButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </Collapsible>

            {/* Supplier */}
            <Collapsible>
              <CollapsibleTrigger asChild>
                <SidebarMenuItem>
                  <SidebarMenuButton>Supplier</SidebarMenuButton>
                </SidebarMenuItem>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuButton asChild>
                      <a href="/supplier/list">Daftar Supplier</a>
                    </SidebarMenuButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </Collapsible>

            {/* Setting */}
            <Collapsible>
              <CollapsibleTrigger asChild>
                <SidebarMenuItem>
                  <SidebarMenuButton>Setting</SidebarMenuButton>
                </SidebarMenuItem>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuButton asChild>
                      <a href="/setting/user">User</a>
                    </SidebarMenuButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </Collapsible>

            {/* Barang */}
            <Collapsible>
              <CollapsibleTrigger asChild>
                <SidebarMenuItem>
                  <SidebarMenuButton>Barang</SidebarMenuButton>
                </SidebarMenuItem>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuButton asChild>
                      <a href="/barang/masuk">Barang Masuk</a>
                    </SidebarMenuButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuButton asChild>
                      <a href="/barang/keluar">Barang Keluar</a>
                    </SidebarMenuButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </Collapsible>

            {/* Kasir */}
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/kasir">Kasir</a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
