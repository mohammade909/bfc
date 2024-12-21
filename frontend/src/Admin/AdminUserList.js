import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import { GrView } from "react-icons/gr";
import { useParams } from "react-router-dom";
import SuccessAlert from "../BaseFile/comman/SuccessAlert";
import ErrorAlert from "../BaseFile/comman/ErrorAlert";
import { RiLoginCircleFill } from "react-icons/ri";
import { Confirmation } from "../BaseFile/comman/Confirmation";
import Loader from "../BaseFile/comman/Loader";
import { FaArrowAltCircleUp, FaArrowCircleDown } from "react-icons/fa";
import { loginUser } from "../redux/authSlice";
import { getAllUsers, deleteUsers } from "../redux/userSlice";
import { clearErrors, clearMessage } from "../redux/withdrawalSlice";
import AdminCashHandle from "./AdminCashHandle";
import { useDispatch, useSelector } from "react-redux";

export default function AdminUserList() {
  const { action } = useParams();
  const dispatch = useDispatch();
  const { allusers, loading } = useSelector((state) => state.allusers);
  const { message, error } = useSelector((state) => state.allwithdrawal);

  const [allUser, setAllUser] = useState(allusers);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalopen, setModalopen] = useState(false);
  const [deleteID, setdeleteID] = useState();
  const [cashHandle, setCashHandle] = useState(null);
  const [userId, setUserId] = useState();
  const [name, setName] = useState(null);
  const [balance, setBalance] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Set the number of items per page

  useEffect(() => {
    dispatch(getAllUsers());
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
  }, [dispatch, error, message]);

  useEffect(() => {
    if (action === "all") {
      setAllUser(allusers);
    } else {
      setAllUser(
        allusers?.filter((p) => p.is_active === action || p.status === action)
      );
    }
  }, [action, allusers]);

  useEffect(() => {
    setCurrentPage(1); // Reset page when filtering or searching
  }, [searchQuery]);

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchQuery(searchTerm);
  };

  const handleDelete = (id) => {
    setdeleteID(id);
    setModalopen(true);
  };

  const handleCash = (action, name, id, balance) => {
    setCashHandle(action);
    setName(name);
    setUserId(id);
    setBalance(balance);
  };

  const handleSession = (item) => {
    const values = { email: item.email, password: item.password };
    dispatch(loginUser(values));
    window.open("/user/dashboard", "_blank");
  };

  const handlePagination = (direction) => {
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const filteredUsers = allusers
    ?.filter((item) => item.role !== "admin")
    ?.filter((item) => item.username.toLowerCase().includes(searchQuery));

  const totalPages = Math.ceil(filteredUsers?.length / itemsPerPage);

  const paginatedUsers = filteredUsers?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-gray-900">
      <div className="pt-5">
        <label htmlFor="email" className="sr-only">Search</label>
        <input
          id="search"
          name="search"
          value={searchQuery}
          onChange={handleSearch}
          type="text"
          placeholder="search here . . ."
          className="block w-full md:w-[50vh] px-2 py-1 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
      {message && <SuccessAlert message={message} />}
      {error && <ErrorAlert error={error} />}

      <div className={` ${loading ? "h-[560px] items-center" : "h-full"}`}>
        {loading ? (
          <Loader />
        ) : (
          <div className="mt-4 flow-root">
            <div className="overflow-x-auto">
              <div className="py-2">
                <table className="divide-y divide-gray-700 w-full border border-gray-700">
                  <thead className="border-b border-white/10 text-sm leading-6 text-white">
                    <tr>
                      <th className="px-2 ml-4 text-left text-white border border-gray-700">E-mail</th>
                      <th className="px-2 py-4 text-white border border-gray-700 text-center">Wallet</th>
                      <th className="px-2 py-4 text-center text-white border border-gray-700">Account Status</th>
                      <th className="px-2 py-4 text-center text-white border border-gray-700">Package Status</th>
                      <th className="px-2 py-4 text-center text-white border border-gray-700">Created at</th>
                      <th className="px-2 py-4 text-center text-white border border-gray-700">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {paginatedUsers?.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-700 transition-colors duration-200">
                        <td className="px-4 py-4 text-left text-white border border-gray-700">
                          <div className="flex items-center justify-center gap-x-4">
                            <div className="truncate text-sm font-medium leading-6 text-white w-full">
                              {item?.email}
                              <button
                                onClick={() => {
                                  navigator.clipboard.writeText(item?.refferal_code || "");
                                  alert("Copied to clipboard!");
                                }}
                                className="focus:outline-none text-white bg-indigo-600 ml-1 px-4 py-[2px] rounded-full text-[10px]"
                              >
                                {item?.refferal_code}
                              </button>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-white border border-gray-700">
                          <div className="flex justify-between">
                            <button
                              onClick={() => handleCash("credit", item?.username, item?.id, item?.business)}
                              className="bg-green-600 text-white p-2 rounded transition-all duration-200 hover:bg-green-500"
                            >
                              <FaArrowAltCircleUp />
                            </button>
                            <div>${item?.business}</div>
                            <button
                              onClick={() => handleCash("debit", item?.username, item?.id, item?.business)}
                              className="bg-red-600 text-white p-2 rounded transition-all duration-200 hover:bg-red-500"
                            >
                              <FaArrowCircleDown />
                            </button>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-center text-white border border-gray-700">
                          {item?.status === "block" ? (
                            <div className="flex items-center text-white gap-2">
                              <div className="h-1.5 w-1.5 rounded-full bg-red-800" />
                              Blocked
                            </div>
                          ) : (
                            <div className="flex items-center text-white gap-2">
                              <div className="h-1.5 w-1.5 rounded-full bg-green-800" />
                              Unblocked
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-4 text-center text-white border border-gray-700">
                          {item?.is_active === "active" ? (
                            <div className="flex items-center text-white gap-2">
                              <div className="h-1.5 w-1.5 rounded-full bg-green-800" />
                              Activated
                            </div>
                          ) : (
                            <div className="flex items-center text-white gap-2">
                              <div className="h-1.5 w-1.5 rounded-full bg-red-800" />
                              Not Activated
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-4 text-center text-white border border-gray-700">
                          <div className="text-sm text-gray-400">
                            {new Date(item?.created_at).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-4 py-4 text-center text-white border border-gray-700">
                          <div className="flex justify-center items-center space-x-2">
                            <button onClick={() => handleSession(item)}>
                              <RiLoginCircleFill />
                            </button>
                            <Link to={`/admin/check/profile/${item?.id}`}>
                              <GrView />
                            </Link>
                            <button onClick={() => handleDelete(item?.id)}>
                              <AiFillDelete />
                            </button>
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

      {modalopen && <Confirmation isClose={() => setModalopen(false)} deletefunction={deleteUsers} id={deleteID} />}
      {cashHandle && (
        <AdminCashHandle
          HandleCashmodel={() => setCashHandle(null)}
          cashHandle={cashHandle}
          userId={userId}
          name={name}
          balance={balance}
        />
      )}

      {/* Pagination Controls */}
      <div className="flex justify-between py-4 mx-8">
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
