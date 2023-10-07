import Link from "next/link";
import { BiLeftArrowAlt } from "react-icons/bi";
import { FaFolder } from "react-icons/fa";
import { BiDotsVerticalRounded } from "react-icons/bi";

export const metadata = {
  title: "Meneses | Folder",
};

export const DynamicRoutePage = ({ params }) => {
  return (
    <>
      <main className="flex flex-col gap-8">
        <div className="flex justify-between pr-2">
          <h1>Folders</h1>
          <Link href={"/view-files"}>
            <BiLeftArrowAlt size={25} />
          </Link>
        </div>
        <div className="ml-5 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5 text-sm">
          {/* folder */}
          <Link
            href={"/view-files/1"}
            className="flex justify-between gap-4 border rounded-lg shadow-md px-3 py-4 bg-gray-50 hover:bg-gray-200">
            <div className="flex items-center gap-2">
              <FaFolder
                size={20}
                className="opacity-75"
              />
              <h3 className="ml-0">{params.id}</h3>
            </div>
            <BiDotsVerticalRounded size={20} />
          </Link>
        </div>
      </main>
    </>
  );
};

export default DynamicRoutePage;
