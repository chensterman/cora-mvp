import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { HighlightedTextarea } from "../components/ui/highlightedTextarea";
import { cn } from '../lib/utils';

interface Target {
  name: string;
  company: string;
  reason: string;
}

export default function CampaignSetup() {
  const navigate = useNavigate();
  const { type } = useParams();
  
  const nikeEmail = `Hey {{Dylan}},

Hope you're doing well! Since we last spoke in {{January}}, it looks like {{Nike}} stopped using our invoicing. Was that due to any issues with the invoicing process? It seems that some of your HR managers didn’t complete the invoicing form—mainly missing due dates—which may have caused complications.

To make things easier, here’s a quick tutorial we shared with them to ensure everything is set up correctly and completed.

Some of our international clients using automatic payroll are 65% more likely to pay on time, and their employees report being 42% happier with the HR department. Here’s a case study on Klarna’s experience with automatic payroll.

Let me know if this helps or if you have any questions!

Best,
Luke`;

  const shopifyEmail = `Hey {{Max}},

Hope you're doing well! You mentioned that {{Shopify}} is currently using Rippling for HRIS. I wanted to share a case study on Reddit, a company of similar size, that saw significant improvements after switching to Deel for HRIS and Global Payroll. Their HR managers spent 57% less time on HR platforms, and invoicing mistakes decreased by 23%.

If you're interested in exploring our HRIS solutions, we'd love to set up a quick call to walk you through the process!

Let me know if this helps or if you have any questions.

Best,
Luke`;

  const manualEmail = `Hey {{Rob}},

Hope you're doing well! Since we last spoke in {{September}}, it looks like {{H&M}} hasn’t activated the automatic payroll option yet. Last month, [37%] of your payments were late, and this could be a simple way to prevent that!

If you’re interested in activating it, here’s a tutorial to guide you through the process, along with a draft email you can share with your HR managers once it’s set up.

Some of our clients of your size who use automatic payroll are 62% more likely to pay on time, and their employees report being 32% happier with the HR department. Here’s a case study on Klarna’s experience using automatic payroll.

Let me know if this helps or if you have any questions!

Best,
Luke`;

  const [emailContent, setEmailContent] = useState(
    type === 'usage-stopped' ? nikeEmail :
    type === 'competitor' ? shopifyEmail :
    type === 'manual' ? manualEmail : 
    'Unknown'
  );



  // Sample data - in a real app, this would come from an API
  const targets: Target[] = [
    { name: "Ali G", company: "Hellofresh", reason: "CFO meeting opportunity - offered to meet" },
    { name: "James A", company: "Uber", reason: "No engagement for 3 months - follow up needed" },
    { name: "Emily B", company: "Lego", reason: "Recent layoffs (3% in Feb 2025) - CFO outreach" },
    { name: "Matthew N", company: "Squarex", reason: "Follow-up required - no recent activity" },
    { name: "Amanda C", company: "Findco", reason: "Follow-up required - no recent activity" },
    { name: "Jay T", company: "Klarna", reason: "Competitor evaluation (Rippling) - satisfaction check" },
    { name: "Aaron S", company: "ElevenLabs", reason: "Competitor evaluation (Rippling) - satisfaction check" }
  ];

  if (type === 'usage-stopped') {
    targets.unshift({ name: "Dylan F", company: "Nike", reason: "HR managers never completed invoicing form" });
  } else if (type === 'competitor') {
    targets.unshift({ name: "Max J", company: "Shopify", reason: "Using Rippling for HRIS" });
  } else if (type === 'manual') {
    targets.unshift({ name: "Rob S", company: "H&M", reason: "Never activated AutoPay option" });
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
          <h1 className="text-xl mt-4 text-white">Usage Campaign - Autopay</h1>
          <div className={`px-4 h-8 rounded-full bg-white inline-flex items-center w-fit text-black text-sm font-medium mt-4`}>{
            type === 'usage-stopped' ? 'Usage Paused' :
            type === 'competitor' ? 'Using Competitor' :
            type === 'manual' ? 'Never Used' : 
            'Unknown'
          }</div>
        </div>

        {/* Main content */}
        <div className="flex gap-4 mt-4 flex-1 min-h-0">
          <div className="w-1/2 flex flex-col min-h-0">
            <h3 className="text-sm font-medium mb-2 text-white flex-shrink-0">Email Template</h3>
            <div className="flex-1 min-h-0">
              <HighlightedTextarea
                value={emailContent}
                onChange={setEmailContent}
                className="w-full h-full border border-gray-500 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="w-1/2 flex flex-col min-h-0">
            <h3 className="text-sm font-medium mb-2 text-white flex-shrink-0">Campaign Targets</h3>
            <div className="flex-1 min-h-0 border border-gray-500 rounded-lg overflow-hidden">
              <div className="h-full overflow-y-auto">
                <table className="min-w-full divide-y divide-gray-500">
                  <thead>
                    <tr>
                      <th scope="col" className="sticky top-0 z-10 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-white border-b border-gray-500">
                        Name
                      </th>
                      <th scope="col" className="sticky top-0 z-10 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-white border-b border-gray-500">
                        Company
                      </th>
                      <th scope="col" className="sticky top-0 z-10 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-white border-b border-gray-500">
                        Reason
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {[...targets, ...targets, ...targets].map((target, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {target.name}
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                          {target.company}
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-500">
                          {target.reason}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center mt-4 flex-shrink-0">
          <button 
            onClick={() => navigate(-1)}
            className="text-white hover:text-gray-300"
          >
            ← Back
          </button>
          <div className="flex-1"/>
          <Button onClick={() => navigate('/campaign-post/' + type)}>Send Campaign</Button>
        </div>
      </div>
    </div>
  );
}
