export type TodoStatus = "Todo" | "In progress" | "Done" | "Canceled" | string;

export const statusBadgeClass = (status: string): string => {
  switch (status) {
    case "Done":
      return "bg-emerald-100 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-500/15 dark:text-emerald-300 dark:ring-emerald-400/30";
    case "In progress":
      return "bg-amber-100 text-amber-800 ring-amber-600/20 dark:bg-amber-500/15 dark:text-amber-300 dark:ring-amber-400/30";
    case "Canceled":
      return "bg-rose-100 text-rose-700 ring-rose-600/20 dark:bg-rose-500/15 dark:text-rose-300 dark:ring-rose-400/30";
    case "Todo":
    default:
      return "bg-violet-100 text-violet-700 ring-violet-600/20 dark:bg-violet-500/15 dark:text-violet-300 dark:ring-violet-400/30";
  }
};

export const statusAccentClass = (status: string): string => {
  switch (status) {
    case "Done":
      return "bg-emerald-500";
    case "In progress":
      return "bg-amber-500";
    case "Canceled":
      return "bg-rose-500";
    case "Todo":
    default:
      return "bg-violet-500";
  }
};

export const statusDotClass = (status: string): string => {
  switch (status) {
    case "Done":
      return "bg-emerald-500";
    case "In progress":
      return "bg-amber-500";
    case "Canceled":
      return "bg-rose-500";
    case "Todo":
    default:
      return "bg-violet-500";
  }
};
