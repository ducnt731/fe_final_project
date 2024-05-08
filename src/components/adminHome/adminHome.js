import React, { useEffect, useState } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import '../../style/dashboard.css'
import { fetchColumnData, fetchPercentData, totalAccountCustomer, totalAccountStaff, totalCinemas, totalMovies } from '../../service/userService';
import { MdMovie } from 'react-icons/md';

const AdminHome = () => {

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    const [movieCount, setMovieCount] = useState(0)
    const [theaterCount, setTheaterCount] = useState(0)
    const [customerCount, setCustomerCount] = useState(0)
    const [staffCount, setStaffCount] = useState(0)
    const [listData, setListData] = useState([])
    const [perData, setPerData] = useState([])
    // const [total, setTotal] = useState([])

    const getData = async () => {
        try {
            let res = await fetchColumnData()
            let res2 = await fetchPercentData()
            // let res3 = await chart()
            console.log(res)
            if (res !== null && res2 !== null) {
                setListData(res.data)
                setPerData(res2.data);
                // setTotal(res3)
            } else {
                console.error('No data received')
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const totalMovieSystem = async () => {
        const response = await totalMovies()
        if (response) {
            setMovieCount(response.data)
        }
    }
    const totalTheaterSystem = async () => {
        const response = await totalCinemas()
        if (response) {
            setTheaterCount(response.data)
        }
    }
    const totalCustomerSystem = async () => {
        const response = await totalAccountCustomer()
        if (response) {
            setCustomerCount(response.data)
        }

    }
    const totalStaffSystem = async () => {
        const response = await totalAccountStaff()
        if (response) {
            setStaffCount(response.data)
        }
    }
    useEffect(() => {
        totalMovieSystem()
        totalTheaterSystem()
        totalCustomerSystem()
        totalStaffSystem()
    }, [])

    return (
        <>
            <div className='dashboard-container'>
                <div className='main-title'>
                    <h3>DASHBOARD</h3>
                </div>

                <div className='main-cards'>
                    <div className='card'>
                        <div className='card-inner'>
                            <h3>MOVIES</h3>
                            <MdMovie className='card_icon'/>
                        </div>
                        <h1>{movieCount}</h1>
                    </div>
                    <div className='card'>
                        <div className='card-inner'>
                            <h3>THEATERS</h3>
                            <i className="fa-solid fa-location-dot card_icon"></i>
                        </div>
                        <h1>{theaterCount}</h1>
                    </div>
                    <div className='card'>
                        <div className='card-inner'>
                            <h3>CUSTOMERS</h3>
                            <i className="fa-solid fa-users card_icon"></i>
                        </div>
                        <h1>{customerCount}</h1>
                    </div>
                    <div className='card'>
                        <div className='card-inner'>
                            <h3>STAFFS</h3>
                            <i className="fa-solid fa-users card_icon"></i>
                        </div>
                        <h1>{staffCount}</h1>
                    </div>
                </div>
                <div className='chart-card'>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            width={500}
                            height={300}
                            data={listData}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="totalNormalRevenue" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                            <Bar dataKey="totalVipRevenue" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className='chart-card'>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart width={400} height={400}>
                            <Pie
                                data={perData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="percentage"
                            >
                                {perData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            {perData && perData.length &&
                                perData.map((item, index) => {
                                    const yPosition = 20 + index * 15; // Tính toán vị trí y dựa trên index
                                    const backgroundColor = COLORS[index % COLORS.length];
                                    return (
                                        <g key={index}>
                                            <rect
                                                x="94%"
                                                y={`${yPosition - 5}%`} // Đặt vị trí y của background
                                                width="20"
                                                height="20" // Độ cao của background
                                                fill={backgroundColor} // Màu nền của background
                                                rx="5" // Bo tròn các góc của background
                                            />
                                            <text
                                                x="85%"
                                                y={`${yPosition}%`}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                                fill="black"
                                                key={index}
                                            >
                                                {item.Seat}
                                            </text>
                                        </g>
                                    )
                                })}
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </>
    )
}

export default AdminHome