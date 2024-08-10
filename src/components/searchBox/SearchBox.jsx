import React, { useState } from "react";
import { OpenStreetMapProvider } from "leaflet-geosearch";

const SearchBox = ({ onSelect }) => {
  const [query, setQuery] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    const provider = new OpenStreetMapProvider();
    const results = await provider.search({ query });
    if (results && results.length > 0) {
      const { x, y, label } = results[0];
      onSelect({ lat: y, lng: x, address: label });
    }
  };

  return (
    <form onSubmit={handleSearch} className="mb-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a location"
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
      />
      <button type="submit" className="hidden">
        Search
      </button>
    </form>
  );
};

export default SearchBox;
