import React, { useState, useEffect } from 'react';
import { Card, CardHeader } from "../../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import SurveyForm from './SurveyForm';
import AnalyticsDashboard from './AnalyticsDashboard';

export default function SurveyDashboard() {
  const [surveyResponses, setSurveyResponses] = useState([]);
  const [activeTab, setActiveTab] = useState("analytics");

  const handleTabChange = (value) => {
    setActiveTab(value);
  };

  useEffect(() => {
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
      }
    ];
    setSurveyResponses(sampleData);
  }, []);

  const handleSurveySubmit = (data) => {
    setSurveyResponses(prev => [...prev, data]);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <header className="mb-8">
        <h1 className="text-2xl font-bold">Skincare Survey Dashboard</h1>
      </header>
      
      <Card>
        <CardHeader>
          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="entry">Data Entry</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="entry" className="mt-6">
              <SurveyForm onSubmit={handleSurveySubmit} />
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