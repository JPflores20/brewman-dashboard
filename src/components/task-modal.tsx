import { useEffect, useState } from "react";
import { toast } from "sonner";
import { CheckCircle2, ImagePlus, Loader2, X } from "lucide-react";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useTasks } from "@/context/tasks-context";
import {
  equipmentById,
  formatHour,
  PRIORITY_LABEL,
  STATUS_LABEL,
  TYPE_LABEL,
  formatDateLong,
} from "@/lib/cocimientos";
import { TYPE_ICON } from "@/components/task-card";

export function TaskModal() {
  const { tasks, openTaskId, setOpenTaskId, updateTask } = useTasks();
  const task = tasks.find((t) => t.id === openTaskId) ?? null;

  const [notes, setNotes] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);

  useEffect(() => {
    setNotes(task?.notes ?? "");
    setPhoto(task?.photoUrl ?? null);
  }, [openTaskId, task?.notes, task?.photoUrl]);

  if (!task) return null;

  const equipment = equipmentById(task.equipmentId);
  const Icon = TYPE_ICON[task.type];
  const date = new Date(task.start);

  const save = (status: typeof task.status) => {
    updateTask(task.id, {
      status,
      notes,
      ...(photo ? { photoUrl: photo } : {}),
      ...(status === "completada" ? { completedAt: new Date().toISOString() } : {}),
    });
    toast.success(
      status === "completada" ? "Tarea registrada como completada" : `Tarea marcada como ${STATUS_LABEL[status]}`,
      { description: `${task.title} · ${equipment?.code ?? ""}` },
    );
    setOpenTaskId(null);
  };

  return (
    <Dialog open onOpenChange={(o) => !o && setOpenTaskId(null)}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-start gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <Icon className="size-5" />
            </span>
            <div>
              <DialogTitle className="text-left text-lg">{task.title}</DialogTitle>
              <DialogDescription className="text-left">
                {equipment ? `${equipment.name} (${equipment.code}) · ${equipment.zone}` : "Equipo"}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <dl className="grid grid-cols-2 gap-3 rounded-lg border border-border bg-elevated/60 p-3 text-sm">
          <div>
            <dt className="text-xs text-muted-foreground">Programada</dt>
            <dd className="capitalize">
              {formatDateLong(date)} · {formatHour(task.start)}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">Duración</dt>
            <dd>{task.durationMin} min</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">Tipo / Frecuencia</dt>
            <dd>
              {TYPE_LABEL[task.type]} · {task.frequency}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">Prioridad / Estado</dt>
            <dd>
              {PRIORITY_LABEL[task.priority]} · {STATUS_LABEL[task.status]}
            </dd>
          </div>
          <div className="col-span-2">
            <dt className="text-xs text-muted-foreground">Responsable de turno</dt>
            <dd>{task.responsible}</dd>
          </div>
        </dl>

        <div className="space-y-2">
          <Label htmlFor="incidencias">Incidencias u observaciones</Label>
          <Textarea
            id="incidencias"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Ej. Se detectó fuga menor en válvula de descarga…"
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="foto">Evidencia fotográfica (opcional)</Label>
          {photo ? (
            <div className="relative overflow-hidden rounded-lg border border-border">
              <img src={photo} alt="Evidencia de la tarea" className="h-40 w-full object-cover" />
              <button
                type="button"
                onClick={() => setPhoto(null)}
                aria-label="Quitar foto"
                className="absolute right-2 top-2 rounded-md bg-background/80 p-1 text-foreground"
              >
                <X className="size-4" />
              </button>
            </div>
          ) : (
            <label
              htmlFor="foto"
              className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-elevated/40 px-4 py-6 text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
            >
              <ImagePlus className="size-4" />
              Subir foto de evidencia
            </label>
          )}
          <input
            id="foto"
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setPhoto(URL.createObjectURL(file));
            }}
          />
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          <Button onClick={() => save("completada")} className="flex-1 gap-2">
            <CheckCircle2 className="size-4" />
            Marcar como completada
          </Button>
          <Button variant="outline" onClick={() => save("proceso")} className="gap-2">
            <Loader2 className="size-4" />
            En proceso
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
