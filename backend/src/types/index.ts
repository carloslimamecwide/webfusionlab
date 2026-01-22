export interface Admin {
  id: string;
  email: string;
  password: string;
  name: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: "Web" | "Mobile" | "Marketing" | "AI";
  year: string;
  stack: string[];
  image?: string;
  link?: string;
  adminId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface JwtPayload {
  adminId: string;
  email: string;
}

export interface AuthRequest {
  email: string;
  password: string;
}

export interface ProjectInput {
  title: string;
  description: string;
  category: "Web" | "Mobile" | "Marketing" | "AI";
  year: string;
  stack: string[];
  image?: string;
  link?: string;
}
