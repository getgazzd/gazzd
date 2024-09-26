import { useTranslation } from "hooks";
import { useDispatch, useSelector } from "react-redux";
import {
  selectShippingMethod,
  selectShippingMethods,
} from "store/selectors/selection";
import { updateShippingMethod } from "store/thunks/selection";

const ShippingMethods = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const shippingMethods = useSelector(selectShippingMethods);
  const selectedShippingMethod = useSelector(selectShippingMethod);

  const handleUpdate = (shippingMethod?: string) => {
    if (shippingMethod && shippingMethod !== selectedShippingMethod) {
      dispatch(updateShippingMethod({ shippingMethod }));
    }
  };
  if (shippingMethods && shippingMethods?.length <= 1) return null;
  return (
    <section>
      <h3 className="m-2">{t("Shipping Methods")}</h3>
      <div className="border-y border-borderGray rounded">
        {shippingMethods?.map((shippingMethod, index) => (
          <div
            role="button"
            key={shippingMethod.name}
            className={`border-borderGray p-4 ${
              index !== shippingMethods.length - 1 && "border-b"
            }`}
            onClick={() => handleUpdate(shippingMethod.shippingMethod)}
          >
            <input
              type="radio"
              className="mr-2"
              checked={selectedShippingMethod === shippingMethod.shippingMethod}
            />
            <span>{shippingMethod.name}</span>
            <span className="float-right">{shippingMethod.price}</span>
          </div>
        ))}
      </div>
    </section>
  );
};
export default ShippingMethods;
