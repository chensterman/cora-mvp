import React from 'react';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';

interface Feature {
  name: string;
  description: string;
  status: 'planned' | 'in-progress' | 'completed';
}

interface FeatureCategory {
  name: string;
  features: Feature[];
}

export default function Roadmap() {
  const navigate = useNavigate();
  const categories: FeatureCategory[] = [
    {
      name: "Actions",
      features: [
        { name: "Blind Spot", description: "Identify blind spots in customer engagement", status: "completed" },
        { name: "Prepare for Customer Call", description: "Automated call preparation assistance", status: "in-progress" },
        { name: "Ever boarding", description: "Expand time to value for customers", status: "planned" },
        { name: "Revenue Campaigns", description: "Automated outreach based on revenue-driving factos.", status: "completed" },
        { name: "Create Case Studies", description: "Document customer success stories", status: "planned" },
        { name: "Upsell Opportunities", description: "Identify potential upsell candidates", status: "in-progress" }
      ]
    },
    {
      name: "Insights",
      features: [
        { name: "Account Snapshot", description: "Quick overview of account status", status: "completed" },
        { name: "Kai Coach", description: "Insights from customer conversations", status: "in-progress" },
        { name: "Customer Profile Benchmarking", description: "Compare against similar customers", status: "planned" },
        { name: "Voice of Customer", description: "Gather product roadmap inputs", status: "planned" },
        { name: "Executive Tracking", description: "Monitor executive involvement", status: "in-progress" }
      ]
    }
  ];

  return (
    <div className="bg-gray-500 w-[800px] h-[600px] p-1">
      <div className="flex flex-col border border-gray-500 rounded-xl p-4 bg-black shadow-sm h-full">
        {/* Header */}
        <div className="flex items-center flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-white mr-2"/>
          <h1 className="text-3xl font-bold text-white">Kai AI</h1>
        </div>

        {/* Subheader */}
        <div className="flex-shrink-0">
          <h1 className="text-xl mt-4 text-white">Product Roadmap</h1>
        </div>

        {/* Categories */}
        <div className="mt-4 flex flex-col gap-8 overflow-y-auto">
          {categories.map((category) => (
            <div key={category.name} className="border border-gray-500 rounded-lg p-6">
              <h3 className="text-xl font-medium text-white mb-4">{category.name}</h3>
              <div className="grid grid-cols-2 gap-4">
                {category.features.map((feature) => (
                  <div
                    key={feature.name}
                    className="border border-gray-600 rounded-lg p-4 bg-gray-900 hover:bg-gray-700 cursor-pointer"
                    onClick={() => {
                      if (feature.name === "Blind Spot") {
                        navigate('/tasks');
                      } else if (feature.name === "Revenue Campaigns") {
                        navigate('/campaign-list');
                      }
                    }}
                  >
                    <div className="flex items-center mb-2">
                      <div className={`w-2 h-2 rounded-full mr-2 ${
                        feature.status === 'completed' ? 'bg-green-500' :
                        feature.status === 'in-progress' ? 'bg-yellow-500' :
                        'bg-gray-500'
                      }`}/>
                      <span className="text-white font-medium">{feature.name}</span>
                    </div>
                    <p className="text-gray-400 text-sm">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center mt-4 flex-shrink-0">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-2"/>
              <span className="text-white text-sm">Completed</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"/>
              <span className="text-white text-sm">In Progress</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-gray-500 mr-2"/>
              <span className="text-white text-sm">Planned</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
