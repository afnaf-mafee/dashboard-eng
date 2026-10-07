 export const feeStyle = (type) => {
    switch (type) {
      case "Admission Fee":
        return {
          box: "border-purple-200 bg-gradient-to-r from-purple-50 to-violet-100 text-purple-700 shadow-[0_5px_18px_rgba(124,58,237,0.25)]",
        };

      case "Monthly Fee":
        return {
          box: "border-emerald-200 bg-gradient-to-r from-emerald-50 to-green-100 text-emerald-700 shadow-[0_5px_18px_rgba(16,185,129,0.25)]",
        };

      case "Exam Fee":
        return {
          box: "border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-100 text-blue-700 shadow-[0_5px_18px_rgba(59,130,246,0.25)]",
        };

      case "Hand Note Fee":
        return {
          box: "border-orange-200 bg-gradient-to-r from-orange-50 to-amber-100 text-orange-700 shadow-[0_5px_18px_rgba(249,115,22,0.25)]",
        };

      case "Scholarship Fee":
        return {
          box: "border-pink-200 bg-gradient-to-r from-pink-50 to-rose-100 text-pink-700 shadow-[0_5px_18px_rgba(236,72,153,0.25)]",
        };

      default:
        return {
          box: "border-gray-200 bg-gray-50 text-gray-700",
        };
    }
  };