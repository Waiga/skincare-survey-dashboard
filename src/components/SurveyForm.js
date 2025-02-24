import React, { useState } from 'react';

function SurveyForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    userType: 'customer',
    skinType: '',
    concerns: [],
    productUsage: '',
    satisfaction: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      const concerns = [...formData.concerns];
      if (checked) {
        concerns.push(value);
      } else {
        const index = concerns.indexOf(value);
        if (index > -1) concerns.splice(index, 1);
      }
      setFormData({ ...formData, concerns });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, timestamp: new Date().toISOString() });
    setFormData({
      userType: 'customer',
      skinType: '',
      concerns: [],
      productUsage: '',
      satisfaction: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div>
        <label className="block text-sm font-medium text-gray-700">User Type</label>
        <select
          name="userType"
          value={formData.userType}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
        >
          <option value="customer">Customer</option>
          <option value="retailer">Retailer</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Skin Type</label>
        <div className="mt-2 space-y-2">
          {['Dry', 'Oily', 'Combination', 'Normal', 'Sensitive'].map((type) => (
            <div key={type} className="flex items-center">
              <input
                type="radio"
                name="skinType"
                value={type.toLowerCase()}
                checked={formData.skinType === type.toLowerCase()}
                onChange={handleChange}
                className="h-4 w-4 text-primary focus:ring-primary"
              />
              <label className="ml-2 text-sm text-gray-700">{type}</label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Skin Concerns</label>
        <div className="mt-2 space-y-2">
          {['Acne', 'Aging', 'Pigmentation', 'Sensitivity', 'Dryness'].map((concern) => (
            <div key={concern} className="flex items-center">
              <input
                type="checkbox"
                name="concerns"
                value={concern.toLowerCase()}
                checked={formData.concerns.includes(concern.toLowerCase())}
                onChange={handleChange}
                className="h-4 w-4 text-primary focus:ring-primary"
              />
              <label className="ml-2 text-sm text-gray-700">{concern}</label>
            </div>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      >
        Submit Survey
      </button>
    </form>
  );
}

export default SurveyForm; 