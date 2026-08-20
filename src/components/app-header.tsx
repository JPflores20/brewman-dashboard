import { useRouterState } from "@tanstack/react-router";
import { Search, CalendarDays } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useTasks, type ShiftFilter } from "@/context/tasks-context";

const TITLES: Record<string, string> = {
  "/": "Tablero General — Cocimientos",
  "/agenda": "Agenda de Limpieza",
  "/mantenimiento": "Mantenimiento Preventivo",
  "/cip": "Bitácora de CIP",
  "/inventario": "Inventario de Equipos",
  "/reportes": "Reportes e Historial",
  "/configuracion": "Configuración",
};

const SHIFT_OPTIONS: { id: ShiftFilter; label: string }[] = [
  { id: "actual", label: "Turno Actual" },
  { id: "T1", label: "T1" },
  { id: "T2", label: "T2" },
  { id: "T3", label: "T3" },
];

export function AppHeader() {
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  const { now, query, setQuery, selectedDate, setSelectedDate, shiftFilter, setShiftFilter, activeShift } =
    useTasks();

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
      <div className="flex flex-wrap items-center gap-3 px-4 py-3 lg:px-6">
        <SidebarTrigger className="text-muted-foreground" />

        <div className="relative order-3 w-full md:order-none md:w-64">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar equipo o tarea…"
            className="h-9 bg-card pl-9"
          />
        </div>

        <h1 className="text-display flex-1 truncate text-lg font-semibold">
          {TITLES[pathname] ?? "Brewman"}
        </h1>

        <div className="flex items-center gap-2">
          <div className="hidden rounded-lg border border-border bg-card px-3 py-1.5 text-right sm:block">
            <p className="font-display text-base font-semibold leading-none tabular-nums text-primary">
              {format(now, "HH:mm:ss")}
            </p>
            <p className="text-[10px] capitalize text-muted-foreground">
              {format(now, "EEEE d MMM", { locale: es })} · Turno {activeShift}
            </p>
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 gap-2 bg-card">
                <CalendarDays className="size-4" />
                <span className="hidden sm:inline">{format(selectedDate, "dd/MM/yyyy")}</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(d) => d && setSelectedDate(d)}
                locale={es}
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto px-4 pb-3 lg:px-6">
        <span className="text-display shrink-0 text-[10px] text-muted-foreground">Filtro de turno</span>
        <div className="flex items-center gap-1 rounded-lg border border-border bg-card p-1">
          {SHIFT_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setShiftFilter(opt.id)}
              className={cn(
                "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                shiftFilter === opt.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-elevated hover:text-foreground",
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
