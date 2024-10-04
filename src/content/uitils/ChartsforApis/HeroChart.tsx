import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { endpoint } from "../../../Baseurl";

const HeroChart: React.FC = () => {
  const { data: modelsLength } = useQuery({
    queryKey: ["dataForOtherChartKey"],
    queryFn: async () => {
      const response = await axios.get(`${endpoint}/modelstab`);
      return response.data;
    },
    staleTime: 1000 * 60 * 10,
  });

  const { data: translatesLength } = useQuery({
    queryKey: ["dataForOtherChartKeyTranslates"],
    queryFn: async () => {
      const response = await axios.get(`${endpoint}/translates`);
      return response.data;
    },
    staleTime: 1000 * 60 * 10,
  });

  const { data: carsLength } = useQuery({
    queryKey: ["dataForOtherChartKeyCarLength"],
    queryFn: async () => {
      const response = await axios.get(`${endpoint}/add-car`);
      return response.data;
    },
    staleTime: 1000 * 60 * 10,
  });

  const data = [
    {
      name: "Maşınlar",
      pv: carsLength ? carsLength?.length : 0,
    },
    {
      name: "Modellər",
      pv: modelsLength ? modelsLength?.length : 0,
    },
    {
      name: "Tərcümələr",
      pv: translatesLength ? translatesLength?.length : 0,
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
        <Area type="monotone" dataKey="pv" stackId="1" stroke="#8884d8" fill="#8884d8" />
        <Area type="monotone" dataKey="pv" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
        <Area type="monotone" dataKey="pv" stackId="1" stroke="#ffc658" fill="#ffc658" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default HeroChart;
