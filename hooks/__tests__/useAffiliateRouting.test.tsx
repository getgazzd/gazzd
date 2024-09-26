import { renderHook } from "@testing-library/react-hooks";
import {
  NO_REDIRECT_PATHS,
  useAffiliateRouting,
} from "hooks/useAffiliateRouting";
import { hookTestWrapper as wrapper } from "tests/test-utils";

const mockPush = jest.fn();
jest.mock("next/router", () => ({
  useRouter: jest.fn(() => ({ push: mockPush })),
}));

const userId = 1;
const passwordResetToken = "1ea0f49311c59e7437e53e0a4dcda0fd";

Object.defineProperty(window, "location", {
  value: {},
});

describe("useAffiliateRouting() -> shouldRedirectToAffiliate: ", () => {
  beforeAll(() => {
    Object.defineProperty(document, "cookie", {
      value: "affiliate=gpunkt;domain=gazzd.com",
    });
  });

  NO_REDIRECT_PATHS.forEach((pathname: string) => {
    test(`does not redirect to affiliate page on ${pathname}`, async () => {
      const hostname = "gazzd.com";
      const params = `?id=${userId}&i=${passwordResetToken}`;
      window.location.href = `https://${hostname}${pathname}${params}`;
      window.location.hostname = hostname;
      window.location.pathname = pathname;
      const { result } = renderHook(() => useAffiliateRouting(), {
        wrapper,
      });
      const shouldRedirect = result.current.shouldRedirectToAffiliateDomain();
      expect(shouldRedirect).toBe(false);
    });
  });

  test("redirects to affiliate on other paths", async () => {
    const hostname = "gazzd.com";
    window.location.href = `https://${hostname}`;
    window.location.hostname = hostname;
    window.location.pathname = "";
    const { result } = renderHook(() => useAffiliateRouting(), {
      wrapper,
    });
    const shouldRedirect = result.current.shouldRedirectToAffiliateDomain();
    expect(shouldRedirect).toBe(true);
  });
});
