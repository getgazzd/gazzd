import Button from "components/Button/Button";
import Link from "next/link";
import { useTranslation } from "hooks/useTranslation";

export const SignupButton = () => {
  const { t } = useTranslation();
  return (
    <div className="self-end">
      <Link href="/signup" passHref>
        <a>
          <Button size="smallFluid" variant="ghost">
            {t("I Wanna join the gang!")}
          </Button>
        </a>
      </Link>
    </div>
  );
};
