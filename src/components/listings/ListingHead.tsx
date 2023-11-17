"use client";

import useCountries from "@/hooks/useCountries";
import { User } from "@prisma/client";
import Heading from "../Heading";
import Image from "next/image";
import HeartButton from "../HeartButton";

type ListingHeadProps = {
  title: string;
  imageSrc: string;
  locationVlaue: string;
  id: string;
  currentUser?: User | null;
};

const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  imageSrc,
  locationVlaue,
  id,
  currentUser,
}) => {
  const { getByValue } = useCountries();

  const location = getByValue(locationVlaue);

  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />

      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
        <Image
          fill
          src={imageSrc}
          alt={title}
          className="object-cover w-full"
        />

        <div className="absolute top-5 right-5">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};
export default ListingHead;
