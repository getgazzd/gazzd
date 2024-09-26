import { renderHook } from "@testing-library/react-hooks";
import { useBarcodeLink } from "hooks/useBarcodeLink";

describe("useBarcodeLink", () => {
  it("rejects a list", () => {
    const { result } = renderHook(() => useBarcodeLink(["param 1", "param 2"]));
    expect(result.current.error).toEqual("The barcode provided is not valid");
  });

  it("rejects too short barcode", () => {
    const { result } = renderHook(() => useBarcodeLink("123"));
    expect(result.current.error).toEqual("The barcode provided is not valid");
  });

  it("loading works", () => {
    const { result } = renderHook(() => useBarcodeLink("123"));
    expect(result.current.loading).toEqual(false);
  });
});
