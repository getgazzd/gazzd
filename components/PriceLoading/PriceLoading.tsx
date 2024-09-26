import React, { useEffect, useState } from "react";

const PriceLoading = () => {
  const [loadingText, setLoadingText] = useState("!#€#");

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingText(GenerateString());
    }, 100);

    return () => clearInterval(interval);
  }, []);
  return <div className="text-gray-500">{loadingText}</div>;
};

export default PriceLoading;

const GenerateString = () => {
  var result: string = "";
  var characters: string = "!#@&$GZZD";
  var charactersLength: number = characters.length;
  for (var i = 0; i < 4; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
