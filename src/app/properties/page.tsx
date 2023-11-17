import EmptyState from "@/components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getListings from "../actions/getListings";
import PropertiesClient from "./PropertiesClient";

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <EmptyState
        title="You are not logged in"
        subtilte="Log in to see your trips"
      />
    );
  }

  const listings = await getListings({ userId: currentUser?.id });

  if (listings.length === 0) {
    return (
      <EmptyState
        title="No roperties found"
        subtilte="Looks like you have no properties yet"
      />
    );
  }

  return <PropertiesClient listings={listings} currentUser={currentUser} />;
};
export default PropertiesPage;
