import { ContentfulProduct } from "types/product";

interface Props {
  content: ContentfulProduct | null;
}

export const ProductGradient = ({ content }: Props) => {
  if (!content) return null;
  const gradientColor: string = content?.accentColor;
  return (
    <div className="pointer-events-none absolute inset-0 -left-16 overflow-hidden z-0 box-border flex h-full select-none  flex-col opacity-10 md:-right-16">
      <div className="radialGradient1 z-0 h-full opacity-60" />
      <div className="radialGradient2 z-0 fixed bottom-0 right-0 w-screen h-full opacity-25" />
      <style jsx>{`
        .radialGradient1 {
          background: radial-gradient(
            circle at top,
            ${gradientColor} 0,
            rgba(0, 0, 0, 0) 70%
          );
          background-position: left top;
        }
        .radialGradient2 {
          background: radial-gradient(
            circle at 100%,
            ${gradientColor} 0,
            rgba(0, 0, 0, 0) 40%
          );
        }
      `}</style>
    </div>
  );
};
