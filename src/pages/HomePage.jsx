import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function HomePage() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://nouriva-backend.onrender.com/menu")
      .then(res => {
        setMenu(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading menu:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="text-center mt-10 text-lg text-amber-700">
      Loading Nouriva meals...
    </div>
  );

  return (
    <div className="min-h-screen bg-lime-50 text-gray-800 p-8">
      <h1 className="text-3xl font-bold text-center text-emerald-700 mb-8">
        Nouriva Club
      </h1>
      <p className="text-center italic text-sm text-gray-500 mb-6">
        All recipes are designed for 1 adult serving.
      </p>
      {menu.map((day, index) => (
        <div key={index} className="mb-12">
          <h2 className="text-xl font-semibold text-amber-600 mb-4">
            Day {index + 1}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {["breakfast", "lunch", "dinner"].map((type) => {
              const meal = day[type];
              return (
                <div key={meal.id} className="bg-white border-l-4 border-emerald-500 p-4 rounded shadow">
                  <p className="text-xs uppercase text-emerald-600 font-bold mb-1">
                    {type}
                  </p>
                  <Link to={`/meal/${meal.id}`} className="text-lg font-bold text-emerald-700 hover:underline mb-2 block">
                    {meal.name}
                  </Link>
                  <ul className="list-disc pl-5 text-sm text-gray-700">
                    {Object.entries(meal.ingredients)
                      .slice(0, 3)
                      .map(([name, info], i) => (
                        <li key={i}>
                          {info.quantity} {info.unit} {name}
                        </li>
                      ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default HomePage;