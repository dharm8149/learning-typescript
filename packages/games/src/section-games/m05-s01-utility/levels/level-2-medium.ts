import { GameLevel } from '@ts-learn/types';

export const level2Medium: GameLevel = {
  levelNumber: 2,
  title: "Level 2: Pick, Omit, and Record",
  description: "Master property selection, exclusion, and object type creation.",
  timeLimitSeconds: 40,
  targetScore: 750,
  items: [
    {
      id: "m1",
      valueRepresentation: `interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  age: number;
}

type PublicUser = Pick<User, 'id' | 'name' | 'email'>;
// What does PublicUser look like?`,
      valueExplanation: "Pick<User, 'id' | 'name' | 'email'> selects ONLY those 3 properties, excluding password and age.",
      correctType: "{ id: string; name: string; email: string }",
      distractorTypes: [
        "{ id: string; name: string; email: string; password: string; age: number }",
        "{ password: string; age: number }",
        "{ id?: string; name?: string; email?: string }"
      ]
    },
    {
      id: "m2",
      valueRepresentation: `interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  age: number;
}

type SafeUser = Omit<User, 'password'>;
// What is SafeUser?`,
      valueExplanation: "Omit<User, 'password'> removes ONLY the password property. All other properties remain.",
      correctType: "{ id: string; name: string; email: string; age: number }",
      distractorTypes: [
        "{ password: string }",
        "{ id: string; name: string }",
        "Same as User — no change"
      ]
    },
    {
      id: "m3",
      valueRepresentation: `type Status = 'active' | 'inactive' | 'pending';

type StatusMap = Record<Status, string>;
// What does StatusMap look like?`,
      valueExplanation: "Record<Status, string> creates { active: string; inactive: string; pending: string } — one string property for each Status value.",
      correctType: "{ active: string; inactive: string; pending: string }",
      distractorTypes: [
        "{ [key: string]: string }",
        "'active' | 'inactive' | 'pending'",
        "{ active?: string; inactive?: string; pending?: string }"
      ]
    },
    {
      id: "m4",
      valueRepresentation: `interface Admin {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  permissions: string[];
}

// Remove id, password, and role
type AdminPublic = Omit<Admin, 'id' | 'password' | 'role'>;
// What properties remain?`,
      valueExplanation: "Omit removes the specified keys. Remaining: name, email, permissions.",
      correctType: "{ name: string; email: string; permissions: string[] }",
      distractorTypes: [
        "{ id: string; password: string; role: string }",
        "{ name: string; email: string }",
        "All properties removed"
      ]
    },
    {
      id: "m5",
      valueRepresentation: `interface User {
  id: string;
  name: string;
  age: number;
}

// Combine Pick with Partial
type UserForm = Partial<Pick<User, 'name' | 'age'>>;
// What does UserForm look like?`,
      valueExplanation: "Pick<User, 'name' | 'age'> gives { name: string; age: number }. Then Partial makes both optional.",
      correctType: "{ name?: string; age?: number }",
      distractorTypes: [
        "{ name: string; age: number }",
        "{ name?: string }",
        "{ id?: string; name?: string; age?: number }"
      ]
    }
  ]
};
