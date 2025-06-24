import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function MealPage() {
  const { mealId } = useParams();
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    axios.get(`https://nouriva-backend.onrender.com/meal/${mealId}`)
      .then(res => setMeal(res.data))
      .catch(err => console.error(err));
  }, [mealId]);

  if (!meal) return <div>Loading...</div>;

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{meal.name}</h1>
      {meal.image && (
        <div className="flex justify-center items-center mb-6" style={{ height: '80vh' }}>
          <img
            src={meal.image}
            alt={meal.name}
            className="rounded"
            style={{ width: '80%', height: '80%', objectFit: 'cover' }}
          />
        </div>
      )}
      <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
      <ul className="list-disc pl-6 mb-4">
        {Object.entries(meal.ingredients).map(([name, data], idx) => (
          <li key={idx}>{name}: {data.quantity} {data.unit}</li>
        ))}
      </ul>
      <h2 className="text-xl font-semibold mb-2">Instructions</h2>
      <ul className="list-none pl-2 text-sm text-gray-700 space-y-2">
        {meal.steps.map((step, index) => (
        <li key={index}>{step}</li>
        ))}
      </ul>
    </div>
  );
}

export default MealPage;