import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { Button } from './button';
import { Badge } from "./badge"


interface CampaignCardProps {
  title: string;
  active: boolean;
  statusColor?: string;
  data?: Array<{
    name: string;
    value: number;
  }>;
  colors?: string[];
  route: string;
}

export function CampaignCard({
  title,
  active,
  data,
  colors = ['#4F46E5', '#7C3AED', '#EC4899', '#50C878'],
  route
}: CampaignCardProps) {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(route);
  };

  return (
    <div className="flex items-center rounded-xl bg-black border border-gray-500 shadow-sm w-full my-2">
      <div className={`px-4 h-8 rounded-full ${active ? "bg-white" : "bg-gray-800"} m-4 flex items-center ${active ? "text-black" : "text-white"} text-sm font-medium`}>
        {active ? "Active" : "Inactive"}
      </div>
      <h1 className="text-lg text-white p-2">{title}</h1>
      <div className="flex-1"/>
      {
        data && <div className="w-20 h-20 mr-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={5}
                outerRadius={20}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip position={{ x: -100, y: 0 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      }
      <Button 
        onClick={handleClick}
        className="m-4"
        variant="default"
        disabled={!active}
      >
        View
      </Button>
    </div>
  );
}
