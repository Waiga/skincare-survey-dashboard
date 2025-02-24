import React from 'react';
import { Card, CardContent } from "../../components/ui/card";
import SurveyForm from './SurveyForm';

export default function PublicSurvey() {
  const handleSubmit = async (response) => {
    try {
      // Here you would send the response to your backend
      await fetch('/api/survey-responses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(response),
      });
      alert('Thank you for your response!');
    } catch (error) {
      console.error('Error submitting response:', error);
      alert('There was an error submitting your response. Please try again.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-foreground">Skincare Survey</h1>
        <p className="text-muted-foreground mt-2">
          Help us understand your skincare preferences and needs
        </p>
      </header>
      
      <Card>
        <CardContent className="pt-6">
          <SurveyForm onSubmit={handleSubmit} isPublic={true} />
        </CardContent>
      </Card>
    </div>
  );
} 