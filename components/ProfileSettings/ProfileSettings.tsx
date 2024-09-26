import { useTranslation, useUserAuthentication, useUserForm } from "hooks";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "store/selectors/user";

import Button from "components/Button/Button";
import Input from "components/Input";
import Loading from "components/Loading/Loading";

const ProfileSettings = () => {
  const { isLoading, updateUser } = useUserAuthentication();
  const { userFormState, onUserFormChange, preFillUserForm, extractUserForm } =
    useUserForm();
  const user = useSelector(selectUser);
  const { t } = useTranslation();
  const [edit, setEdit] = useState(true);

  useEffect(() => {
    preFillUserForm();
  }, [user]);

  const onSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (!edit) {
      setEdit(true);
      return;
    }
    const userFormData = extractUserForm();
    updateUser(event, userFormData);
    setEdit(true);
  };
  return (
    <>
      <div>
        <form className="w-full" onSubmit={onSubmit}>
          <div>
            <Input
              disabled={!edit}
              error={userFormState.firstName.error}
              value={userFormState.firstName.value}
              required
              name="firstName"
              label="First name"
              onChange={onUserFormChange}
              placeholder="Enter your firstname"
            />
            <Input
              disabled={!edit}
              error={userFormState.lastName.error}
              value={userFormState.lastName.value}
              required
              name="lastName"
              label="Last name"
              onChange={onUserFormChange}
              placeholder="Enter your lastname"
            />
          </div>
          <div className="pt-4">
            <div>
              <Input
                disabled={!edit}
                value={userFormState.address1?.value}
                required
                name="address1"
                label="Address"
                type="text"
                onChange={onUserFormChange}
                placeholder="address"
              />
              <Input
                disabled={!edit}
                value={userFormState.city?.value}
                required
                name="city"
                label="city"
                type="text"
                onChange={onUserFormChange}
                placeholder="city"
              />
              <Input
                disabled={!edit}
                value={userFormState.zipCode?.value}
                required
                name="zipCode"
                label="Zip code"
                type="text"
                onChange={onUserFormChange}
                placeholder="Zip code"
              />
              <Input
                disabled={!edit}
                value={userFormState.phoneNumber?.value}
                required
                name="phoneNumber"
                label="Phone Number"
                type="text"
                onChange={onUserFormChange}
                placeholder="Phone number"
              />
            </div>
          </div>

          <Button
            variant="default"
            className="mt-4"
            size="smallFluid"
            type="submit"
          >
            {edit ? t("update settings") : t("Edit settings")}
          </Button>
        </form>
      </div>
      {isLoading && <Loading />}
    </>
  );
};

export default ProfileSettings;
