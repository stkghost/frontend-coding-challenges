import { useAppStore } from "./useAppStore";

describe("useAppStore", () => {
  beforeEach(() => {
    // Reset all state fields so no slice leaks between tests
    useAppStore.setState({
      preferredHouse: undefined,
      favoriteIds: [],
      activeFilter: null,
    });
  });

  describe("setPreferredHouse", () => {
    it("sets a specific house", () => {
      useAppStore.getState().setPreferredHouse("Gryffindor");
      expect(useAppStore.getState().preferredHouse).toBe("Gryffindor");
    });

    it("sets null to show all characters", () => {
      useAppStore.getState().setPreferredHouse(null);
      expect(useAppStore.getState().preferredHouse).toBeNull();
    });

    it("sets undefined to trigger house selection", () => {
      useAppStore.getState().setPreferredHouse("Slytherin");
      useAppStore.getState().setPreferredHouse(undefined);
      expect(useAppStore.getState().preferredHouse).toBeUndefined();
    });
  });

  describe("toggleFavorite", () => {
    it("adds an id when not already favorited", () => {
      useAppStore.getState().toggleFavorite("1");
      expect(useAppStore.getState().favoriteIds).toEqual(["1"]);
    });

    it("removes an id when already favorited", () => {
      useAppStore.setState({ favoriteIds: ["1", "2"] });
      useAppStore.getState().toggleFavorite("1");
      expect(useAppStore.getState().favoriteIds).toEqual(["2"]);
    });

    it("can favorite multiple characters independently", () => {
      useAppStore.getState().toggleFavorite("1");
      useAppStore.getState().toggleFavorite("2");
      expect(useAppStore.getState().favoriteIds).toEqual(["1", "2"]);
    });

    it("does not affect other ids when removing one", () => {
      useAppStore.setState({ favoriteIds: ["1", "2", "3"] });
      useAppStore.getState().toggleFavorite("2");
      expect(useAppStore.getState().favoriteIds).toEqual(["1", "3"]);
    });

    it("toggling twice restores the original state", () => {
      useAppStore.getState().toggleFavorite("1");
      useAppStore.getState().toggleFavorite("1");
      expect(useAppStore.getState().favoriteIds).toEqual([]);
    });
  });

  describe("setActiveFilter", () => {
    it("sets the students filter", () => {
      useAppStore.getState().setActiveFilter("students");
      expect(useAppStore.getState().activeFilter).toBe("students");
    });

    it("sets the staff filter", () => {
      useAppStore.getState().setActiveFilter("staff");
      expect(useAppStore.getState().activeFilter).toBe("staff");
    });

    it("sets the favorite filter", () => {
      useAppStore.getState().setActiveFilter("favorite");
      expect(useAppStore.getState().activeFilter).toBe("favorite");
    });

    it("clears the filter by setting null", () => {
      useAppStore.getState().setActiveFilter("students");
      useAppStore.getState().setActiveFilter(null);
      expect(useAppStore.getState().activeFilter).toBeNull();
    });
  });
});
