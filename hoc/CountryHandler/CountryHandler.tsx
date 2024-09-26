import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getSelection } from "store/thunks/selection";
import { getBackendUser } from "store/thunks/user";

const CountryHandler: React.FC = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSelection());
    dispatch(getBackendUser());
  }, []);

  return <>{children}</>;
};
export default CountryHandler;
