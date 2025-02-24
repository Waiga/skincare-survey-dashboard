import React, { useState } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import SurveyForm from './SurveyForm';
import AnalyticsDashboard from './AnalyticsDashboard';

function SurveyDashboard() {
  const [surveyResponses, setSurveyResponses] = useState([]);

  const handleSurveySubmit = (response) => {
    setSurveyResponses([...surveyResponses, { ...response, id: Date.now() }]);
  };

  const handleExportData = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      surveyResponses.map(row => Object.values(row).join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "survey_responses.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Tabs.Root defaultValue="survey" className="flex flex-col">
      <Tabs.List className="flex border-b border-gray-200 mb-4">
        <Tabs.Trigger 
          value="survey"
          className="px-4 py-2 hover:bg-gray-100 border-b-2 border-transparent data-[state=active]:border-primary"
        >
          Survey Form
        </Tabs.Trigger>
        <Tabs.Trigger 
          value="analytics"
          className="px-4 py-2 hover:bg-gray-100 border-b-2 border-transparent data-[state=active]:border-primary"
        >
          Analytics
        </Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="survey">
        <SurveyForm onSubmit={handleSurveySubmit} />
      </Tabs.Content>

      <Tabs.Content value="analytics">
        <AnalyticsDashboard 
          responses={surveyResponses} 
          onExport={handleExportData}
        />
      </Tabs.Content>
    </Tabs.Root>
  );
}

export default SurveyDashboard; 