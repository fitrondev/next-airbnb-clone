import EmptyState from "@/components/EmptyState";

import getCurrentUser from "../actions/getCurrentUser";
import GetFavoriteListings from "../actions/getFavoriteListing";
import FavoritesClient from "./FavoritesClient";

const ListingPage = async () => {
  const listings = await GetFavoriteListings();
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <EmptyState
        title="No Favorites"
        subtilte="You don't have any favorites yet"
      />
    );
  }

  return (
    <>
      <FavoritesClient listings={listings} currentUser={currentUser} />
    </>
  );
};
export default ListingPage;
