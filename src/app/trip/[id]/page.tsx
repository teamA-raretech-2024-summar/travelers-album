import { Metadata } from "next";
import Header from "../../../../components/Header";
import Sidebar from "../../../../components/Sidebar";
import TripDetail from "../../../../components/TripDetail";
import { Button } from "../../../../components/ui/button";

export const metadata: Metadata = {
  title: "旅行カード",
  description: "旅行の詳細確認と各種変更ができます",
  icons: {
    icon: "/favicon.png",
  },
};

const Name = ["八村塁", "小池百合子", "ジョシュ・ホーキンソン"];

const page = ({ params: { id } }: { params: { id: string } }) => {
  return (
    <div className="flex flex-col h-screen w-full bg-gradient-to-b from-white to-black">
      <Header menu />
      <div className="flex overflow-hidden flex-1 flex-col">
        <div className="flex-1 flex flex-col ">
          <div className="h-12 flex items-center justify-center border-b-2 bg-blue-200">
            <h2 className="text-2xl font-bold">{id}</h2>
          </div>
          <div className="h-10 py-8 px-3 flex items-center justify-center border-b-2 space-x-6 md:space-x-10 lg:space-x-14 bg-blue-100">
            {[...Array(3)].map((_, index) => (
              <>
                <Button
                  variant={"outline"}
                  className="rounded-lg shadow-custom-shadow hover:scale-105 transition hover:shadow-none"
                >
                  <span className="md:text-xl lg:text-2xl">{Name[index]}</span>
                </Button>
              </>
            ))}
          </div>
          <TripDetail id={id} />
        </div>
      </div>
    </div>
  );
};

export default page;
