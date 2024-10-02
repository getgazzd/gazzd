import { useTranslation } from "hooks/useTranslation";
import Image from "next/image";
import Link from "next/link";
import { useCategories } from "store/transfers/react_query/categories";

const FooterContent = () => {
  const { data: categoriesData } = useCategories();
  const { t } = useTranslation();
  return (
    <>
      {/* Desktop Footer content*/}
      <div className="mx-16 box-content hidden border-l border-r border-borderGray md:block">
        <div className="flex flex-col justify-between p-16 md:flex-row">
          <div>
            <Link href={"/products"} passHref>
              <a>
                <h2>{t("shop all")}</h2>
              </a>
            </Link>

            {categoriesData?.categories?.map((category) => (
              <Link
                key={category.uri}
                href={`/products?category=${category.uri}`}
                passHref
              >
                <a>
                  <h2>{t(String(category.name?.[0]))}</h2>
                </a>
              </Link>
            ))}

            <Link href={"/profile"} passHref>
              <a>
                <h2 className="mt-16">{t("account")}</h2>
              </a>
            </Link>
          </div>
          <div>
            <Link href={"/page/about"} passHref>
              <a>
                <h2>{t("about")}</h2>
              </a>
            </Link>
            {/* 
            Disabled for now
            <Link href={"/page/faq"} passHref>
              <a>
                <h2>{t("faq")}</h2>
              </a>
            </Link> */}
            <Link href={"/contact"} passHref>
              <a>
                <h2>{t("contact")}</h2>
              </a>
            </Link>
          </div>
          <div>
            <div>
              <Link href={"/gazzadors"} passHref>
                <a>
                  <h2>{t("our gazzadors")}</h2>
                </a>
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between px-16 pb-16 md:flex-row ">
          <div className="flex flex-col md:flex-row md:space-x-16">
            <h5>
              {new Date().getFullYear()}, {t("GAZZD AB ALL RIGHTS RESERVED")}
            </h5>
            {/* Disabled for now
            <Link href="/page/privacy-policy" passHref>
              <a>
                <h5>{t("privacy policy")}</h5>
              </a>
            </Link> */}
            <Link href="/page/terms-of-use" passHref>
              <a>
                <h5 role="button">{t("terms & conditions")}</h5>
              </a>
            </Link>
          </div>
          <div>
            <Image
              src="/images/klarna-logo.svg"
              alt="Klarna Logotype"
              width={75}
              height={43.5}
            />
          </div>
        </div>
        <div></div>
      </div>

      {/* Mobile Footer content */}
      <div className="ml-12 flex h-[calc(100vh-theme(space.12))] flex-col justify-between border-l border-r border-borderGray p-4 md:hidden">
        <div className="flex flex-row justify-between  md:flex-row">
          <div className="">
            <Link href={"/products"} passHref>
              <a>
                <h4>{t("shop all")}</h4>
              </a>
            </Link>

            {categoriesData?.categories?.map((category) => (
              <Link
                key={category.uri}
                href={`/products?category=${category.uri}`}
                passHref
              >
                <a>
                  <h4>{t(String(category.name?.[0]))}</h4>
                </a>
              </Link>
            ))}

            <Link href={"/profile"} passHref>
              <a>
                <h4 className="mt-16">{t("account")}</h4>
              </a>
            </Link>
          </div>
          <div className="mr-12">
            <Link href={"/page/about"} passHref>
              <a>
                <h4>{t("about")}</h4>
              </a>
            </Link>
            {/* Disabled for now 
            <Link href={"/page/faq"} passHref>
              <a>
                <h4>{t("faq")}</h4>
              </a>
            </Link> */}
            <Link href={"/contact"} passHref>
              <a>
                <h4>{t("contact")}</h4>
              </a>
            </Link>
          </div>
        </div>

        <div className="flex w-full justify-between pt-24">
          <div className="flex flex-col">
            <div>
              <Link passHref href="/gazzadors">
                <a>
                  <h4>{t("our gazzadors")}</h4>
                </a>
              </Link>
            </div>
          </div>
          <div className="flex h-12 w-12 -rotate-90 items-end  whitespace-nowrap">
            <h5>{t("Boost the whiner out of yourself!")}</h5>
          </div>
        </div>

        <div className="flex flex-col justify-between p-4">
          <div className="mb-16 flex flex-row space-x-8 ">
            {/* 
            Disabled for now
            <Link href={"/page/privacy-policy"} passHref>
              <a>
                <h5>{t("privacy policy")}</h5>
              </a>
            </Link> */}
            <Link href={"/page/terms-of-use"} passHref>
              <a>
                <h5>{t("terms & conditions")}</h5>
              </a>
            </Link>
          </div>
          <div className="flex flex-col">
            <h5>
              {new Date().getFullYear()}, {t("GAZZD AB ALL RIGHTS RESERVED")}
            </h5>
            <div>
              <Image
                src="/images/klarna-logo.svg"
                alt="Klarna Logotype"
                width={75}
                height={44}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FooterContent;
