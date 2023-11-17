import EmptyState from "@/components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import TripsClient from "./TripsClient";

const TripsPage = async () => {
  const currentUser = await getCurrentUser();
  const reservations = await getReservations({ userId: currentUser?.id });

  if (!currentUser) {
    return (
      <EmptyState
        title="You are not logged in"
        subtilte="Log in to see your trips"
      />
    );
  }

  if (reservations.length === 0) {
    return (
      <EmptyState title="You have no trips" subtilte="Try creating a listing" />
    );
  }

  return <TripsClient reservations={reservations} currentUser={currentUser} />;
};
export default TripsPage;
