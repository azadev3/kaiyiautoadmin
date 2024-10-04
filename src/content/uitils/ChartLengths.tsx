import React from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { SidebarLinksForUsed } from "../../sidebar/Sidebar";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { endpoint } from "../../Baseurl";

const ChartLengths: React.FC = () => {
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
      pv: SidebarLinksForUsed ? SidebarLinksForUsed?.length : 0,
    },
    {
      name: "API'lar",
      pv: endpointLengths ? endpointLengths : 0,
    },
    {
      name: "Modellər",
      pv: dbCollectionLengths ? dbCollectionLengths : 0,
    },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="pv" stroke="mediumslateblue" fill="#ffbb28" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default ChartLengths;
