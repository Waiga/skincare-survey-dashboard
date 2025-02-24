import React, { useState } from 'react';
import { Card, CardContent } from "../../components/ui/card";
import { retailerQuestions } from './RetailerQuestions';
import { customerQuestions } from './CustomerQuestions';

export default function SurveyForm({ onSubmit }) {
  const [surveyType, setSurveyType] = useState('customer'); // Default to customer
  const [responses, setResponses] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = {
      id: Date.now().toString(),
      type: surveyType,
      timestamp: new Date().toISOString(),
      ...responses
    };

    console.log('Submitting survey:', formData); // Debug log
    onSubmit(formData);
    
    // Reset form
    setResponses({});
    e.target.reset();
    
    // Reset form submitted message after 3 seconds
    setTimeout(() => setFormSubmitted(false), 3000);
  };

  const handleResponseChange = (questionId, value) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: parseInt(value)
    }));
  };

  const questions = surveyType === 'retailer' ? retailerQuestions : customerQuestions;
  const isFormComplete = Object.keys(responses).length === questions.length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">
          {surveyType === "retailer" ? "Retailer" : "Customer"} Survey Form
        </h2>
        <div className="space-x-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="surveyType"
              value="customer"
              checked={surveyType === 'customer'}
              onChange={(e) => setSurveyType(e.target.value)}
              className="mr-2"
            />
            Customer Survey
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="surveyType"
              value="retailer"
              checked={surveyType === 'retailer'}
              onChange={(e) => setSurveyType(e.target.value)}
              className="mr-2"
            />
            Retailer Survey
          </label>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            {questions.map((q, qIndex) => (
              <div key={q.id} className="space-y-4">
                <label className="text-lg font-medium text-foreground">
                  {qIndex + 1}. {q.question}
                </label>
                <div className="grid gap-3">
                  {q.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-3 hover:bg-muted/50 p-2 rounded-md transition-colors">
                      <input
                        type="radio"
                        id={`${q.id}_${index}`}
                        name={q.id}
                        checked={responses[q.id] === index}
                        onChange={(e) => handleResponseChange(q.id, e.target.value)}
                        className="h-4 w-4 border-primary text-primary focus:ring-primary"
                      />
                      <label 
                        htmlFor={`${q.id}_${index}`}
                        className="text-sm text-muted-foreground cursor-pointer flex-1"
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            
            <div className="flex justify-between items-center pt-6">
              <div className="text-sm text-muted-foreground">
                {!isFormComplete && `${Object.keys(responses).length} of ${questions.length} questions answered`}
                {formSubmitted && <span className="text-green-600">Survey submitted successfully!</span>}
              </div>
              <button 
                type="submit"
                className="px-6 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!isFormComplete}
              >
                Submit Survey
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 