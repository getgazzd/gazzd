import FooterContent from "./FooterContent";

const Footer = ({ ...rest }) => {
  return (
    <div
      {...rest}
      className="z-10 box-content flex min-w-full flex-col md:absolute bg-black/50"
      data-testid="footer"
    >
      <FooterContent />
    </div>
  );
};

export default Footer;
