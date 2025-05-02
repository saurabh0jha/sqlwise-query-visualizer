import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { QueriesContext } from "@/store/queryProvider";
import { PlusIcon } from "lucide-react";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { NewQueryDialog } from "../dialog/NewQueryDialog";

const SidebarSection = () => {
  const baseUrl = window.location.origin;
  const logoPath = `${baseUrl}/src/assets/qw-logo.svg`;
  const queries = useContext(QueriesContext) || {};
  const navigate = useNavigate();
  return (
    <SidebarProvider className="w-40">
      <Sidebar className="w-40">
        <SidebarHeader className="h-16">
          <SidebarMenu>
            <SidebarMenuItem className="flex items-center justify-center">
              <img src={logoPath} alt="QueryWise" className="w-22 h-14" />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarSeparator />
        <SidebarContent>
          <NewQueryDialog />
          <SidebarGroup>
            <SidebarGroupLabel className="font-medium">
              Saved Queries
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {Object.keys(queries).map((queryId) => (
                  <SidebarMenuItem
                    key={queryId}
                    className="border-b border-border cursor-pointer"
                    title={queries[queryId].name}
                  >
                    <SidebarMenuButton
                      className="my-1 py-4 px-2"
                      variant="default"
                      asChild
                    >
                      <a
                        onClick={() => {
                          navigate(`/query/${queryId}`);
                        }}
                      >
                        <span>{queries[queryId].name}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
};

export default SidebarSection;
