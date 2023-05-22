import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function PlaceDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [place, setPlace] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`http://localhost:3000/api/places/${id}`);
      const data = await response.json();
      setPlace(data);
    }
    fetchData();
  }, [id]);

  if (!place) {
    return <div>Loading...</div>;
  }
 

  return (
    <div>
      <main className="flex min-h-[calc(100vh-100px)] flex-col pt-4 max-w-7xl mx-auto px-4 pb-6">
        <div>
          <img
            src={place.image}
            alt={place.name}
            className="h-96 w-full rounded-md object-cover mb-4"
          />
          <div className="flex flex-col md:flex-row">
            <div className="flex-1 flex-grow">
              <h2 className="text-xl font-medium text-gray-800 dark:text-gray-100">
                {place.name}
              </h2>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {place.city.name}
              </p>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {place.priceByNight}€ / night
              </p>
              
              <p className="text-sm font-small text-gray-500 dark:text-gray-300">
                {place.description}
              </p>
              
            </div>
            <div className="w-80">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="flex items-center p-4">
                  <img
                    src={place.host.avatar}
                    alt={place.host.name}
                    className="h-10 rounded-full"
                  />
                  <h3 className="text-lg font-medium text-gray-900 ml-2 truncate">
                    {place.host.name}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
