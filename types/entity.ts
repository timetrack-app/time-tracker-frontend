// User type
export type User = {
  id: number;
  email: string;
  workSessions: WorkSession[];
  templates: Template[];
};

// WorkSession type
export type WorkSession = {
  id: number;
  startAt: string; // Timestamp
  endAt: string; // Timestamp
  tabs: Tab[];
};

// Tab type
export type Tab = {
  id: number | null;
  name: string;
  displayOrder: number | null;
  taskLists: TaskList[];
};

// List type
export type TaskList = {
  id: number;
  name: string;
  displayOrder: number;
  tasks: Task[];
};

// Task type
export type Task = {
  id: number;
  displayOrder: number;
  name: string;
  description: string;
  totalTime: number; // seconds
};

// Template type
export type Template = {
  id: number;
  name: string;
  templateTabs: TemplateTab[];
};

// TemplateTab type
export type TemplateTab = {
  id: number;
  name: string;
  displayOrder: number;
  templateTaskLists: TemplateTaskList[];
};

// TemplateList type
export type TemplateTaskList = {
  id: number;
  name: string;
  displayOrder: number;
};
