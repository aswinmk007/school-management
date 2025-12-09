import type { User, Department, Student, Teacher, UserRole } from '../types';

/* ---------- Utilities ---------- */
const delay = (ms = 300) => new Promise<void>(res => setTimeout(res, ms));
const generateId = (prefix = '') => `${prefix}${Math.random().toString(36).slice(2, 9)}`;

/* ---------- Mock Database ---------- */
const mockDb: {
  departments: Department[];
  students: Student[];
  teachers: Teacher[];
  users: (User & { password: string })[];
} = {
  departments: [
    { id: 'dept-1', name: 'Computer Science', code: 'CS', description: 'Software and Hardware engineering' },
    { id: 'dept-2', name: 'Mathematics', code: 'MATH', description: 'Pure and Applied Mathematics' },
    { id: 'dept-3', name: 'Physics', code: 'PHY', description: 'Study of matter and energy' },
  ],
  students: [
    { id: 'student-CS-001', firstName: 'Alice', lastName: 'Smith', email: 'alice@school.edu', departmentId: 'dept-1', enrollmentDate: '2023-09-01' },
    { id: 'student-MATH-001', firstName: 'Bob', lastName: 'Johnson', email: 'bob@school.edu', departmentId: 'dept-2', enrollmentDate: '2023-09-01' },
    { id: 'student-CS-002', firstName: 'Charlie', lastName: 'Brown', email: 'charlie@school.edu', departmentId: 'dept-1', enrollmentDate: '2023-09-15' },
    { id: 'student-PHY-001', firstName: 'Diana', lastName: 'Prince', email: 'diana@school.edu', departmentId: 'dept-3', enrollmentDate: '2024-01-20' },
    { id: 'student-cs-003', firstName: 'Sanju', lastName: 'Samson', email: 'sanju@school.edu', departmentId: 'dept-1', enrollmentDate: '2024-01-20' },
    { id: 'student-PHY-002', firstName: 'Virat', lastName: 'Kohli', email: 'virat@school.edu', departmentId: 'dept-3', enrollmentDate: '2024-01-20' },
    { id: 'student-PHY-003', firstName: 'Dhoni', lastName: 'MS', email: 'dhoni@school.edu', departmentId: 'dept-3', enrollmentDate: '2024-01-20' },
    { id: 'student-PHY-004', firstName: 'Annop', lastName: 'Vinodh', email: 'anoop@school.edu', departmentId: 'dept-3', enrollmentDate: '2024-01-20' },
    { id: 'student-MATH-002', firstName: 'Sona', lastName: 'Savin', email: 'sona@school.edu', departmentId: 'dept-2', enrollmentDate: '2024-01-20' },
  ],
  teachers: [
    { id: 'teacher-CS-001', firstName: 'Dr. Emily', lastName: 'Brown', email: 'emily@school.edu', departmentId: 'dept-1', specialization: 'AI' },
    { id: 'teacher-MATH-001', firstName: 'Prof. Alan', lastName: 'Davis', email: 'alan@school.edu', departmentId: 'dept-2', specialization: 'Calculus' },
    { id: 'teacher-MATH-002', firstName: 'Prof. Sunny', lastName: 'Jhon', email: 'sunny@school.edu', departmentId: 'dept-2', specialization: 'Calculus' },
    { id: 'teacher-CS-002', firstName: 'Prof. Sonia', lastName: 'George', email: 'sonia@school.edu', departmentId: 'dept-1', specialization: 'Python' },
    { id: 'teacher-PHY-001', firstName: 'Prof. Karthik', lastName: 'Davis', email: 'karthik@school.edu', departmentId: 'dept-3', specialization: 'Calculus' },
    { id: 'teacher-PHY-002', firstName: 'Prof. Pranv', lastName: 'P R', email: 'pranv@school.edu', departmentId: 'dept-3', specialization: 'Calculus' },
  ],
  users: [
    { id: 'u1', name: 'Admin User', email: 'admin@school.edu', password: 'password', role: 'admin' as UserRole },
  ],
};

/* ---------- Exported API ---------- */
export const api = {
  auth: {
    login: async (email: string, password: string): Promise<User> => {
      await delay(500);
      const u = mockDb.users.find(user => user.email === email && user.password === password);
      if (!u) throw new Error('Invalid credentials');
      const { password: _, ...publicUser } = u;
      return publicUser;
    },
    register: async (name: string, email: string, password: string): Promise<User> => {
      await delay(500);
      if (mockDb.users.some(u => u.email === email)) throw new Error('User already exists');
      const newUser = { id: generateId('u-'), name, email, password, role: 'user' as UserRole };
      mockDb.users.push(newUser);
      const { password: _, ...publicUser } = newUser;
      return publicUser;
    },
  },

  departments: {
    getAll: async (): Promise<Department[]> => {
      await delay(300);
      return [...mockDb.departments];
    },
    create: async (data: Omit<Department, 'id'>): Promise<Department> => {
      await delay(300);
      const newDept: Department = { ...data, id: generateId('dept-') };
      mockDb.departments.push(newDept);
      return newDept;
    },
    update: async (id: string, data: Partial<Department>): Promise<Department> => {
      await delay(300);
      const idx = mockDb.departments.findIndex(d => d.id === id);
      if (idx === -1) throw new Error('Department not found');
      mockDb.departments[idx] = { ...mockDb.departments[idx], ...data };
      return mockDb.departments[idx];
    },
    delete: async (id: string): Promise<boolean> => {
      await delay(300);
      const before = mockDb.departments.length;
      mockDb.departments = mockDb.departments.filter(d => d.id !== id);
      return mockDb.departments.length < before;
    },
  },

  students: {
    getAll: async (departmentId?: string): Promise<Student[]> => {
      await delay(300);
      return departmentId ? mockDb.students.filter(s => s.departmentId === departmentId) : [...mockDb.students];
    },
    getById: async (id: string): Promise<Student> => {
      await delay(300);
      const s = mockDb.students.find(s => s.id === id);
      if (!s) throw new Error(`Student with ID ${id} not found`);
      return s;
    },
    create: async (data: Omit<Student, 'id'>): Promise<Student> => {
      await delay(300);
      const newStudent: Student = { ...data, id: generateId('student-') };
      mockDb.students.push(newStudent);
      return newStudent;
    },
    update: async (id: string, data: Partial<Student>): Promise<Student> => {
      await delay(300);
      const idx = mockDb.students.findIndex(s => s.id === id);
      if (idx === -1) throw new Error('Student not found');
      mockDb.students[idx] = { ...mockDb.students[idx], ...data } as Student;
      return mockDb.students[idx];
    },
    delete: async (id: string): Promise<boolean> => {
      await delay(300);
      const before = mockDb.students.length;
      mockDb.students = mockDb.students.filter(s => s.id !== id);
      return mockDb.students.length < before;
    },
  },

  teachers: {
    getAll: async (departmentId?: string): Promise<Teacher[]> => {
      await delay(300);
      return departmentId ? mockDb.teachers.filter(t => t.departmentId === departmentId) : [...mockDb.teachers];
    },
    create: async (data: Omit<Teacher, 'id'>): Promise<Teacher> => {
      await delay(300);
      const newTeacher: Teacher = { ...data, id: generateId('teacher-') };
      mockDb.teachers.push(newTeacher);
      return newTeacher;
    },
    update: async (id: string, data: Partial<Teacher>): Promise<Teacher> => {
      await delay(300);
      const idx = mockDb.teachers.findIndex(t => t.id === id);
      if (idx === -1) throw new Error('Teacher not found');
      mockDb.teachers[idx] = { ...mockDb.teachers[idx], ...data } as Teacher;
      return mockDb.teachers[idx];
    },
    delete: async (id: string): Promise<boolean> => {
      await delay(300);
      const before = mockDb.teachers.length;
      mockDb.teachers = mockDb.teachers.filter(t => t.id !== id);
      return mockDb.teachers.length < before;
    },
  },
};

/* ---------- Helpful dev-only export ---------- */
export const __mockDb = mockDb; // only used for testing / seed inspection
