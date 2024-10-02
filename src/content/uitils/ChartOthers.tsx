import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { endpoint } from "../../Baseurl";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SidebarLinksForUsed } from "../../sidebar/Sidebar";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={14}
      fontWeight="bold">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const ChartOthers: React.FC = () => {
  const { data: endpointLengths } = useQuery({
    queryKey: ["endpointLengthsKey"],
    queryFn: async () => {
      const response = await axios.get(`${endpoint}/get-all-endpoint-lengths`);
      return response.data;
    },
    staleTime: 1000 * 60 * 60,
  });

  const { data: dbCollectionLengths } = useQuery({
    queryKey: ["dbCollectionLengthDataKey"],
    queryFn: async () => {
      const response = await axios.get(`${endpoint}/get-db-collection-lengths`);
      return response.data;
    },
    staleTime: 1000 * 60 * 60,
  });

  const data = [
    {
      name: "Səhifə",
      value: SidebarLinksForUsed ? SidebarLinksForUsed?.length : 0,
    },
    {
      name: "Endpoint",
      value: endpointLengths ? endpointLengths : 0,
    },
    {
      name: "Collections",
      value: dbCollectionLengths ? dbCollectionLengths : 0,
    },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value">
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
          itemStyle={{ color: "#333" }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ChartOthers;
