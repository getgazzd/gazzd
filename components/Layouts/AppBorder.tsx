import { ReactNode } from "react";
import { useInView } from "react-intersection-observer";

import AffiliateBar from "components/AffiliateBar/AffiliateBar";
import Footer from "components/Footer";
import FooterBar from "components/Footer/FooterBar";
import Header from "components/Header";

type Props = {
  children: ReactNode;
};
const AppBorder = ({ children }: Props): JSX.Element => {
  const { ref, inView } = useInView({
    root: null,
    rootMargin: "0px 0px -400px 0px",
    threshold: 0.0001,
  });

  return (
    <>
      <div
        className="z-30 w-full sticky top-0 transition-opacity duration-300 !md:opacity-1"
        style={
          inView ? { opacity: "0", pointerEvents: "auto" } : { opacity: "1" }
        }
      >
        <Header />
      </div>
      <div className="z-40 ml-12 border-r border-l border-borderGray overflow-visible md:mx-16 content-area max-w-full">
        <AffiliateBar />
        {children}
      </div>
      <div className={`sticky bottom-0 z-20 w-full`}>
        <FooterBar />
      </div>

      <div ref={ref}>
        <Footer />
      </div>
    </>
  );
};

export default AppBorder;
