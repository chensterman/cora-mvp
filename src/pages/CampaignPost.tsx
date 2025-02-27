import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface PostStatus {
  name: string;
  company: string;
  status: string;
  reason: string;
  action: string;
  category: 'new' | 'didnt-reply' | 'their-turn' | null;
}

export default function CampaignPost() {
  const navigate = useNavigate();
  const { type, metric, item } = useParams();

  const post: PostStatus[] = [
    {
      name: "Ali G",
      company: "Hellofresh",
      status: "Offered to meet CFO",
      reason: "N/A",
      action: "Share availability",
      category: "new"
    },
    {
      name: "James A",
      company: "Uber",
      status: "Didn't reply",
      reason: "Didn't talk in 3 months",
      action: "Offer to meet",
      category: "didnt-reply"
    },
    {
      name: "Emily B",
      company: "Lego",
      status: "Didn't reply",
      reason: "3% layoffs in Feb 2025",
      action: "Email out to CFO",
      category: "didnt-reply"
    },
    {
      name: "Matthew N",
      company: "Squarex",
      status: "Didn't reply",
      reason: "N/A",
      action: "Send reminder",
      category: "didnt-reply"
    },
    {
      name: "Amanda C",
      company: "Findco",
      status: "Didn't reply",
      reason: "N/A",
      action: "Send reminder",
      category: "didnt-reply"
    },
    {
      name: "Jay T",
      company: "Klarna",
      status: "Asked if they're satisfied with alternative",
      reason: "likely satisfied with rippling",
      action: "N/A",
      category: "their-turn"
    },
    {
      name: "Aaron S",
      company: "ElevenLabs",
      status: "Asked if they're satisfied with alternative",
      reason: "likely satisfied with rippling",
      action: "N/A",
      category: "their-turn"
    }
  ];

  if (item === 'Usage Paused') {
    post.unshift({ name: "Dylan F", company: "Nike", status: "Responded stopped using AutoPay because of invoicing issues", reason: "HR managers never completed invoicing form", action: "Email out to CFO", category: "new" });
  } else if (item === 'Rippling') {
    post.unshift({ name: "Max J", company: "Shopify", status: "Asked to discuss HCRI pricing", reason: "Using Rippling for HRIS", action: "Schedule meeting / Send Quote", category: "new" });
  } else if (item === 'Never Used') {
    post.unshift({ name: "Rob S", company: "H&M", status: "Asked to hear about product roadmap", reason: "Never activated AutoPay option", action: "Email recent product update", category: "new" });
  }
  
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
        <h1 className="text-xl mt-4 text-white">Revenue Campaign - {type}</h1>
          <div className="flex gap-2 mt-4">
            <div className={`px-4 h-8 rounded-full bg-white inline-flex items-center w-fit text-black text-sm font-medium`}>{metric}</div>
            <div className={`px-4 h-8 rounded-full bg-white inline-flex items-center w-fit text-black text-sm font-medium`}>{item}</div>
          </div>
        </div>

        <div className="mt-4 relative">
          <div className="overflow-hidden border border-gray-200 rounded-lg">
            <div className="max-h-[400px] overflow-y-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 sticky top-0 z-10">
                  <tr>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                      Company
                    </th>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                      Status
                    </th>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                      Reason
                    </th>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {post.map((competitor, index) => (
                    <tr key={index} className={`hover:bg-gray-50 ${
                      competitor.category === 'new' ? 'border-l-4 border-purple-500' :
                      competitor.category === 'didnt-reply' ? 'border-l-4 border-green-500' :
                      competitor.category === 'their-turn' ? 'border-l-4 border-blue-500' : ''
                    }`}>
                      <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {competitor.name}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                        {competitor.company}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500">
                        {competitor.status}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500">
                        {competitor.reason}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500">
                        <button
                          onClick={() => navigate(`/action-email/active`)}
                          className="text-blue-600 hover:text-blue-800 underline focus:outline-none"
                        >
                          {competitor.action}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="flex items-center mt-4">
          <button 
            onClick={() => navigate(-1)}
            className="text-white hover:text-gray-300"
          >
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
}
