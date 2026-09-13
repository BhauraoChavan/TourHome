import ListingCard from './ListingCard';

const ListingGrid = ({ listings }) => {
  if (!listings || listings.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No listings found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {listings.map((listing) => (
        <ListingCard key={listing._id} listing={listing} />
      ))}
    </div>
  );
};

export default ListingGrid;