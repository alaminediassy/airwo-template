import { useState, useEffect } from "react";
import Link from "next/link";


export default function PlacesCard() {
  const [dataPlaces, setDataPlaces] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3000/api/places");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setDataPlaces(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
        <div className="flex min-h-100 flex-col items-center dark">
          <form className="">
            <label className="sr-only">Search</label>
            <div className="relative w-1/5">
              <input
              onChange={(e) => setSearchValue(e.target.value)}
              value={searchValue}
                type="text"
                id="simpleSearch"
                className="border border-gray-400 dark:text-gray-700 rounded-md px-4 py-2 w-200 focus:outline-none focus:ring-200 focus:ring-blue-600 dark:bg-gray-200 focus:border-transparent"
                placeholder="Search..."
                required
              />
            </div>
          </form>
        </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pr-20 pl-20 pt-10 pb-10">
        {dataPlaces
        .filter((data) =>
            data.name.toLowerCase().includes(searchValue.toLocaleLowerCase())
        )
        .map((data) => (
          <Link key={data.id} href={`/places/${data.id}`}>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer">
              <div className="relative pb-48 overflow-hidden">
                <img
                  className="absolute inset-0 h-full w-full object-cover"
                  src={data.image}
                  alt="image"
                />
              </div>

              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900 truncate">
                  {data.name}
                </h3>
                <p className="text-sm font-medium text-gray-500">
                  {data.city.name}
                </p>
                <p className="text-sm font-medium text-gray-500">
                  {data.priceByNight}
                  <span>€ / night</span>
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
