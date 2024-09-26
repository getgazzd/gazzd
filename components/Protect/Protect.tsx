import { FormEvent } from "react";
import Input from "components/Input";

interface Props {
  onChange(event: FormEvent<HTMLInputElement>): void;
}

export const Protect = ({ onChange }: Props): JSX.Element => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="w-full px-4 md:max-w-md">
        <Input
          required
          name="password"
          label="Password"
          type="password"
          onChange={onChange}
          placeholder="********"
        />
      </div>
    </div>
  );
};
