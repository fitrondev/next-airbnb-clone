import prisma from "@/libs/prismadb";

type Iparams = {
  listingId?: string;
};

// define function
export default async function getListingById(params: Iparams) {
  try {
    // get listingId from params
    const { listingId } = params;
    // get listing by listingId
    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: true,
      },
    });

    if (!listing) {
      return null;
    }
    // return listing
    return listing;
  } catch (error: any) {
    throw new Error(error);
  }
}
