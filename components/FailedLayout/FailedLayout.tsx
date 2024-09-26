import { useTranslation } from "hooks";
import Link from "next/link";

import Button from "components/Button/Button";

const FailedLayout = () => {
  const { t } = useTranslation();
  return (
    <>
      <h1 className="text-streakingStrawberries">
        {t("Something went wrong.")}
      </h1>
      <Link passHref href="/products">
        <Button className="mt-16">{t("take me to the products!")}</Button>
      </Link>
    </>
  );
};

export default FailedLayout;
