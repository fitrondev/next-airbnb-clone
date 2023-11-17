"use client";

import Image from "next/image";

type AvatarProps = {
  img?: string | null;
};

const Avatar: React.FC<AvatarProps> = ({ img }) => {
  return (
    <Image
      src={img || "/images/placeholder.jpg"}
      // src="/images/placeholder.jpg"
      alt="avatar"
      width="40"
      height="40"
      priority={true}
      className="rounded-full"
    />
  );
};

export default Avatar;
