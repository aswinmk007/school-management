import { apiRequest } from "@/lib/api";

export const departmentService = {
  getAll: () => apiRequest("/api/departments"),

  create: (data: { name: string }) =>
    apiRequest("/api/departments", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id: string, data: any) =>
    apiRequest(`/api/departments/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  remove: (id: string) =>
    apiRequest(`/api/departments/${id}`, {
      method: "DELETE",
    }),
};
