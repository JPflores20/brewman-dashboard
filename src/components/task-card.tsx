import { Droplets, Wrench, Gauge, Clock, CheckCircle2, AlertTriangle } from "lucide-react";
import {
  equipmentById,
  formatHour,
  PRIORITY_LABEL,
  STATUS_LABEL,
  TYPE_LABEL,
  type Task,
} from "@/lib/cocimientos";
import { cn } from "@/lib/utils";

export const TYPE_ICON = {
  cip: Droplets,
  mantenimiento: Wrench,
  inspeccion: Gauge,
} as const;

const STATUS_STYLE: Record<Task["status"], string> = {
  pendiente: "bg-elevated text-muted-foreground",
  proceso: "bg-info/15 text-info",
  completada: "bg-success/15 text-success",
  vencida: "bg-destructive/15 text-destructive",
};

export function TaskCard({ task, onClick }: { task: Task; onClick: () => void }) {
  const equipment = equipmentById(task.equipmentId);
  const Icon = TYPE_ICON[task.type];
  const critical = task.priority === "critica" && task.status !== "completada";

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group flex w-full items-center gap-4 rounded-xl border bg-card p-4 text-left shadow-card transition-all hover:border-primary/50 hover:bg-elevated",
        critical ? "border-primary/40" : "border-border",
      )}
    >
      <span
        className={cn(
          "flex size-11 shrink-0 items-center justify-center rounded-lg",
          task.type === "cip" ? "bg-primary/15 text-primary" : "bg-elevated text-foreground",
        )}
      >
        <Icon className="size-5" />
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate font-medium">{task.title}</p>
          {critical && <AlertTriangle className="size-3.5 shrink-0 text-primary" />}
        </div>
        <p className="truncate text-xs text-muted-foreground">
          {equipment ? `${equipment.name} (${equipment.code})` : "Equipo"} · {TYPE_LABEL[task.type]} ·{" "}
          {task.frequency}
        </p>
      </div>

      <div className="flex shrink-0 flex-col items-end gap-1.5">
        <span className="flex items-center gap-1 text-sm font-semibold tabular-nums">
          {task.status === "completada" ? (
            <CheckCircle2 className="size-3.5 text-success" />
          ) : (
            <Clock className="size-3.5 text-muted-foreground" />
          )}
          {formatHour(task.start)}
        </span>
        <span
          className={cn(
            "rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide",
            STATUS_STYLE[task.status],
          )}
        >
          {STATUS_LABEL[task.status]}
        </span>
        <span className="text-[10px] text-muted-foreground">Prioridad {PRIORITY_LABEL[task.priority]}</span>
      </div>
    </button>
  );
}
