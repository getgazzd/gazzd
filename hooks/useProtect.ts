import { createHash, hashIsEqual } from "helpers/crypto";
import {
  getLocalStorage,
  isServer,
  setLocalStorage,
} from "helpers/localStorage";
import { FormEvent, useEffect, useState } from "react";

export const useProtect = () => {
  const [granted, setGranted] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");

  const hasHash = getLocalStorage("staging_hash");
  const validHash = process.env.NEXT_PUBLIC_STAGING_HASH;

  const onChange = (event: FormEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_STAGE === "production") return;

    if (validHash) {
      const hash = createHash(password);
      if (hashIsEqual(hash, validHash)) {
        setLocalStorage("staging_hash", hash);
        setGranted(true);
      }
    } else {
      setGranted(false);
      console.error("No valid staging hash was found");
    }
  }, [password, hasHash, validHash]);

  return {
    protect: !(
      process.env.NEXT_PUBLIC_STAGE === "production" ||
      (hasHash && validHash && hashIsEqual(hasHash, validHash)) ||
      granted ||
      process.env.NODE_ENV === "development" ||
      isServer()
    ),
    onChange,
  };
};
