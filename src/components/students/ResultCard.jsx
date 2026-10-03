import React from "react";
import {
  NotebookText,
  FileText,
  CalendarDays,
  Award,
  Trophy,
} from "lucide-react";

const ResultCard = ({ results = [] }) => {
  const formatBangladeshDate = (date) => {
    return new Date(date).toLocaleDateString("en-GB", {
      timeZone: "Asia/Dhaka",

      day: "2-digit",

      month: "short",

      year: "numeric",
    });
  };

  return (
    <div
      className="
      relative
      font-urbanist
      overflow-hidden
      rounded-[28px]
      border
      border-white/30
      bg-gradient-to-br
      from-white/60
      via-white/40
      to-purple-100/40
      backdrop-blur-2xl
      shadow-[0_25px_70px_rgba(91,33,182,0.15)]
      p-6
      "
    >
      {/* Glow */}

      <div
        className="
        absolute
        -top-20
        -right-20
        h-40
        w-40
        rounded-full
        bg-purple-400/20
        blur-3xl
        "
      />

      {/* Header */}

      <div>
        <div
          className="
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-2xl
          bg-gradient-to-br
          from-brand-primary
          to-brand-secondary
          text-white
          shadow-lg
          "
        >
          <NotebookText size={24} />
        </div>

        <div className="mb-3">
          <h3 className="text-xl font-bold text-text-primary">Results</h3>

         
        </div>
      </div>

      {results.length === 0 ? (
        <div
          className="
            rounded-2xl
            border
            border-dashed
            border-gray-300/70
            bg-white/30
            backdrop-blur-xl
            p-10
            text-center
            "
        >
          <FileText
            size={45}
            className="
              mx-auto
              text-gray-300
              mb-4
              "
          />

          <p className="text-text-secondary">No results available</p>
        </div>
      ) : (
        <div
          className="
  relative
  grid
  grid-cols-1
  sm:grid-cols-2
  xl:grid-cols-3
  gap-5
  "
        >
          {[...results]
            .sort((a, b) => new Date(b.resultDate) - new Date(a.resultDate))
            .map((result) => (
              <div
                key={result._id}
                className="
  group
  relative
  overflow-hidden
  rounded-3xl
  border
  cursor-pointer
  border-white/30
  bg-white/40
  backdrop-blur-2xl
  p-5
  shadow-[0_20px_50px_rgba(124,58,237,0.15)]
  hover:shadow-[0_25px_70px_rgba(124,58,237,0.35)]
  hover:-translate-y-2
  transition-all
  duration-300
  "
              >
                {/* Neon Glow */}

                <div
                  className="
  absolute
  -top-10
  -right-10
  h-32
  w-32
  rounded-full
  bg-purple-500/30
  blur-3xl
  group-hover:bg-purple-500/50
  transition
  "
                />

                <div
                  className="
  absolute
  -bottom-10
  -left-10
  h-28
  w-28
  rounded-full
  bg-blue-400/20
  blur-3xl
  "
                />

                <div className="relative">
                  {/* Header */}

                  <div
                    className="
  flex
  items-start
  justify-between
  gap-3
  "
                  >
                    <div>
                      <div
                        className="
  flex
  items-center
  gap-3
  "
                      >
                        <div
                          className="
  h-11
  w-11
  rounded-2xl
  flex
  items-center
  justify-center
  bg-gradient-to-br
  from-brand-primary
  to-brand-secondary
  text-white
  shadow-lg
  "
                        >
                          <Trophy size={20} />
                        </div>

                        <div>
                          <h4 className="font-bold text-lg">
                            {result.examType}
                          </h4>

                          <p className="text-xs text-text-secondary font-semibold">
                            Exam Number : {result.examNumber}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div
                      className="
  rounded-2xl
  px-3
  py-2
  bg-gradient-to-r
  from-brand-primary
  to-brand-secondary
  text-white
  font-bold
  text-sm
  shadow-lg
  whitespace-nowrap
  "
                    >
                      {result.obtainedMarks}

                      <span className="text-xs ml-1">Marks</span>
                    </div>
                  </div>

              

                  {/* Date */}

                  <div
                    className="
  mt-4
  flex
  items-center
  gap-2
  rounded-xl
  bg-white/10
  px-3
  py-2
  font-bold
  text-sm
  text-text-secondary
  "
                  >
                    <CalendarDays size={16} />

                    {formatBangladeshDate(result.resultDate)}
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default ResultCard;
