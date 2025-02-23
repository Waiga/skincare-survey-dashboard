import React from 'react';
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LineChart, Line } from 'recharts';
import { retailerQuestions } from './RetailerQuestions';
import { customerQuestions } from './CustomerQuestions';

export default function AnalyticsDashboard({ responses = [] }) {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  
  const retailerResponses = responses.filter(r => r.type === 'retailer');
  const customerResponses = responses.filter(r => r.type === 'customer');

  // Helper function to get response data for a specific question
  const getQuestionData = (questionId, responses, questions) => {
    const counts = responses.reduce((acc, response) => {
      const answer = response[questionId];
      if (answer !== undefined) {
        acc[answer] = (acc[answer] || 0) + 1;
      }
      return acc;
    }, {});

    const question = questions.find(q => q.id === questionId);
    return question?.options.map((option, index) => ({
      name: option,
      value: counts[index] || 0,
      percentage: (counts[index] || 0) / (responses.length || 1) * 100
    })) || [];
  };

  // Calculate key insights
  const getKeyInsights = () => {
    if (responses.length === 0) return [];

    const insights = [];
    
    // Retailer Insights
    if (retailerResponses.length > 0) {
      const techAdoption = getQuestionData('r5', retailerResponses, retailerQuestions);
      const highestTechAdoption = techAdoption.reduce((a, b) => a.value > b.value ? a : b);
      insights.push(`${Math.round(highestTechAdoption.percentage)}% of retailers ${highestTechAdoption.name.toLowerCase()}`);

      const budget = getQuestionData('r8', retailerResponses, retailerQuestions);
      const topBudget = budget.reduce((a, b) => a.value > b.value ? a : b);
      insights.push(`Most common budget range is ${topBudget.name}`);
    }

    // Customer Insights
    if (customerResponses.length > 0) {
      const trustData = getQuestionData('c4', customerResponses, customerQuestions);
      const trustLevel = trustData.reduce((a, b) => a.value > b.value ? a : b);
      insights.push(`${Math.round(trustLevel.percentage)}% of customers ${trustLevel.name.toLowerCase()}`);
    }

    return insights;
  };

  const handleExport = (format) => {
    if (format === 'csv') {
      const csvContent = [
        // Headers
        ['ID', 'Type', 'Timestamp', ...retailerQuestions.map(q => q.question)].join(','),
        // Data rows
        ...responses.map(response => {
          const answers = retailerQuestions.map(q => {
            const value = response[q.id];
            return value !== undefined ? q.options[value] : '';
          });
          
          return [
            response.id,
            response.type,
            new Date(response.timestamp).toLocaleString(),
            ...answers
          ].join(',');
        })
      ].join('\n');

      // Create download link
      const element = document.createElement('a');
      element.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent);
      element.download = `survey_responses_${new Date().toISOString()}.csv`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  };

  return (
    <div className="space-y-6 p-6 bg-white">
      {/* Key Insights Card */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader>
          <h3 className="text-xl font-bold text-primary">Key Insights</h3>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {getKeyInsights().map((insight, index) => (
              <div key={index} className="p-4 bg-white rounded-lg shadow-sm">
                <p className="text-sm text-gray-600">{insight}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Response Distribution */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Response Distribution</h3>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={[
                  { name: 'Retailers', value: retailerResponses.length || 0 },
                  { name: 'Customers', value: customerResponses.length || 0 }
                ]}
                cx="50%"
                cy="50%"
                labelLine={true}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {COLORS.map((color, index) => (
                  <Cell key={`cell-${index}`} fill={color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Retailer Analysis */}
      {retailerResponses.length > 0 && (
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Retailer Analysis</h3>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-[300px]">
                <h4 className="text-sm font-medium mb-4">Technology Adoption Readiness</h4>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={getQuestionData('r5', retailerResponses, retailerQuestions)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" name="Responses" fill="#0088FE" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="h-[300px]">
                <h4 className="text-sm font-medium mb-4">Investment Readiness</h4>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={getQuestionData('r8', retailerResponses, retailerQuestions)}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {COLORS.map((color, index) => (
                        <Cell key={`cell-${index}`} fill={color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Customer Analysis */}
      {customerResponses.length > 0 && (
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Customer Analysis</h3>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-[300px]">
                <h4 className="text-sm font-medium mb-4">AI Trust Level</h4>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={getQuestionData('c4', customerResponses, customerQuestions)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" name="Responses" fill="#00C49F" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="h-[300px]">
                <h4 className="text-sm font-medium mb-4">Product Selection Challenges</h4>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={getQuestionData('c2', customerResponses, customerQuestions)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" name="Responses" fill="#FFBB28" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Detailed Response Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <h3 className="text-lg font-semibold">Response Details</h3>
          <div className="flex gap-2">
            <button 
              onClick={() => handleExport('csv')}
              className="px-4 py-2 text-sm bg-primary text-white rounded-md hover:bg-primary/90"
            >
              Export CSV
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">ID</th>
                  <th className="text-left py-3 px-4">Type</th>
                  <th className="text-left py-3 px-4">Timestamp</th>
                  <th className="text-left py-3 px-4">Details</th>
                </tr>
              </thead>
              <tbody>
                {responses.map((response) => (
                  <tr key={response.id} className="border-b">
                    <td className="py-3 px-4">{response.id}</td>
                    <td className="py-3 px-4 capitalize">{response.type}</td>
                    <td className="py-3 px-4">
                      {new Date(response.timestamp).toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <details className="cursor-pointer">
                        <summary className="text-primary">View Details</summary>
                        <div className="mt-2 space-y-1 text-sm">
                          {Object.entries(response)
                            .filter(([key]) => key.startsWith(response.type === 'retailer' ? 'r' : 'c'))
                            .map(([key, value]) => {
                              const questions = response.type === 'retailer' ? retailerQuestions : customerQuestions;
                              const question = questions.find(q => q.id === key);
                              return question ? (
                                <div key={key}>
                                  <span className="font-medium">{question.question}: </span>
                                  {question.options[value]}
                                </div>
                              ) : null;
                            })}
                        </div>
                      </details>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 