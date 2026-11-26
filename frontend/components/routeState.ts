/* Module-level route memory: survives client-side navigations and lets
   SectionScroll tell an in-page move apart from a page change. */
export const routeState: { current: string | null; previous: string | null } = {
  current: null,
  previous: null,
};

/* These routes all render the Home surface with its in-page sections. */
export const HOME_ROUTES = ["/", "/services", "/approach"];
