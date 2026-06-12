import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createElement } from "react";
import { useCharacters } from "./useCharacters";
import { useAppStore } from "@lib/hooks/useAppStore";
import { mockCharacters } from "../../../test/mocks";
import { fetchCharacters } from "@lib/api/characters";

vi.mock("@lib/api/characters", () => ({
  fetchCharacters: vi.fn(),
}));

const mockFetchCharacters = vi.mocked(fetchCharacters);

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) =>
    createElement(QueryClientProvider, { client: queryClient }, children);
};

beforeEach(() => {
  useAppStore.setState({ preferredHouse: undefined, activeFilter: null, favoriteIds: [] });
  mockFetchCharacters.mockResolvedValue(mockCharacters);
});

afterEach(() => {
  vi.clearAllMocks();
});

describe("useCharacters", () => {
  it("returns all characters with images when no filter is active", async () => {
    const { result } = renderHook(() => useCharacters(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    const expectedIds = mockCharacters.filter((c) => c.image).map((c) => c.id);
    expect(result.current.characters.map((c) => c.id)).toEqual(expectedIds);
  });

  it("excludes characters without images regardless of filter", async () => {
    const { result } = renderHook(() => useCharacters(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.characters.every((c) => c.image)).toBe(true);
  });

  it("filters to students only", async () => {
    useAppStore.setState({ activeFilter: "students" });

    const { result } = renderHook(() => useCharacters(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.characters.every((c) => c.hogwartsStudent === true)).toBe(true);
    expect(result.current.characters.length).toBeGreaterThan(0);
  });

  it("filters to staff only", async () => {
    useAppStore.setState({ activeFilter: "staff" });

    const { result } = renderHook(() => useCharacters(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.characters.every((c) => c.hogwartsStaff === true)).toBe(true);
    expect(result.current.characters.length).toBeGreaterThan(0);
  });

  it("filters to favorites only", async () => {
    useAppStore.setState({ activeFilter: "favorite", favoriteIds: ["1"] });

    const { result } = renderHook(() => useCharacters(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.characters.every((c) => c.id === "1")).toBe(true);
    expect(result.current.characters).toHaveLength(1);
  });

  it("returns empty array when no favorites exist and favorite filter is active", async () => {
    useAppStore.setState({ activeFilter: "favorite", favoriteIds: [] });

    const { result } = renderHook(() => useCharacters(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.characters).toHaveLength(0);
  });

  it("passes preferredHouse to fetchCharacters", async () => {
    useAppStore.setState({ preferredHouse: "Gryffindor" });

    const { result } = renderHook(() => useCharacters(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockFetchCharacters).toHaveBeenCalledWith("Gryffindor");
  });

  it("passes null to fetchCharacters when showing all houses", async () => {
    useAppStore.setState({ preferredHouse: null });

    const { result } = renderHook(() => useCharacters(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockFetchCharacters).toHaveBeenCalledWith(null);
  });

  it("exposes isError on fetch failure", async () => {
    mockFetchCharacters.mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => useCharacters(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});
