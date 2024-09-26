import { renderHook } from "@testing-library/react-hooks";
import { useTranslation } from "hooks";

describe("useTranslation(): ", () => {
  describe("t(): ", () => {
    test("returns text successfully", () => {
      const {
        result: {
          current: { t },
        },
      } = renderHook(() => useTranslation());
      expect(t("Translated text")).toBe("Translated text");
    });
  });
});
