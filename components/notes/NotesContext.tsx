"use client";

import { createContext, useContext, useState } from "react";

// Whether "Show how this page follows the guidelines" is on. Lives in the root
// layout, so it stays on while moving between pages; in-memory only.
const NotesContext = createContext<{ on: boolean; setOn: (on: boolean) => void }>({
  on: false,
  setOn: () => {},
});

export function NotesProvider({ children }: { children: React.ReactNode }) {
  const [on, setOn] = useState(false);
  return <NotesContext.Provider value={{ on, setOn }}>{children}</NotesContext.Provider>;
}

export function useNotes() {
  return useContext(NotesContext);
}
