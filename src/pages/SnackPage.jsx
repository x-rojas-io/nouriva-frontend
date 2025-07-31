import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SnackPage() {
  const [snacks, setSnacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("https://nouriva-backend.onrender.com/snack")
      .then((res) => {
        setSnacks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading snacks:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="text-center mt-10 text-lg text-amber-700">
      Loading snacks...
    </div>
  );

  return (
    <div className="min-h-screen bg-lime-50 px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-emerald-700 mb-8">
        Healthy Snacks
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {snacks.map((snack) => (
          <div
            key={snack.id}
            className="bg-white shadow rounded overflow-hidden cursor-pointer hover:shadow-md transition"
            onClick={() => navigate(`/snack/${snack.id}`)}
          >
            {snack.image && (
              <img
                src={snack.image}
                alt={snack.name}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold text-emerald-600">
                {snack.name}
              </h2>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {Object.keys(snack.ingredients).length} ingredients
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SnackPage;