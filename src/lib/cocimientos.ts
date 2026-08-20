export type TaskType = "cip" | "mantenimiento" | "inspeccion";
export type TaskStatus = "pendiente" | "proceso" | "completada" | "vencida";
export type Priority = "critica" | "alta" | "normal";
export type ShiftId = "T1" | "T2" | "T3";

export type Equipment = {
  id: string;
  code: string;
  name: string;
  zone: string;
  status: "operativo" | "en_limpieza" | "fuera_servicio";
};

export type Task = {
  id: string;
  title: string;
  equipmentId: string;
  type: TaskType;
  priority: Priority;
  /** ISO datetime for the scheduled start */
  start: string;
  durationMin: number;
  status: TaskStatus;
  frequency: string;
  responsible: string;
  notes?: string;
  photoUrl?: string;
  completedAt?: string;
};

export const SHIFTS: { id: ShiftId; label: string; startHour: number; endHour: number }[] = [
  { id: "T1", label: "T1 · 06:00 – 14:00", startHour: 6, endHour: 14 },
  { id: "T2", label: "T2 · 14:00 – 22:00", startHour: 14, endHour: 22 },
  { id: "T3", label: "T3 · 22:00 – 06:00", startHour: 22, endHour: 6 },
];

export function shiftOfHour(hour: number): ShiftId {
  if (hour >= 6 && hour < 14) return "T1";
  if (hour >= 14 && hour < 22) return "T2";
  return "T3";
}

export function shiftOfDate(date: Date): ShiftId {
  return shiftOfHour(date.getHours());
}

export const EQUIPMENT: Equipment[] = [
  { id: "p01", code: "P-01", name: "Paila de Cocimiento", zone: "Cocimientos", status: "operativo" },
  { id: "m03", code: "M-03", name: "Macerador Principal", zone: "Cocimientos", status: "operativo" },
  { id: "w04", code: "W-04", name: "Whirlpool", zone: "Cocimientos", status: "en_limpieza" },
  { id: "i02", code: "I-02", name: "Intercambiador de Placas", zone: "Enfriamiento", status: "operativo" },
  { id: "b05", code: "B-05", name: "Bomba de Agua Caliente", zone: "Servicios", status: "operativo" },
  { id: "b07", code: "B-07", name: "Bomba de Mosto", zone: "Cocimientos", status: "operativo" },
  { id: "f06", code: "F-06", name: "Filtro Lauter", zone: "Cocimientos", status: "operativo" },
  { id: "t09", code: "T-09", name: "Tanque de Agua Caliente", zone: "Servicios", status: "operativo" },
  { id: "t11", code: "T-11", name: "Tanque de Soda CIP", zone: "Central CIP", status: "operativo" },
  { id: "c12", code: "C-12", name: "Caldera de Vapor", zone: "Servicios", status: "fuera_servicio" },
];

export function equipmentById(id: string): Equipment | undefined {
  return EQUIPMENT.find((e) => e.id === id);
}

type Rule = {
  title: string;
  equipmentId: string;
  type: TaskType;
  priority: Priority;
  frequency: string;
  /** hours of day when the task is generated */
  hours: number[];
  durationMin: number;
  /** 0 = every day, otherwise specific weekdays */
  weekdays?: number[];
  responsible: string;
};

const RULES: Rule[] = [
  { title: "CIP Paila de Cocimiento", equipmentId: "p01", type: "cip", priority: "critica", frequency: "Diario", hours: [7, 23], durationMin: 90, responsible: "J. Ramírez" },
  { title: "CIP Macerador", equipmentId: "m03", type: "cip", priority: "alta", frequency: "Diario", hours: [9], durationMin: 60, responsible: "L. Ortega" },
  { title: "CIP Whirlpool", equipmentId: "w04", type: "cip", priority: "alta", frequency: "Cada 3 lotes", hours: [16], durationMin: 75, responsible: "M. Cruz" },
  { title: "Verificación Intercambiador de Placas", equipmentId: "i02", type: "inspeccion", priority: "normal", frequency: "Diario", hours: [11, 19], durationMin: 30, responsible: "A. Solís" },
  { title: "Mantenimiento Bomba de Agua", equipmentId: "b05", type: "mantenimiento", priority: "alta", frequency: "Semanal", hours: [10], durationMin: 120, weekdays: [2], responsible: "R. Delgado" },
  { title: "Engrase Bomba de Mosto", equipmentId: "b07", type: "mantenimiento", priority: "normal", frequency: "Semanal", hours: [15], durationMin: 45, weekdays: [4], responsible: "R. Delgado" },
  { title: "Limpieza Filtro Lauter", equipmentId: "f06", type: "cip", priority: "alta", frequency: "Tras 5 lotes", hours: [13], durationMin: 80, responsible: "M. Cruz" },
  { title: "Purga Tanque de Agua Caliente", equipmentId: "t09", type: "inspeccion", priority: "normal", frequency: "Diario", hours: [21], durationMin: 25, responsible: "S. Peña" },
  { title: "Recarga Tanque de Soda CIP", equipmentId: "t11", type: "mantenimiento", priority: "normal", frequency: "Cada 2 días", hours: [8], durationMin: 40, responsible: "L. Ortega" },
  { title: "Revisión Caldera de Vapor", equipmentId: "c12", type: "mantenimiento", priority: "critica", frequency: "Mensual", hours: [14], durationMin: 180, weekdays: [3], responsible: "Servicio externo" },
];

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function isoAt(day: Date, hour: number, minute = 0) {
  return `${day.getFullYear()}-${pad(day.getMonth() + 1)}-${pad(day.getDate())}T${pad(hour)}:${pad(minute)}:00`;
}

export function startOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

export function addDays(d: Date, n: number) {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}

export function sameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

/** Generates the demo agenda for a window around `today`. */
export function generateTasks(today: Date, daysBefore = 10, daysAfter = 24): Task[] {
  const tasks: Task[] = [];
  const now = today.getTime();

  for (let offset = -daysBefore; offset <= daysAfter; offset++) {
    const day = startOfDay(addDays(today, offset));
    for (const rule of RULES) {
      if (rule.weekdays && !rule.weekdays.includes(day.getDay())) continue;
      for (const hour of rule.hours) {
        const start = new Date(day);
        start.setHours(hour, 0, 0, 0);
        const id = `${rule.equipmentId}-${rule.type}-${isoAt(day, hour)}`;
        let status: TaskStatus = "pendiente";
        const diff = start.getTime() - now;
        if (diff < -60 * 60 * 1000) {
          // past tasks: mostly completed, some overdue for critical ones
          status = rule.priority === "critica" && offset === 0 ? "vencida" : "completada";
        } else if (diff < 0) {
          status = "proceso";
        }
        tasks.push({
          id,
          title: rule.title,
          equipmentId: rule.equipmentId,
          type: rule.type,
          priority: rule.priority,
          start: isoAt(day, hour),
          durationMin: rule.durationMin,
          status,
          frequency: rule.frequency,
          responsible: rule.responsible,
          ...(status === "completada" ? { completedAt: isoAt(day, hour) } : {}),
        });
      }
    }
  }
  return tasks.sort((a, b) => a.start.localeCompare(b.start));
}

export const TYPE_LABEL: Record<TaskType, string> = {
  cip: "Limpieza CIP",
  mantenimiento: "Mantenimiento",
  inspeccion: "Inspección",
};

export const STATUS_LABEL: Record<TaskStatus, string> = {
  pendiente: "Pendiente",
  proceso: "En proceso",
  completada: "Completada",
  vencida: "Vencida",
};

export const PRIORITY_LABEL: Record<Priority, string> = {
  critica: "Crítica",
  alta: "Alta",
  normal: "Normal",
};

export function formatHour(iso: string) {
  const d = new Date(iso);
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function formatDateLong(d: Date) {
  return d.toLocaleDateString("es-MX", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}
