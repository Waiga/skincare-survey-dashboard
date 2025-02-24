import React from 'react';

export default function SurveyFields() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          User Type
        </label>
        <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary rounded-md">
          <option>Customer</option>
          <option>Retailer</option>
        </select>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Skin Type
        </label>
        <div className="space-y-2">
          {['Dry', 'Oily', 'Combination', 'Normal', 'Sensitive'].map((type) => (
            <div key={type} className="flex items-center">
              <input
                type="radio"
                name="skinType"
                id={type}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
              />
              <label htmlFor={type} className="ml-3 block text-sm text-gray-700">
                {type}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Skin Concerns
        </label>
        <div className="space-y-2">
          {['Acne', 'Aging', 'Pigmentation', 'Sensitivity', 'Dryness'].map((concern) => (
            <div key={concern} className="flex items-center">
              <input
                type="checkbox"
                id={concern}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label htmlFor={concern} className="ml-3 block text-sm text-gray-700">
                {concern}
              </label>
            </div>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      >
        Submit
      </button>
    </div>
  );
} 