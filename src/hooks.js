import { useEffect, useState } from "react";

// One request for a static file written at build time by scripts/fetch-stats.mjs.
// No third-party API is called from the browser, so there is nothing to rate limit.
export function useStats() {
  const [state, setState] = useState({ stats: null, loading: true });

  useEffect(() => {
    const ctrl = new AbortController();
    fetch("/stats.json", { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then((stats) => setState({ stats, loading: false }))
      .catch((e) => {
        if (e.name !== "AbortError") setState({ stats: null, loading: false });
      });
    return () => ctrl.abort();
  }, []);

  return state;
}
