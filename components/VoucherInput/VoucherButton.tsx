import { getAffiliateCookie } from "helpers/cookie";
import { useTranslation } from "hooks";
import { useSelector } from "react-redux";
import { selectSelectionIsLoading } from "store/selectors/selection";

import Button from "components/Button/Button";
import Loading from "components/Loading/Loading";

const VoucherLoader = () => (
  <Loading
    style={{
      width: 20,
      height: 20,
      transform: "scale(0.4) translate(-30px, -30px) ",
    }}
  />
);

interface VoucherButtonProps {
  open: boolean;
  hasVouchers?: boolean;
  hasOnlyBundle?: boolean;
  handleRemove: () => void;
  handleOpen: () => void;
}

export const VoucherButton = ({
  open,
  hasVouchers,
  handleRemove,
  handleOpen,
  hasOnlyBundle,
}: VoucherButtonProps) => {
  const { t } = useTranslation();
  const loading = useSelector(selectSelectionIsLoading);
  const affiliateCookie = getAffiliateCookie();

  if (loading)
    return (
      <div className="h-12">
        <VoucherLoader />
      </div>
    );
  if (affiliateCookie || hasOnlyBundle)
    return (
      <Button variant="ghost" size="smallFluid" disabled>
        {affiliateCookie
          ? t("Can't use voucher with affiliate")
          : t("Can't use voucher on bundles")}
      </Button>
    );
  if (hasVouchers)
    return (
      <Button variant="ghost" size="smallFluid" onClick={handleRemove}>
        {t("Remove Vouchers")}
      </Button>
    );

  return (
    <Button variant="ghost" size="smallFluid" onClick={handleOpen}>
      {t(open ? "Close" : "i have a voucher code")}
    </Button>
  );
};
