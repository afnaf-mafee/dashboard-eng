import {
  Award,
  Briefcase,
  CheckCircle,
  Clock3,
  MessageCircle,
  Plus,
  Trophy,
} from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { MdOutlineSchool } from "react-icons/md";
import imgAva from "../../assets/icons/woman.png";
import CalendarCard from "../../components/students/CalendarCard";
import MonthlyFeeCard from "../../components/students/MonthlyFeeCard";
import { IoCall } from "react-icons/io5";
import { TbCoinTaka } from "react-icons/tb";
import StudentProfileImage from "../../components/students/StudentProfileImage";
import { useGetStudentByIdQuery } from "../../redux/services/studentsApiServices/studentApiServices";
import StudentProfileSkeleton from "../../components/students/StudentProfileSkeleton";
import Invoice from "../../components/students/Invoice";

const StudentProfile = () => {
  const [activeTab, setActiveTab] = useState("Monthly Fee");
  const { id } = useParams();
  const { data, isLoading } = useGetStudentByIdQuery(id);
  const student = data?.data || {};
  console.log(student);
  const tabs = ["Monthly Fee", "Results", "Invoice"];
  if (isLoading) {
    return <StudentProfileSkeleton />;
  }

  return (
    <div className="space-y-6">
      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* LEFT CONTENT */}
        <div className="xl:col-span-2 space-y-6">
          {/* Profile Header */}
          <div
            className="
            rounded-[28px]
            border border-border
            bg-surface-soft/80
            backdrop-blur-2xl
            p-6
            shadow-[0_20px_60px_rgba(91,33,182,0.10)]
            "
          >
            <div className="flex flex-col md:flex-row gap-5">
              <div>
                <StudentProfileImage id={student?.studentId} />
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h1
                    className="
                  text-2xl 
                  font-bold 
                  font-h
                  text-text-primary
                  "
                  >
                    {student?.name}
                  </h1>

                  <button
                    className="
                    rounded-full
                    bg-gradient-to-r 
                    from-brand-primary 
                    to-brand-accent
                    px-4 py-2
                    text-xs
                    font-semibold
                    text-white
                    "
                  >
                    DUE
                  </button>
                  
                </div>

                <div
                  className="
                mt-2 
                flex items-center gap-2
                text-sm
                text-text-secondary
                "
                >
                  <MdOutlineSchool size={25} />
                  Bogura High school
                </div>
                <div
                  className="
                mt-2 
                flex items-center gap-2
                text-sm font-semibold
                text-text-secondary
                "
                >
                  <IoCall size={25} />
                  {student?.phone}
                </div>

               <div className="flex gap-3">
                 <button
                  className=" mt-2
  group
  relative
  flex
  items-center
  gap-2
  overflow-hidden
  rounded-xl
  border
  border-purple-400/40
  bg-gradient-to-r
  from-brand-primary
  to-brand-accent
  px-5
  py-2
  text-sm
  cursor-pointer
  font-semibold
  text-white
  shadow-[0_0_25px_rgba(168,85,247,0.45)]
  backdrop-blur-xl
  transition-all
  duration-300
  hover:scale-105
  hover:shadow-[0_0_35px_rgba(168,85,247,0.75)]
  active:scale-95
  "
                >
                  {/* Neon Shine */}

                  <span
                    className="
    absolute
    inset-0
    bg-white/20
    translate-x-[-120%]
    transition-transform
    duration-700
    group-hover:translate-x-[120%]
    "
                  />

                 

                  <span className="relative z-10">Add Fee</span>
                </button>


              
                
               </div>
                
              </div>
            </div>

            {/* Stats */}

            <div
              className="
            mt-4
            grid grid-cols-3
            gap-4
            "
            >
              <Stat
                icon={<Award />}
                title={"Class" + " " + student?.className}
                text="Batch Morning"
              />

              <Stat
                icon={<TbCoinTaka size={25} />}
                title={student?.monthlyFee}
                text="Monthly Fee"
              />
              <Stat icon={<Clock3 />} title="22 Days" text="Attendance" />
            </div>
          </div>

          {/* Tabs */}

          <div
            className="
          rounded-[28px]
          border border-border
          bg-surface-soft/80
          backdrop-blur-xl
          p-6
          "
          >
            <div
              className="
            flex
            gap-3
            border-b
            border-border
            pb-4
            overflow-x-auto
            "
            >
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`
                  px-5 py-2
                  rounded-xl
                  text-sm
                  font-semibold
                  transition
                  ${
                    activeTab === tab
                      ? "bg-gradient-to-r from-brand-primary to-brand-accent text-white"
                      : "text-text-secondary hover:text-brand-secondary"
                  }
                  `}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="mt-6">
              {activeTab === "Monthly Fee" && <MonthlyFeeCard />}

              {activeTab === "Biography" && (
                <p className="text-text-secondary">
                  Professional consultant with experience in branding and
                  business development.
                </p>
              )}

              {activeTab === "Skills" && (
                <div className="flex flex-wrap gap-3">
                  {["React", "UI Design", "Branding", "Management"].map(
                    (skill) => (
                      <span
                        key={skill}
                        className="
                      rounded-full
                      bg-purple-soft
                      px-4 py-2
                      text-sm
                      text-brand-secondary
                      "
                      >
                        {skill}
                      </span>
                    ),
                  )}
                </div>
              )}

              {activeTab === "Invoice" && (
               <Invoice/>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT CARD */}

        <div>
          <CalendarCard />
        </div>
      </div>
    </div>
  );
};

const Stat = ({ icon, title, text }) => (
  <div
    className="
  rounded-2xl
  border border-border
  bg-surface
  p-4
  "
  >
    <div className="text-brand-secondary">{icon}</div>

    <h3 className="mt-2 font-bold">{title}</h3>

    <p className="text-xs text-text-secondary">{text}</p>
  </div>
);

const Experience = () => (
  <div
    className="
  rounded-2xl
  border border-border
  bg-surface
  p-5
  "
  >
    <div className="flex justify-between">
      <div>
        <h3 className="font-bold">Graphic Designer</h3>

        <p
          className="
        text-sm
        text-text-secondary
        "
        >
          Dribble Inc
        </p>
      </div>

      <button
        className="
      flex items-center gap-1
      rounded-xl
      border border-border
      px-3 py-2
      text-sm
      "
      >
        <Plus size={15} />
        Add More
      </button>
    </div>

    <div
      className="
    mt-5
    flex
    gap-5
    text-sm
    text-text-secondary
    "
    >
      <span>Feb 2016 - Dec 2017</span>

      <span>New York, USA</span>
    </div>

    <p
      className="
    mt-4
    text-sm
    leading-6
    text-text-secondary
    "
    >
      There are many variations of passages of Lorem Ipsum available, but
      majority have suffered alteration in some form.
    </p>
  </div>
);

export default StudentProfile;
