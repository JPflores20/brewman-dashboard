import { createFileRoute } from "@tanstack/react-router";
import { AgendaBoard } from "@/components/agenda-board";

export const Route = createFileRoute("/agenda")({
  head: () => ({
    meta: [
      { title: "Agenda de Limpieza | Brewman Bloque Caliente" },
      {
        name: "description",
        content:
          "Calendario interactivo de limpiezas CIP y mantenimiento de cocimientos con vistas de mes, semana y día y reprogramación por arrastre.",
      },
      { property: "og:title", content: "Agenda de Limpieza | Brewman" },
      {
        property: "og:description",
        content: "Planifica y reprograma las tareas de limpieza y mantenimiento del Bloque Caliente.",
      },
    ],
  }),
  component: AgendaPage,
});

function AgendaPage() {
  return <AgendaBoard />;
}
