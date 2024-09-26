import { useEffect, useState } from "react";

import Layout from "components/Layouts/PageLayout";

const URL =
  "https://www.figma.com/proto/7Jqgbx5pLPZ2m5UaPSRJGN/Presentations?page-id=337%3A1882&type=design&node-id=337-1883&viewport=25%2C617%2C0.09&t=7Z1cfBckF7yGGVVg-1&scaling=contain&mode=design";

const Prospect = () => {
  const [redirecting, setRedirecting] = useState<boolean>(false);
  const [wait, setWait] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setWait(false);
    }, 4500);
    setTimeout(() => {
      setRedirecting(true);
    }, 4500);
  }, []);

  useEffect(() => {
    if (!wait) {
      window.location.replace(URL);
    }
  }, [wait]);

  return (
    <Layout title="GAZZD - Prospect" description="">
      {redirecting ? (
        <div>
          <p
            style={{
              fontSize: 24,
              textAlign: "center",
              lineHeight: 1.2,
            }}
          >
            Please hold while we redirect you to the dungeon....
          </p>
          <br />
          <p style={{ textAlign: "center" }}>{`// GAZZD dev team`}</p>
        </div>
      ) : (
        <div>
          <p style={{ fontSize: 24, textAlign: "center", lineHeight: 1.2 }}>
            So, you want to see the prospect eh?
          </p>
          <br />
          <p style={{ fontSize: 24, textAlign: "center" }}>
            Ok, let us redirect yah.
          </p>
        </div>
      )}
    </Layout>
  );
};

export default Prospect;
