import React from "react";
import imgAva from "../../assets/icons/woman.png";
const StudentProfileImage = ({id}) => {
  return (
    <>
      <div className="flex flex-col items-center">
        {/* Avatar */}
        <div
          className="
      relative
      flex
      items-center
      justify-center
    "
        >
          {/* Glow */}
          <div
            className="
        absolute
        h-28
        w-28
        rounded-full
        bg-purple-500/30
        blur-2xl
      "
          />

          <img
            src={imgAva}
            className="
        relative
        h-28
        w-28
        rounded-full
        ring-2
        ring-purple-500
        border-4
        border-white/20
        object-cover
        shadow-[0_0_25px_rgba(168,85,247,0.5)]
        "
          />
        </div>

        {/* Small Neon ID Badge */}

        <div
          className="
      -mt-2
      rounded-full
      border
      border-purple-400/40
      bg-purple-500/10
      backdrop-blur-xl
      px-3
      py-1
      shadow-[0_0_15px_rgba(168,85,247,0.45)]
      "
        >
          <span
            className="
        text-[10px]
       
        tracking-wide
        font-extrabold
        text-purple-600
        "
          >
          {id}
          </span>
        </div>
      </div>
    </>
  );
};

export default StudentProfileImage;
