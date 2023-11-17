"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

const Logo = () => {
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push("/");
  }, [router]);
  return (
    <Image
      onClick={handleClick}
      src="/images/logo.png"
      alt="airbnb logo"
      width="100"
      height="100"
      priority={true}
      className="hidden md:block cursor-pointer"
    />
  );
};

export default Logo;
