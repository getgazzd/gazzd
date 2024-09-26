export const setCookie = ({
  domain,
  expirationDays,
}: {
  domain: any;
  expirationDays: number;
}) => {
  const date = new Date();
  const expiresDate = new Date(date.setDate(date.getDate() + expirationDays));
  const expiresDateString = expiresDate.toUTCString();

  document.cookie = `affiliate=${domain.subdomain};domain=${domain.domain};expires=${expiresDateString}`;
};

export const getAffiliateCookie = () => {
  const affiliateCookie =
    document.cookie
      .match("(^|;)\\s*" + "affiliate" + "\\s*=\\s*([^;]+)")
      ?.pop() || "";

  return affiliateCookie;
};

export const deleteCookie = (domain: any) => {
  document.cookie = `affiliate=;domain=${domain.domain};expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  localStorage.removeItem("visited");
};
