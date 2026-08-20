import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  CalendarDays,
  Wrench,
  Droplets,
  Boxes,
  FileBarChart,
  Settings,
  LogOut,
  Beer,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const items = [
  { title: "Tablero", url: "/", icon: LayoutDashboard },
  { title: "Agenda de Limpieza", url: "/agenda", icon: CalendarDays },
  { title: "Mantenimiento Preventivo", url: "/mantenimiento", icon: Wrench },
  { title: "Bitácora de CIP", url: "/cip", icon: Droplets },
  { title: "Inventario de Equipos", url: "/inventario", icon: Boxes },
  { title: "Reportes e Historial", url: "/reportes", icon: FileBarChart },
  { title: "Configuración", url: "/configuracion", icon: Settings },
] as const;

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const pathname = useRouterState({ select: (r) => r.location.pathname });

  return (
    <Sidebar collapsible="icon" className="border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border px-3 py-4">
        <div className="flex items-center gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Beer className="size-5" />
          </span>
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-display truncate text-base font-semibold leading-tight text-sidebar-foreground">
                Brewman
              </p>
              <p className="truncate text-xs text-muted-foreground">Bloque Caliente · Limpieza y Mtto.</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-display text-[10px] text-muted-foreground">
            Operación
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const active = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton asChild isActive={active} tooltip={item.title}>
                      <Link
                        to={item.url}
                        className={
                          active
                            ? "border-l-2 border-primary bg-sidebar-accent font-medium text-primary"
                            : "border-l-2 border-transparent text-sidebar-foreground/80"
                        }
                      >
                        <item.icon className="size-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-3">
        <div className="flex items-center gap-3">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-elevated text-xs font-semibold">
            JL
          </span>
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm text-sidebar-foreground">José L. Flores</p>
              <p className="truncate text-xs text-muted-foreground">Supervisor de Cocimientos</p>
            </div>
          )}
          {!collapsed && (
            <button
              type="button"
              aria-label="Cerrar sesión"
              className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground"
            >
              <LogOut className="size-4" />
            </button>
          )}
        </div>
        {!collapsed && (
          <p className="mt-3 text-[10px] leading-tight text-muted-foreground">
            © 2026 Brewman · Planta Cocimientos. Uso interno.
          </p>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
