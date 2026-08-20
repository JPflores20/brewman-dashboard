import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { generateTasks, shiftOfDate, type ShiftId, type Task } from "@/lib/cocimientos";

export type ShiftFilter = "actual" | ShiftId;

type TasksContextValue = {
  tasks: Task[];
  now: Date;
  query: string;
  setQuery: (q: string) => void;
  selectedDate: Date;
  setSelectedDate: (d: Date) => void;
  shiftFilter: ShiftFilter;
  setShiftFilter: (s: ShiftFilter) => void;
  activeShift: ShiftId;
  effectiveShift: ShiftId;
  updateTask: (id: string, patch: Partial<Task>) => void;
  moveTask: (id: string, startIso: string) => void;
  addTask: (task: Task) => void;
  openTaskId: string | null;
  setOpenTaskId: (id: string | null) => void;
};

const TasksContext = createContext<TasksContextValue | null>(null);

export function TasksProvider({ children }: { children: ReactNode }) {
  const [now, setNow] = useState(() => new Date());
  const [tasks, setTasks] = useState<Task[]>([]);
  const [query, setQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [shiftFilter, setShiftFilter] = useState<ShiftFilter>("actual");
  const [openTaskId, setOpenTaskId] = useState<string | null>(null);

  // Seeded on the client so SSR and hydration agree.
  useEffect(() => {
    const today = new Date();
    setNow(today);
    setSelectedDate(today);
    setTasks(generateTasks(today));
  }, []);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const activeShift = shiftOfDate(now);
  const effectiveShift = shiftFilter === "actual" ? activeShift : shiftFilter;

  const value = useMemo<TasksContextValue>(
    () => ({
      tasks,
      now,
      query,
      setQuery,
      selectedDate,
      setSelectedDate,
      shiftFilter,
      setShiftFilter,
      activeShift,
      effectiveShift,
      openTaskId,
      setOpenTaskId,
      updateTask: (id, patch) =>
        setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...patch } : t))),
      moveTask: (id, startIso) =>
        setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, start: startIso } : t))),
      addTask: (task) => setTasks((prev) => [...prev, task].sort((a, b) => a.start.localeCompare(b.start))),
    }),
    [tasks, now, query, selectedDate, shiftFilter, activeShift, effectiveShift, openTaskId],
  );

  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>;
}

export function useTasks() {
  const ctx = useContext(TasksContext);
  if (!ctx) throw new Error("useTasks debe usarse dentro de TasksProvider");
  return ctx;
}
