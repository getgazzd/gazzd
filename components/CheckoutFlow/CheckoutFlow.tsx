import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { _getUser } from "store/thunks/user";
import PaymentUserForm from "components/PaymentUserForm";

function CheckoutFlow() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(_getUser);
  }, []);

  return (
    <>
      <PaymentUserForm />
    </>
  );
}

export default CheckoutFlow;
