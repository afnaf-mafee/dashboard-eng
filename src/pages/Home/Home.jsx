import React from "react";

import {
  Users,
  Wallet,
  PieChart,
  UserPlus,
  CalendarDays,
  TrendingUp,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import {
  useGetDashboardOverviewQuery,
  useGetMonthlyCollectionQuery,
} from "../../redux/services/dashboardApiServices/dashboardApiService";

const Home = () => {
  // =========================
  // Dashboard API
  // =========================
  const { data: monthlyCollectionData } = useGetMonthlyCollectionQuery();
  const { data: dashboardData, isLoading } = useGetDashboardOverviewQuery();

  // =========================
  // Bangladesh Date
  // =========================
  const monthlyCollection =
    monthlyCollectionData?.data?.map((item) => ({
      month: item.month,
      amount: item.totalCollection,
    })) || [];
  const today = new Date();

  const banglaDate = today.toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const englishDate = today.toLocaleDateString("en-BD", {
    weekday: "long",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  // =========================
  // Dynamic Stats
  // =========================

  const stats = [
    {
      title: "Total Students",

      value: dashboardData?.data?.totalStudents || 0,

      text: "Total enrolled students",

      icon: Users,

      iconBg: "from-purple-500 to-indigo-500",

      cardBg: "from-purple-50/80 to-white",
    },

    {
      title: "Today's Collection",

      value: `৳ ${dashboardData?.data?.todayCollection || 0}`,

      text: "Today's received payment",

      icon: Wallet,

      iconBg: "from-green-400 to-emerald-500",

      cardBg: "from-green-50/80 to-white",
    },

    {
      title: "Attendance Rate",

      value: `${dashboardData?.data?.attendance?.rate || 0}%`,

      text: `${dashboardData?.data?.attendance?.present || 0} Present Today`,

      icon: PieChart,

      iconBg: "from-blue-500 to-cyan-500",

      cardBg: "from-blue-50/80 to-white",
    },

    {
      title: "New Admission",

      value: dashboardData?.data?.newAdmission || 0,

      text: "Today's new students",

      icon: UserPlus,

      iconBg: "from-pink-500 to-purple-500",

      cardBg: "from-pink-50/80 to-white",
    },
  ];

  return (
    <div
      className="
min-h-screen
bg-[#f7f7ff]
p-6
"
    >
      <div
        className="
rounded-[32px]
border
border-white/60
bg-white/40
backdrop-blur-2xl
shadow-[0_20px_60px_rgba(124,58,237,0.08)]
p-6
"
      >
        {/* HEADER */}

        <div
          className="
flex
flex-col
lg:flex-row
justify-between
items-start
lg:items-center
gap-5
mb-8
"
        >
          <div>
            <h1
              className="
text-3xl
font-extrabold
text-[#151535]
"
            >
              Good Morning 👋
            </h1>

            <p
              className="
mt-2
text-gray-500
text-sm
"
            >
              Here's what's happening with your institute today.
            </p>
          </div>

          <div
            className="
flex
gap-3
"
          >
            {/* DATE CARD */}

            <div
              className="
    group
    relative
    flex
    h-14
    items-center
    gap-3
    overflow-hidden
    rounded-2xl
    border
    border-white/40
    bg-white/40
    px-3
    shadow-[0_8px_30px_rgba(124,58,237,0.15)]
    backdrop-blur-xl
    transition-all
    duration-300
    hover:-translate-y-1
    hover:border-purple-300/60
    hover:shadow-[0_15px_40px_rgba(124,58,237,0.25)]
  "
            >
              {/* Glow Background */}
              <div
                className="
      absolute
      -right-6
      -top-6
      h-20
      w-20
      rounded-full
      bg-purple-500/20
      blur-2xl
      transition-all
      duration-500
      group-hover:bg-indigo-500/30
    "
              />

              <CalendarDays size={20} className="text-purple-600" />

              <p
                className="
text-sm
font-semibold
text-gray-800
"
              >
                {englishDate}
              </p>
            </div>

           
          </div>
        </div>

        {/* STATS CARDS */}

        <div
          className="
grid
grid-cols-1
md:grid-cols-2
xl:grid-cols-4
gap-5
"
        >
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className={`
relative
overflow-hidden
rounded-[24px]
border
border-white/70
bg-gradient-to-br
${item.cardBg}
p-5
backdrop-blur-xl
shadow-[0_10px_35px_rgba(0,0,0,0.05)]
hover:-translate-y-1
transition-all
duration-300
`}
              >
                <div
                  className="
absolute
-right-8
-top-8
h-32
w-32
rounded-full
bg-purple-400/20
blur-3xl
"
                />

                <div className="relative">
                  <div
                    className={`
h-12
w-12
rounded-2xl
bg-gradient-to-br
${item.iconBg}
flex
items-center
justify-center
text-white
shadow-lg
`}
                  >
                    <Icon size={24} />
                  </div>

                  <p
                    className="
mt-5
text-sm
text-gray-500
font-medium
"
                  >
                    {item.title}
                  </p>

                  <h2
                    className="
text-3xl
font-extrabold
text-[#161631]
mt-1
"
                  >
                    {isLoading ? "..." : item.value}
                  </h2>

                  <div
                    className="
flex
items-center
gap-3
mt-4
"
                  >
                    <span
                      className="
flex
items-center
gap-1
rounded-full
bg-green-100
px-3
py-1
text-xs
font-bold
text-green-600
"
                    >
                      <TrendingUp size={13} />
                      Live
                    </span>

                    <span
                      className="
text-xs
text-gray-400
"
                    >
                      {item.text}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* MONTHLY COLLECTION CHART */}

        <div
          className="
  mt-6
  rounded-[32px]
  border
  border-white/70
  bg-white/50
  backdrop-blur-2xl
  shadow-[0_20px_60px_rgba(124,58,237,0.08)]
  p-6
  "
        >
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <span
                className="
        h-3
        w-3
        rounded-full
        bg-purple-600
        "
              />

              <h2
                className="
        text-xl
        font-bold
        text-[#151535]
        "
              >
                Monthly Collection
              </h2>
            </div>

            <div
              className="
      rounded-xl
      border
      border-gray-200
      bg-white/70
      px-4
      py-2
      text-sm
      font-semibold
      text-gray-600
      "
            >
              {dashboardData?.year || new Date().getFullYear()}
            </div>
          </div>

          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyCollection}
                margin={{
                  top: 15,
                  right: 10,
                  left: -15,
                  bottom: 5,
                }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={true}
                  opacity={0.25}
                />

                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "#777",
                    fontSize: 12,
                    fontWeight: 500,
                  }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "#777",
                    fontSize: 12,
                  }}
                  tickFormatter={(value) => `${value / 1000}K`}
                />

                <Tooltip
                  cursor={{
                    fill: "rgba(124,58,237,0.08)",
                  }}
                  contentStyle={{
                    borderRadius: "16px",
                    border: "none",
                    background: "rgba(255,255,255,0.95)",
                    boxShadow: "0 15px 40px rgba(0,0,0,0.12)",
                  }}
                  formatter={(value) => [
                    `৳ ${value.toLocaleString()}`,
                    "Collection",
                  ]}
                />

                <defs>
                  <linearGradient
                    id="collectionGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#a855f7" />

                    <stop offset="100%" stopColor="#7c3aed" />
                  </linearGradient>
                </defs>

                <Bar
                  dataKey="amount"
                  fill="url(#collectionGradient)"
                  radius={[10, 10, 0, 0]}
                  barSize={48}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
