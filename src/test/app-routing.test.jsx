import { QueryClient } from "@tanstack/react-query";
import { createMemoryHistory, createRouter, RouterProvider } from "@tanstack/react-router";
import { cleanup, render, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { routeTree } from "@/routeTree.gen";
async function renderAt(path) {
  const queryClient = new QueryClient();
  const router = createRouter({
    routeTree,
    context: { queryClient },
    history: createMemoryHistory({ initialEntries: [path] }),
  });
  await router.load();
  return render(<RouterProvider router={router} />);
}
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});
describe("App routing", () => {
  it("renders the index route", async () => {
    const { container } = await renderAt("/");
    await waitFor(() =>
      expect(container.textContent || document.body.textContent).toContain("Rishabh Patil"),
    );
  });
  it("renders the not-found route", async () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
    const { container } = await renderAt("/this-route-does-not-exist");
    await waitFor(() =>
      expect(container.textContent || document.body.textContent).toContain("Page not found"),
    );
  });
});
