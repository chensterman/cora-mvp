import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UsageCard } from '../components/ui/usageCard';

type CampaignSub = {
  title: string;
  active: boolean;
  data?: { name: string; value: number; }[];
};

export default function CampaignListSubMetric() {
  const navigate = useNavigate();
  const { type, metric } = useParams();

  const featureData = [
    { name: 'Usage Paused', value: 94 },
    { name: 'Never Used', value: 68 },
    { name: 'Active', value: 117 },
  ];

  const productData = [
    { name: 'Rippling', value: 30 },
    { name: 'Bamboo', value: 24 },
    { name: 'Workday', value: 17 },
    { name: 'Not Using', value: 10 },
  ];

  const campaignTypes = [
    {
      title: 'Feature Usage',
      campaignSubs: [
        {
          title: 'Autopay',
          data: featureData,
          active: true,
        },
        {
          title: 'Workflows',
          data: featureData,
          active: false,
        },
        {
          title: 'Documents',
          data: featureData,
          active: false,
        },
      ] as CampaignSub[]
    },
    {
      title: 'Products',
      campaignSubs: [
        {
          title: 'HRIS',
          data: productData,
          active: true,
        },
        {
          title: 'Payroll',
          data: productData,
          active: false,
        },
        {
          title: 'Contractor',
          data: productData,
          active: false,
        },
      ] as CampaignSub[]
    },
    {
      title: 'Switch to New Feature',
      campaignSubs: []
    },
    {
      title: 'Leadership Change',
      campaignSubs: [
        {
          title: 'Champion / Senior Leader',
          active: false,
        },
        {
          title: 'Management',
          active: false,
        },
      ] as CampaignSub[]
    },
  ];

  // Find the selected campaign type and its corresponding sub-campaign
  const selectedCampaignType = campaignTypes.find(ct => ct.title === type);
  const selectedSubCampaign = selectedCampaignType?.campaignSubs.find(
    sub => sub.title === metric
  );

  return (
    <div className="bg-gray-500 w-[500px] p-1">
      <div className="flex flex-col border border-gray-500 rounded-xl p-4 bg-black shadow-sm h-full">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-white mr-2"/>
          <h1 className="text-3xl font-bold text-white">Kai AI</h1>
        </div>

        {/* Subheader */}
        <div className="flex-shrink-0">
          <h1 className="text-xl mt-4 text-white">Revenue Campaign - {type}</h1>
          <div className={`px-4 h-8 rounded-full bg-white inline-flex items-center w-fit text-black text-sm font-medium mt-4`}>{metric}</div>
        </div>

        {/* Main Content */}
        <div className="mt-4">
          {selectedSubCampaign?.data?.map(item => (
            <UsageCard
              key={item.name}
              count={item.value}
              title={item.name}
              route={`/campaign-setup/${type}/${metric}/${item.name}`}
            />
          ))}
        </div>

        <div className="flex items-center">
          <button 
            onClick={() => navigate(-1)}
            className="text-white hover:text-gray-500"
          >
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
}
