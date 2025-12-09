// src/types/index.ts
export type UserRole = 'admin' | 'user';
export type AuthPageState = 'login' | 'register';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Department {
  id: string;
  name: string;
  code: string;
  description: string;
}

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  departmentId: string;
  enrollmentDate: string; // ISO date (yyyy-mm-dd)
}

export interface Teacher {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  departmentId: string;
  specialization: string;
}

export type Person = Student | Teacher;
