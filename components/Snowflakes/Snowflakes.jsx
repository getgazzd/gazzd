import React from "react";

import styles from "../../styles/snowflakes.module.scss";

const Snowflakes = () => {
  const snowFlakesPlaceholder = new Array(100).fill(0);
  // if we are in december month bro
  if (
    new Date().getMonth() === 11 ||
    (typeof window !== "undefined" &&
      window.location.hostname.includes("snowflakes"))
  ) {
    const snowFlakes = Object.groupBy(
      snowFlakesPlaceholder,
      (_, index) => index
    );
    return (
      <div className="fixed inset-0" onLoad={showFlakes()}>
        {Object.keys(snowFlakes).map((snowFlake) => (
          <div key={snowFlake} className={styles.snow} />
        ))}
      </div>
    );
  } else {
    return <></>;
  }
};
export default React.memo(Snowflakes);
