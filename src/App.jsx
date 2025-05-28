import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [days, setDays] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://nouriva-backend.onrender.com/days")
      .then(res => {
        setDays(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center mt-10 text-lg text-amber-700">Loading Nouriva meals...</div>;

  return (
    <div className="min-h-screen bg-lime-50 text-gray-800 p-8">
      <h1 className="text-3xl font-bold text-center text-emerald-700 mb-8">Nouriva Keto Meal Plan</h1>
      {days.map(day => (
        <div key={day.day} className="mb-10">
          <h2 className="text-xl font-semibold text-amber-600 mb-4">Day {day.day}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {day.meals.map(meal => (
              <div key={meal.id} className="bg-white border-l-4 border-emerald-500 p-4 rounded shadow">
                <p className="text-xs uppercase text-emerald-600 font-bold mb-1">{meal.type}</p>
                <h3 className="text-lg font-bold mb-2">{meal.title}</h3>
                <ul className="list-disc pl-5 text-sm text-gray-700">
                  {meal.ingredients.slice(0, 3).map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
