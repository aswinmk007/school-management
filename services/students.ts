import { apiRequest } from "@/lib/api";

export const studentService = {
  getAll: () => apiRequest("/api/students"),

  filterByDept: (id: string) =>
    apiRequest(`/api/students?departmentId=${id}`),

  create: (data: any) =>
    apiRequest("/api/students", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};
