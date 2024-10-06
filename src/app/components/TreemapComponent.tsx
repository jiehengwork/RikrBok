'use client';

import { NextPage } from 'next'
import { Treemap, Tooltip, ResponsiveContainer } from 'recharts';

const TreemapColors = [
    '#8889DD', '#9597E4', '#8DC77B', '#A5D297', '#E2CF45', '#F8C12D',
    '#F89C74', '#E79796', '#B3B3B3', '#00A2FF', '#0D8ECF', '#2A8CC8',
    '#57A773', '#9AD283', '#FFC20A', '#FFB969', '#FF7236', '#FF4E4E',
    '#E64A45', '#B14F4F'
];

interface Props {

}

const TreemapComponent: NextPage<Props> = () => {
    const data = [
        { name: 'Group A', size: 30 },
        { name: 'Group B', size: 25 },
        { name: 'Group C', size: 20 },
        { name: 'Group D', size: 15 },
        { name: 'Group E', size: 5 },
        { name: 'Group F', size: 2 },
        { name: 'Group G', size: 1 },
        { name: 'Group H', size: 1 },
        { name: 'Group I', size: 0.5 },
        { name: 'Group J', size: 0.5 },
        // Add more groups as needed to reach 20
    ];

    const CustomizedContent = (props: any) => {
        const { root, depth, x, y, width, height, index, name, size } = props;

        const fontSize = Math.min(width / 6, height / 4, 14);
        const percentValue = ((size / root.value) * 100).toFixed(1);
        console.log("test")

        return (
            <g>
                <rect
                    x={x}
                    y={y}
                    width={width}
                    height={height}
                    style={{
                        fill: TreemapColors[index % TreemapColors.length],
                        stroke: '#fff',
                        strokeWidth: 2 / (depth + 1e-10),
                        strokeOpacity: 1 / (depth + 1e-10),
                    }}
                />
                <text
                    x={x + width / 2}
                    y={y + height / 2}
                    textAnchor="middle"
                    fill="#fff"
                    fontSize={fontSize}
                    dominantBaseline="central"
                >
                    {name}
                </text>
                <text
                    x={x + width / 2}
                    y={y + height / 2 + fontSize}
                    textAnchor="middle"
                    fill="#fff"
                    fontSize={fontSize * 0.8}
                    dominantBaseline="central"
                >
                    {`${percentValue}%`}
                </text>
            </g>
        );
    };

    return (
        <div className="w-full h-96">
            <ResponsiveContainer width="100%" height="100%">
                <Treemap
                    data={data}
                    dataKey="size"
                    aspectRatio={1.5}
                    stroke="#fff"
                    fill="#8884d8"
                    content={<CustomizedContent />}
                    animationDuration={0}
                >
                    <Tooltip
                        formatter={(value, name, props) => {
                            return [`${value}%`, `${props.payload.name}`];
                        }}
                    />
                </Treemap>
            </ResponsiveContainer>
        </div>
    );
}

export default TreemapComponent
