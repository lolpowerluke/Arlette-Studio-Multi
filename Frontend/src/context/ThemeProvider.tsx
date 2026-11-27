import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type ThemeVars = Record<string, string>;
export type ThemeStatus = "loading" | "ready" | "fallback";

export interface ThemeState {
  status: ThemeStatus;
  theme: ThemeVars;
  error: Error | null;
}

const ThemeContext = createContext<ThemeState>({
  status: "loading",
  theme: {},
  error: null,
});
export const useTheme = (): ThemeState => useContext(ThemeContext);

const toVar = (key: string): string => (key.startsWith("--") ? key : `--${key}`);

function sanitize(raw: unknown): ThemeVars {
  const out: ThemeVars = {};
  if (!raw || typeof raw !== "object") return out;
  for (const [k, v] of Object.entries(raw as Record<string, unknown>)) {
    const name = toVar(k);
    if (!/^--[a-z0-9-]+$/i.test(name)) continue;
    if (typeof v !== "string") continue;
    const ok =
      v.startsWith("var(") ||
      (typeof CSS !== "undefined" && CSS.supports("color", v));
    if (ok) out[name] = v;
  }
  return out;
}

interface ThemeProviderProps {
  url?: string;
  pollMs?: number;
  timeoutMs?: number;
  children: ReactNode;
}

export default function ThemeProvider({
  url = "/api/theme",
  pollMs = 0,
  timeoutMs = 5000,
  children,
}: ThemeProviderProps) {
  const [state, setState] = useState<ThemeState>({
    status: "loading",
    theme: {},
    error: null,
  });
  const applied = useRef<Set<string>>(new Set());

  useEffect(() => {
    let alive = true;
    const root = document.documentElement;

    const apply = (vars: ThemeVars): void => {
      for (const name of applied.current) {
        if (!(name in vars)) root.style.removeProperty(name);
      }
      applied.current = new Set(Object.keys(vars));
      for (const [name, val] of Object.entries(vars)) {
        root.style.setProperty(name, val);
      }
    };

    const load = async (): Promise<void> => {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), timeoutMs);
      try {
        const res = await fetch(url, {
          signal: ctrl.signal,
          headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json: unknown = await res.json();
        const body = json as { colors?: unknown } | null;
        const vars = sanitize(body?.colors ?? json);
        if (!alive) return;
        apply(vars);
        setState({ status: "ready", theme: vars, error: null });
      } catch (err) {
        if (!alive) return;
        const error = err instanceof Error ? err : new Error(String(err));
        setState((s) => ({ ...s, status: "fallback", error }));
      } finally {
        clearTimeout(timer);
      }
    };

    void load();
    const id = pollMs > 0 ? setInterval(() => void load(), pollMs) : null;

    return () => {
      alive = false;
      if (id) clearInterval(id);
      for (const name of applied.current) root.style.removeProperty(name);
      applied.current = new Set();
    };
  }, [url, pollMs, timeoutMs]);

  return <ThemeContext.Provider value={state}>{children}</ThemeContext.Provider>;
}
