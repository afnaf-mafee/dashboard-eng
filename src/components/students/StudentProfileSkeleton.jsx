const StudentProfileSkeleton = () => {

  return (

    <div className="space-y-6">


      <div className="
      grid 
      grid-cols-1 
      xl:grid-cols-3 
      gap-6
      ">


        {/* Profile Skeleton */}

        <div
        className="
        xl:col-span-2
        rounded-[28px]
        border border-border
        bg-surface-soft/80
        backdrop-blur-2xl
        p-6
        "
        >

          <div className="flex gap-5">


            {/* Avatar */}

            <div
            className="
            h-28
            w-28
            rounded-full
            bg-purple-500/20
            animate-pulse
            "
            />


            <div className="flex-1 space-y-4">


              <div
              className="
              h-7
              w-48
              rounded-lg
              bg-purple-500/20
              animate-pulse
              "
              />


              <div
              className="
              h-4
              w-60
              rounded
              bg-purple-500/10
              animate-pulse
              "
              />


              <div
              className="
              h-4
              w-40
              rounded
              bg-purple-500/10
              animate-pulse
              "
              />


            </div>


          </div>



          {/* Stats */}

          <div className="
          mt-8
          grid
          grid-cols-3
          gap-4
          ">


            {
              [1,2,3].map(item=>(

                <div
                key={item}
                className="
                h-24
                rounded-2xl
                bg-purple-500/10
                animate-pulse
                "
                />

              ))
            }


          </div>


        </div>




        {/* Calendar Skeleton */}

        <div
        className="
        h-[420px]
        rounded-[28px]
        border border-border
        bg-surface-soft/80
        animate-pulse
        "
        />


      </div>


    </div>

  );

};


export default StudentProfileSkeleton;