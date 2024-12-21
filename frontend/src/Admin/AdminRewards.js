import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import { GrView } from "react-icons/gr";
import SuccessAlert from "../BaseFile/comman/SuccessAlert";
import ErrorAlert from "../BaseFile/comman/ErrorAlert";
import { Confirmation } from "../BaseFile/comman/Confirmation";
import Loader from "../BaseFile/comman/Loader";
import { TbBinaryTree } from "react-icons/tb";
import {
  getAllUsers,
  clearErrors,
  deleteUsers,
  clearMessage,
} from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";

export default function AdminRewards() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const { allusers, loading, error, message } = useSelector(
    (state) => state.allusers
  );
  const [allUser, setAllUser] = useState(allusers);
  const [searchQuery, setSearchQuery] = useState("");
  const [itemsPerPage] = useState(10);
  useEffect(() => {
    dispatch(getAllUsers());
    setAllUser(allusers);

    if (error) {
      const errorInterval = setInterval(() => {
        dispatch(clearErrors());
      }, 3000);
      return () => clearInterval(errorInterval);
    }
    if (message) {
      const messageInterval = setInterval(() => {
        dispatch(clearMessage());
      }, 3000);
      return () => clearInterval(messageInterval);
    }
  }, [dispatch, error, message, clearErrors, clearMessage]);

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setAllUser(
      allusers?.filter((p) => p.username?.toLowerCase().includes(searchTerm))
    );
    setSearchQuery(e.target.value);
  };

  const totalPages = Math.ceil((searchQuery ? allUser : allusers)?.length / itemsPerPage);
  const currentUsers = (searchQuery ? allUser : allusers)?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePagination = (direction) => {
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };


  return (
    <div className="bg-gray-900 ">
      <div className="md:px-8 pt-5">
        <label htmlFor="email" className="sr-only">
          Search
        </label>
        <input
          id="search"
          name="search"
          value={searchQuery}
          onChange={(e) => handleSearch(e)}
          type="text"
          placeholder="search here . . ."
          className="block w-[50vh] px-2 py-1 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
      {message && <SuccessAlert message={message} />}
      {error && <ErrorAlert error={error} />}

      <div
        className={`flex justify-center ${
          loading ? "h-[560px] items-center" : "h-full"
        }`}
      >
        {loading ? (
          <Loader />
        ) : (
          <div className="mt-4 flow-root w-full">
            <div className="overflow-x-auto">
              <div className="min-w-full">
                <table className="min-w-full divide-y divide-gray-700 border border-gray-700">
                  <thead className="border-b border-white/10 text-sm leading-6 text-white">
                    <tr>
                      <th
                        scope="col"
                        className="px-2 py-4 text-center text-white border border-gray-700"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-4 text-center text-white border border-gray-700"
                      >
                        Reward
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-4 text-center text-white border border-gray-700 sm:table-cell"
                      >
                        Reward Level
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-4 text-center text-white border border-gray-700 md:table-cell"
                      >
                        Reward Start Date
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-4 text-center text-white border border-gray-700 lg:table-cell"
                      >
                        Reward Duration
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-4 text-center text-white border border-gray-700 lg:table-cell"
                      >
                        Reward Remaining Months
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {(searchQuery ? allUser : currentUsers)?.map((item, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-700 transition-colors duration-200"
                      >
                        <td className="px-4 py-4 text-center text-white border border-gray-700">
                          <div className="flex justify-center items-center gap-2">
                            {item?.username || "-"}
                          </div>
                        </td>
                        <td className="px-4 py-4 text-center text-white border border-gray-700">
                          <div className="flex justify-center items-center gap-2">
                            {item?.reward || "-"}
                          </div>
                        </td>
                        <td className="px-4 py-4 text-center text-white border border-gray-700 sm:table-cell">
                          <div className="flex justify-center items-center gap-2">
                            {item?.reward_level || "-"}
                          </div>
                        </td>
                        <td className="px-4 py-4 text-center text-white border border-gray-700 md:table-cell">
                          <div className="flex justify-center items-center gap-2">
                            {item?.reward_start_date || "-"}
                          </div>
                        </td>
                        <td className="px-4 py-4 text-center text-white border border-gray-700 lg:table-cell">
                          <div className="flex justify-center items-center gap-2">
                            {item?.reward_duration || "-"}
                          </div>
                        </td>
                        <td className="px-4 py-4 text-center text-white border border-gray-700 lg:table-cell">
                          <div className="flex justify-center items-center gap-2">
                            {item?.reward_remaining_months || "-"}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between py-4">
        <button
          onClick={() => handlePagination("prev")}
          disabled={currentPage === 1}
          className="text-white bg-indigo-600 px-4 py-2 rounded"
        >
          Previous
        </button>
        <div className="text-white">
          Page {currentPage} of {totalPages}
        </div>
        <button
          onClick={() => handlePagination("next")}
          disabled={currentPage === totalPages}
          className="text-white bg-indigo-600 px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}
