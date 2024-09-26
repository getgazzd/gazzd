import Link from "next/link";

interface Props {
  text: string;
  color: string;
  link: string;
}

const theme = {
  primary: "bg-green-300",
  secondary: "bg-blue-300",
};

function LinkButton({ text, color, link }: Props) {
  return (
    <Link href={`${link}`} passHref>
      <button
        className={`text-green-800 bg-green-300 font-semibold uppercase self-start mx-auto px-6 py-3 hover:bg-green-400 rounded-sm`}
      >
        {text}
      </button>
    </Link>
  );
}

export default LinkButton;
