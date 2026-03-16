import { API_BASE_URL } from "@/config";
import { useEffect, useState } from "react";
import type { Todo } from "@/types";
import { toast } from "sonner";

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<`asc` | `desc`>(`desc`);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalTodos, setTotalTodos] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);
  const toggleSortOrder = (): void => {
    setSortOrder((prev) => (prev === `desc` ? `asc` : `desc`));
  };
  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const statusQuery =
          activeFilters.length > 0 ? `&status=${activeFilters.join(",")}` : "";
        const response = await fetch(
          `${API_BASE_URL}/api/todos?limit=${pageSize}&sort_order=${sortOrder}&page_number=${currentPage}${statusQuery}`,
        );

        if (response.ok) {
          const data = await response.json();
          setTodos(data.todos);
          setTotalTodos(data.todo_number);
        } else {
          console.error("Server responded with an error");
        }
      } catch (error) {
        console.error("Could not connect to the backend:", error);
      }
    };
    fetchTodos();
  }, [currentPage, pageSize, sortOrder, activeFilters, refreshTrigger]);

  const handleAddTodo = async (text: string, status: string): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/todos`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ text: text, status: status }),
      });
      if (response.ok) {
        // Trigger a re-fetch and go to the first page to see the new item
        setRefreshTrigger((prev) => prev + 1);
        setCurrentPage(1);
      } else {
        console.error("Server responded with an error");
      }
    } catch (error) {
      console.error("Could not connect to the backend:", error);
    }
  };
  const handleDeleteTodo = async (id: number): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/todos/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setRefreshTrigger((prev) => prev + 1);
        toast.success("Todo has been deleted", {
          style: {
            color: "red",
          },
        });
      } else {
        console.error("Server responded with an error");
      }
    } catch (error) {
      console.error("Could not connect to the backend:", error);
    }
  };
  const handleDeleteAll = async (): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/todos`, {
        method: "DELETE",
      });
      if (response.ok) {
        setRefreshTrigger((prev) => prev + 1);
        toast.success("All Todos has been deleted", {
          style: {
            color: "red",
          },
        });
      } else {
        console.error("Server responded with an error");
      }
    } catch (error) {
      console.error("Could not connect to the backend:", error);
    }
  };
  const handleToggleFilter = (status: string): void => {
    setActiveFilters((prev) =>
      prev.includes(status)
        ? prev.filter((filterVal) => filterVal !== status)
        : [...prev, status],
    );
  };

  const updateTodo = async (
    id: number,
    text: string,
    status: string,
  ): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/todos/${id}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ text: text, status: status }),
      });
      if (response.ok) {
        setRefreshTrigger((prev) => prev + 1);
      } else {
        console.error("Server responded with an error");
      }
    } catch (error) {
      console.error("Could not connect to the backend:", error);
    }
  };

  return {
    todos,
    activeFilters,
    sortOrder,
    toggleSortOrder,
    handleAddTodo,
    handleDeleteTodo,
    handleDeleteAll,
    handleToggleFilter,
    updateTodo,
    currentPage,
    handlePageChange,
    totalTodos,
    pageSize,
    setPageSize,
  };
};
