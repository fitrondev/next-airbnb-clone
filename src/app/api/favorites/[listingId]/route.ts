import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/libs/prismadb";

type Iparams = {
  listingId?: string;
};

// Create a new POST request handler
export async function POST(request: Request, { params }: { params: Iparams }) {
  // Call the getCurrentUser function to get the current user
  const currentUser = await getCurrentUser();

  // If the user is not logged in, return an error
  if (!currentUser) {
    return NextResponse.error();
  }

  // Destructure the listing ID from the params object
  const { listingId } = params;

  // If the listing ID is invalid, throw an error
  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid ID");
  }

  // Create a new favoriteIds array that contains all of the current
  // user's favorite IDs, or an empty array if there are none
  let favoriteIds = [...(currentUser.favoriteIds || [])];

  // Add the listing ID to the favorite IDs array
  favoriteIds.push(listingId);

  // Update the user's favorite IDs in the database
  const user = await prisma.user.update({
    where: { id: currentUser.id },
    data: { favoriteIds },
  });

  return NextResponse.json(user);
}

// Create a new DELETE request handler
export async function DELETE(
  request: Request,
  { params }: { params: Iparams }
) {
  // Call the getCurrentUser function to get the current user
  const currentUser = await getCurrentUser();

  // If the user is not logged in, return an error
  if (!currentUser) {
    return NextResponse.error();
  }

  // Destructure the listing ID from the params object
  const { listingId } = params;

  // If the listing ID is invalid, throw an error
  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid ID");
  }

  let favoriteIds = [...(currentUser.favoriteIds || [])];

  favoriteIds = favoriteIds.filter((id) => id !== listingId);

  const user = await prisma.user.update({
    where: { id: currentUser.id },
    data: { favoriteIds },
  });

  return NextResponse.json(user);
}
