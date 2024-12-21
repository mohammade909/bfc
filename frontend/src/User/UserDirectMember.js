import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReferralTree } from "../redux/referralSlice";
import Loader from "../BaseFile/comman/Loader";

export default function UserDirectMember() {
  const [searchQuery, setSearchQuery] = useState("");
  const { auth } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const { referralTree } = useSelector((state) => state.referralTree);
  const [allRefferal, setAllRefferal] = useState();

  useEffect(() => {
    dispatch(getReferralTree(auth?.refferal_code));
    setAllRefferal(referralTree);
  }, [dispatch, allRefferal, auth?.refferal_code]);

  const handleSearch = (e) => {
    setAllRefferal(
      referralTree?.filter((p) => p.username?.includes(e.target.value))
    );
    setSearchQuery(e.target.value);
  };
  return (
    <>
      <div className="lg:mx-5 sm:mx-5">
        <div className="w-full flex flex-wrap justify-between items-center mb-3 lg:pl-3">
          <div>
            <h3 className="text-lg font-semibold text-black">
              Your Member
            </h3>
            <p className="text-black text-sm">
              Overview of the Your Member.
            </p>
          </div>
          <div className="lg:ml-3 mt-3 sm:mt-0">
            <div className="w-full flex gap-5 max-w-sm relative">
              <div className="relative">
                <input
                  id="search"
                  name="search"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e)}
                  className="bg-gray-800 w-full pr-11 h-10 pl-3 py-2 placeholder:text-slate-400 text-slate-100 text-sm border border-slate-200 rounded transition duration-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                  placeholder="Search for invoice..."
                />
                <button
                  className="absolute h-8 w-8 right-1 top-1 my-auto flex items-center bg-gray-800 rounded"
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="3"
                    stroke="currentColor"
                    className="w-5 h-5 text-slate-300"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="relative flex flex-col w-full h-full text-gray-700 bg-black shadow-md rounded-lg bg-clip-border mb-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left table-auto min-w-max border">
              <thead>
                <tr>
                  <th className="p-4 border-b border-slate-200 bg-black">
                    <p className="text-sm font-normal leading-none text-white">
                      UserName
                    </p>
                  </th>
                  <th className="p-4 border-b border-slate-200 bg-black">
                    <p className="text-sm font-normal leading-none text-white">
                      is_active
                    </p>
                  </th>
                  <th className="p-4 border-b border-slate-200 bg-black">
                    <p className="text-sm font-normal leading-none text-white">
                      Status
                    </p>
                  </th>
                  <th className="p-4 border-b border-slate-200 bg-black">
                    <p className="text-sm font-normal leading-none text-white">
                      E-Mail
                    </p>
                  </th>
                  <th className="p-4 border-b border-slate-200 bg-black">
                    <p className="text-sm font-normal leading-none text-white">
                      Active Plan
                    </p>
                  </th>
                  <th className="p-4 border-b border-slate-200 bg-black">
                    <p className="text-sm font-normal leading-none text-white">
                      Created at
                    </p>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-900 hover:bg-black">
                {(searchQuery ? allRefferal : referralTree)?.map(
                  (item, index) => (
                    <tr
                      key={index}
                      className="even:bg-gray-800 even:text:white text-gray-300"
                    >
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-300 sm:pl-3">
                        {item?.username}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                        <div className="flex items-center justify-end gap-x-2 sm:justify-start">
                          {item?.is_active === "active" ? (
                            <div className="flex-none rounded-full p-1">
                              <div className="h-1.5 w-1.5 rounded-full bg-green-800" />
                            </div>
                          ) : (
                            <div className="flex-none rounded-full p-1">
                              <div className="h-1.5 w-1.5 rounded-full bg-red-800" />
                            </div>
                          )}
                          <div className="hidden sm:block text-gray-300">
                            {item?.is_active}
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                        <div className="flex items-center justify-end gap-x-2 sm:justify-start">
                          {item?.status === "unblock" ? (
                            <div className="flex-none rounded-full p-1">
                              <div className="h-1.5 w-1.5 rounded-full bg-green-800" />
                            </div>
                          ) : (
                            <div className="flex-none rounded-full p-1">
                              <div className="h-1.5 w-1.5 rounded-full bg-red-800" />
                            </div>
                          )}
                          <div className="hidden sm:block text-gray-300">
                            {item?.status}
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                        {item?.email}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                        ${item?.active_plan}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                        {item?.created_at}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
