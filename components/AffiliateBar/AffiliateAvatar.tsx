import Image from "next/image";
import Link from "next/link";
import { Steamer } from "types/steamer";

export const AffiliateAvatar = ({
  steamer,
}: {
  steamer: Steamer | undefined;
}) => {
  if (!steamer?.avatar?.fields?.file?.url) return <div className="ml-3" />;

  const src =
    steamer && window
      ? window.location.protocol + steamer.avatar.fields.file.url
      : "";

  if (steamer.steamerPage) {
    return (
      <Link passHref href={`/steamer/${steamer.handle}`}>
        <div className="w-12 h-12 p-2 mx-2 select-none" role="button">
          <Image
            src={src}
            className="rounded-full"
            alt={steamer?.fullName}
            layout="responsive"
            width={150}
            height={150}
          />
        </div>
      </Link>
    );
  }
  return (
    <>
      {steamer?.steamerPage ? (
        <Link passHref href={`/steamer/${steamer.handle}`}>
          <div className="w-12 h-12 p-1 mx-2 select-none">
            <Image
              src={src}
              alt={steamer?.fullName}
              className="rounded-full"
              height={200}
              width={200}
              objectFit="cover"
            />
          </div>
        </Link>
      ) : (
        <div className="w-12 h-12 p-1 mx-2 select-none">
          <Image
            src={src}
            alt={steamer?.fullName}
            className="rounded-full"
            height={200}
            width={200}
            objectFit="cover"
          />
        </div>
      )}
    </>
  );
};
