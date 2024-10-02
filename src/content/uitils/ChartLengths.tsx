import React from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis } from "recharts";
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
      uv: 4000,
      pv: SidebarLinksForUsed ? SidebarLinksForUsed?.length : 0,
      amt: 2400,
    },
    {
      name: "Endpoint",
      uv: 3000,
      pv: endpointLengths ? endpointLengths : 0,
      amt: 2210,
    },
    {
      name: "Collections",
      uv: 2000,
      pv: dbCollectionLengths ? dbCollectionLengths : 0,
      amt: 2290,
    },
    
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        barSize={20}>
        <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray="3 3" />
        <Bar dataKey="pv" fill="#8884d8" background={{ fill: "#505050" }} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ChartLengths;
