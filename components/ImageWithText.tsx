import Image from "next/image";
interface ImageWithTextProps {
  image: {
    alt: string;
  };
  children: JSX.Element;
}

export default function ImageWithText({
  image = { alt: "Image Alt" },
  children,
}: ImageWithTextProps) {
  return (
    <div>
      <div className="relative">{/* <Image alt='' {...image} /> */}</div>
      {children}
    </div>
  );
}
