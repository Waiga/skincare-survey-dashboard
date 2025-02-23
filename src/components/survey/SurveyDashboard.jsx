import React, { useState, useEffect } from 'react';
import { Card, CardHeader } from "../../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import SurveyForm from './SurveyForm';
import AnalyticsDashboard from './AnalyticsDashboard';
import QRCodeGenerator from './QRCodeGenerator';

// Add console log to debug
export default function SurveyDashboard() {
  const [surveyResponses, setSurveyResponses] = useState([]);
  const [activeTab, setActiveTab] = useState("analytics"); // Start with analytics tab
  
  useEffect(() => {
    // Add sample data for both types
    const sampleData = [
      {
        id: '1',
        type: 'retailer',
        timestamp: new Date().toISOString(),
        r1: 0,
        r2: 1,
        r3: 0,
        r4: 2,
        r5: 0,
        r6: 0,
        r7: 1,
        r8: 2
      },
      {
        id: '2',
        type: 'customer',
        timestamp: new Date().toISOString(),
        c1: 1,
        c2: 0,
        c3: 1,
        c4: 0,
        c5: 2,
        c6: 0,
        c7: 1,
        c8: 0
      }
    ];
    
    setSurveyResponses(sampleData);
    console.log('Sample data loaded:', sampleData); // Debug log
  }, []);

  console.log('Current tab:', activeTab); // Debug log

  // Use the URL Vercel provides
  const surveyUrl = process.env.REACT_APP_SURVEY_URL || window.location.origin + '/survey';

  const handleSurveySubmit = (response) => {
    console.log('New survey response:', response); // Debug log
    setSurveyResponses(prev => [...prev, response]);
  };

  return (
    <div className="max-w-6xl mx-auto p-4" data-testid="survey-dashboard">
      <header className="mb-8">
        <h1 className="text-2xl font-bold">Skincare Survey Dashboard</h1>
      </header>
      
      <Card>
        <CardHeader>
          <Tabs defaultValue="analytics" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="entry">Data Entry</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="entry" className="mt-6">
              <SurveyForm onSubmit={(data) => setSurveyResponses(prev => [...prev, data])} />
            </TabsContent>

            <TabsContent value="analytics" className="mt-6">
              <AnalyticsDashboard responses={surveyResponses} />
            </TabsContent>
          </Tabs>
        </CardHeader>
      </Card>
    </div>
  );
} 