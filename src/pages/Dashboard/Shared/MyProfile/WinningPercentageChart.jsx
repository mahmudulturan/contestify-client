import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, } from "recharts";
import { axiosSecure } from "../../../../api/axiosSecure";
import useAuth from "../../../../hooks/useAuth";

const WinningPercentageChart = () => {
    const [winningPercentage, setWinningPercentage] = useState(100)
    const [perticipatePercentage, setPerticipatePercentage] = useState(100)
    const { user: currentUseer } = useAuth()

    const data = [
        { name: "Winning Percentage", value: winningPercentage },
        { name: "Participate Percentage", value: perticipatePercentage },
    ];

    useEffect(() => {
        axiosSecure.get(`/user-stats/${currentUseer.email}`)
            .then((res) => {
                console.log(res.data)
                setWinningPercentage(res?.data?.winningCount)
                setPerticipatePercentage(res?.data?.participantCount || 100)
            })
    }, [currentUseer?.email])

    const COLORS = ['#0ECDB9', '#203CB8'];


    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent,
    }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                fontWeight={700}
                x={x}
                y={y}
                fill="white"
                textAnchor={x > cx ? "start" : "end"}
                dominantBaseline="central">
                {`${(percent * 100).toFixed(2)}%`}
            </text>
        );
    };
    return (
        <div>
            <div className="min-h-[60vh] flex items-center justify-center">
                <PieChart width={900} height={900}>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={300}
                        fill="#8884d8"
                        dataKey="value">
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>
                </PieChart>
                <div className="flex gap-6 text-white mb-12">
                    <div className=" items-center gap-4">
                        <h1 className="text-lg">Participate Percentage</h1>
                        <p className="min-w-full min-h-3 border-8 border-solid border-[#203CB8]"></p>
                    </div>
                    <div className=" items-center gap-4">
                        <h1 className="text-lg">Winning Percentage</h1>
                        <p className="min-w-full min-h-3 border-8 border-solid border-[#0ECDB9]"></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WinningPercentageChart;
