import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { HighlightedTextarea } from '../components/ui/highlightedTextarea';
import OpenAI from 'openai';
import { Button } from '../components/ui/button';

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Note: In production, make API calls through your backend
});

export default function ActionEmail() {
  const navigate = useNavigate();
  const { type } = useParams();
  const [isGenerating, setIsGenerating] = useState(false);

  const generateEmailPrompt = (type: string) => {
    return `Max (Shopify) requested a meeting to discuss HCRI pricing – schedule the meeting. You are Luke, a Customer Success Manager at Deel.com.
    
    Based on this information, can you please write an email that is concise, short, and doesn't repeat information that was already shared in the conversation. For example, if the action is 'scheudle a meeting' suggest times in the email`;
  };

  const generateEmail = async () => {
    if (!type) return;
    
    setIsGenerating(true);
    try {
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant writing personalized business emails. Keep the tone professional but friendly."
          },
          {
            role: "user",
            content: generateEmailPrompt(type)
          }
        ],
        model: "gpt-4o",
      });

      const generatedEmail = completion.choices[0]?.message?.content;
      if (generatedEmail) {
        setEmailContent(generatedEmail);
      }
    } catch (error) {
      console.error('Error generating email:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const [emailContent, setEmailContent] = useState('');

  useEffect(() => {
    generateEmail();
  }, [type]);

  return (
    <div className="bg-gray-500 w-[500px] p-1">
      <div className="flex flex-col border border-gray-500 rounded-xl p-4 bg-black shadow-sm h-full">
        <div className="flex items-center flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-white mr-2"/>
          <h1 className="text-3xl font-bold text-white">Kai AI</h1>
        </div>

        <div className="flex-shrink-0">
          <h1 className="text-xl mt-4 text-white">Take Action</h1>
        </div>

        <div className="flex flex-col min-h-0">
          <h3 className="text-sm font-medium mt-4 mb-2 text-white flex-shrink-0">Email Template</h3>
          <div className="flex flex-col flex-grow">
            <div className="relative h-[400px]">
              {isGenerating && (
                <div className="absolute inset-0 z-10 bg-gray-800 bg-opacity-50 flex items-center justify-center rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <HighlightedTextarea
                value={emailContent}
                onChange={setEmailContent}
                className="w-full h-full border border-gray-500 rounded-lg text-sm p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-900 text-white"
              />
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
          <Button onClick={() => navigate(-1)}>Send Email</Button>
        </div>
      </div>
    </div>
  );
}