import {
  HiOutlineWallet,
  HiOutlineUsers,
  HiOutlineClock,
  HiOutlineCheckCircle,
} from "react-icons/hi2";

const FeeSummaryCards = ({total}) => {
  const cards = [
    {
      title: "Total Collected",
      value: "৳ 24,500",
      sub: "+12% from last month",

      icon: <HiOutlineWallet />,

      cardBg: "from-purple-100/80 via-white/70 to-purple-50",

      iconColor: "text-purple-600",

      titleColor: "text-purple-700",

      textColor: "text-green-600",
    },

    {
      title: "Total Students",
      value: total,
      sub: "Active students",

      icon: <HiOutlineUsers />,

      cardBg: "from-fuchsia-100/80 via-white/70 to-pink-50",

      iconColor: "text-fuchsia-600",

      titleColor: "text-fuchsia-700",

      textColor: "text-fuchsia-600",
    },

    {
      title: "Pending Fees",
      value: "18",
      sub: "Need to collect",

      icon: <HiOutlineClock />,

      cardBg: "from-orange-100/80 via-white/70 to-yellow-50",

      iconColor: "text-orange-500",

      titleColor: "text-orange-700",

      textColor: "text-orange-600",
    },

    {
      title: "This Month",
      value: "৳ 8,500",
      sub: "Collected so far",

      icon: <HiOutlineCheckCircle />,

      cardBg: "from-green-100/80 via-white/70 to-emerald-50",

      iconColor: "text-green-600",

      titleColor: "text-green-700",

      textColor: "text-green-600",
    },
  ];

  return (
    <div
      className="
      mb-4
grid
grid-cols-1
md:grid-cols-2
xl:grid-cols-4
gap-5
font-urbanist
"
    >
      {cards.map((card, index) => (
        <div
          key={index}
          className={`

group

relative

overflow-hidden


rounded-[28px]


border

border-white/80


bg-gradient-to-br

${card.cardBg}


backdrop-blur-2xl


p-5


shadow-[0_20px_60px_rgba(91,33,182,0.12)]


transition-all

duration-300


hover:-translate-y-1


hover:shadow-[0_30px_80px_rgba(91,33,182,0.20)]

`}
        >
          {/* Glass shine */}

          <div
            className="
absolute
inset-0

bg-gradient-to-br

from-white/50

via-transparent

to-white/20

pointer-events-none

"
          ></div>

          {/* Soft Glow */}

          <div
            className="
absolute
-right-8
-top-8

h-32
w-32

rounded-full

bg-purple-200/30

blur-3xl

"
          ></div>

          <div
            className="
relative
z-10
flex
items-center
gap-4
"
          >
            {/* Icon */}

            <div
              className={`

flex

h-12

w-12

items-center

justify-center


rounded-2xl


bg-white/70


backdrop-blur-xl


shadow-md


text-2xl


${card.iconColor}

`}
            >
              {card.icon}
            </div>

            <div>
              <p
                className={`

text-sm

font-bold

${card.titleColor}

`}
              >
                {card.title}
              </p>

              <h2
                className="
mt-1

text-2xl

font-bold

text-[#181321]

"
              >
                {card.value}
              </h2>

              <p
                className={`

mt-1

text-xs

font-semibold

${card.textColor}

`}
              >
                {card.sub}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeeSummaryCards;
