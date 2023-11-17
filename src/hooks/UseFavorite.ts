import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import toast from "react-hot-toast";

import { User } from "@prisma/client";
import useLoginModal from "./useLoginModal";

type IuseFavorite = {
  listingId: string;
  currentUser?: User | null;
};

const useFavorite = ({ listingId, currentUser }: IuseFavorite) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  // Check if the current user has favorited the listing
  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(listingId);
  }, [currentUser, listingId]);

  // This function is called when the favorite button is clicked
  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      // Prevent the default behavior
      e.stopPropagation();

      // If the user is not logged in, open the login modal
      if (!currentUser) {
        return loginModal.onOpen();
      }

      try {
        let request;

        // If the user has favorited the listing
        if (hasFavorited) {
          // Delete the favorite
          request = () => axios.delete(`/api/favorites/${listingId}`);
        } else {
          // Otherwise, add the favorite
          request = () => axios.post(`/api/favorites/${listingId}`);
        }

        // Wait for the request to complete
        await request();

        // Refresh the page to update the favorite count
        router.refresh();
        toast.success("Success!");
      } catch (error) {
        toast.error("Something went wrong!");
      }
    },
    [loginModal, hasFavorited, listingId, currentUser, router]
  );

  return {
    hasFavorited,
    toggleFavorite,
  };
};

export default useFavorite;
