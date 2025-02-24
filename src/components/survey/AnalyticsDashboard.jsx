import React from 'react';
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
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
      percentage: (counts[index] || 0) / responses.length * 100
    })) || [];
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Response Distribution</h3>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={[
                  { name: 'Retailers', value: retailerResponses.length },
                  { name: 'Customers', value: customerResponses.length }
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
    </div>
  );
}
