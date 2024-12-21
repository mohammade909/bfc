import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import { FaCheck, FaTimes } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";
import { GrEdit } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import SuccessAlert from "../BaseFile/comman/SuccessAlert";
import ErrorAlert from "../BaseFile/comman/ErrorAlert";
import {
  getAllSupport,
  deleteSupport,
  clearErrors,
  clearMessage,
  updateSupport,
} from "../redux/supportSlice";
import { Confirmation } from "../BaseFile/comman/Confirmation";

export default function AdminSupport() {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [editableSupport, setEditableSupport] = useState(null);
  const [allSupportMessage, setAllSupportMessage] = useState([]);
  const [deleteID, setDeleteID] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [values, setValues] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const { allsupport, loading, error, message } = useSelector(
    (state) => state.allsupport
  );

  useEffect(() => {
    dispatch(getAllSupport());
    setAllSupportMessage(allsupport);

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
  }, [dispatch, error, message, allsupport]);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setCurrentPage(1); // Reset to the first page when searching
    setAllSupportMessage(
      allsupport?.filter((p) =>
        p.email?.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const handleDelete = (id) => {
    setDeleteID(id);
    setModalOpen(true);
  };

  const isClose = () => {
    setModalOpen(false);
  };

  const handleEdit = (item) => {
    setEditableSupport(item);
    setEditMode(true);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditableSupport(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveChange = (id) => {
    if (editableSupport) {
      dispatch(updateSupport({ id: id, updatedData: values }));
      setEditMode(false);
      setEditableSupport(null);
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = (searchQuery ? allSupportMessage : allsupport)?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(
    (searchQuery ? allSupportMessage : allsupport)?.length / itemsPerPage
  );

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="bg-gray-900">
      <div className="px-4 sm:px-8 pt-5">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <input
          id="search"
          name="search"
          value={searchQuery}
          onChange={handleSearch}
          type="text"
          placeholder="search here . . ."
          className="block w-full max-w-lg pt-1 px-2 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>

      <div className="mt-8 flow-root">
        {message && <SuccessAlert message={message} />}
        {error && <ErrorAlert error={error} />}

        <div className="overflow-x-auto">
          <div className="inline-block min-w-full py-2 align-middle">
            <table className="min-w-full table-auto border-collapse whitespace-nowrap text-left">
              <thead className="border-r border-gray-700 text-sm leading-6 text-white">
                <tr>
                  <th className="py-2 pl-4 font-semibold sm:pl-6 lg:pl-8 border border-gray-700">ID</th>
                  <th className="sm:table-cell py-2 pl-2 pr-4 font-semibold sm:pr-8 border border-gray-700">Email</th>
                  <th className="py-2 pl-2 pr-4 text-left font-semibold sm:pr-8 border border-gray-700">Title</th>
                  <th className="py-2 pl-2 pr-4 text-left font-semibold sm:pr-8 border border-gray-700">Message</th>
                  <th className="py-2 pl-2 pr-4 text-left font-semibold sm:pr-8 border border-gray-700">Status</th>
                  <th className="py-2 pl-2 pr-4 text-left font-semibold sm:pr-8 border border-gray-700">Date</th>
                  <th className="sm:table-cell py-2 pl-2 pr-4 font-semibold sm:pr-6 lg:pr-8 border border-gray-700">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700 border border-gray-700">
                {currentData?.map((item, index) => (
                  <tr key={index}>
                    <td className="py-4 pl-4 sm:pl-6 lg:pl-8 border-r border-gray-700">
                      <div className="text-sm font-medium text-white">{item?.id}</div>
                    </td>
                    <td className="sm:table-cell py-4 pl-2 pr-4 sm:pr-8 border-r border-gray-700">
                      <div className="text-sm text-gray-400">{item?.email}</div>
                    </td>
                    <td className="py-4 pl-2 pr-4 sm:pr-8 border-r border-gray-700">
                      <div className="text-sm text-gray-400">{item?.title}</div>
                    </td>
                    <td className="py-4 pl-2 pr-4 sm:pr-8 border-r border-gray-700">
                      <div className="text-sm text-gray-400">{item?.message}</div>
                    </td>
                    <td className="py-4 pl-2 pr-4 sm:pr-8 border-r border-gray-700">
                      {editMode && editableSupport?.id === item?.id ? (
                        <select
                          id="status"
                          name="status"
                          className="block border-0 px-3 py-1 bg-gray-200 rounded-sm text-sm shadow focus:outline-none w-full"
                          onChange={handleChange}
                          defaultValue={item?.status}
                        >
                          <option value="pending">Pending</option>
                          <option value="inprogress">In Progress</option>
                          <option value="decline">Decline</option>
                          <option value="complete">Complete</option>
                        </select>
                      ) : (
                        <div className="text-sm text-gray-400">{item?.status}</div>
                      )}
                    </td>
                    <td className="py-4 pl-2 pr-4 sm:pr-8 border-r border-gray-700">
                      <div className="text-sm text-gray-400">{new Date(item?.createdAt).toLocaleDateString()}</div>
                    </td>
                    <td className="py-4 pl-2 pr-4 border-r border-gray-700">
                      <div className="flex justify-start space-x-4">
                        <Link to={`/user/profile/${item?.user_id}`}>
                          <FaEye className="h-4 w-4 text-green-700 cursor-pointer" title="View Profile" />
                        </Link>
                        {editMode && editableSupport?.id === item?.id ? (
                          <>
                            <FaCheck className="h-4 w-4 text-green-700 cursor-pointer" onClick={() => handleSaveChange(item?.id)} title="Submit Changes" />
                            <FaTimes className="h-4 w-4 text-red-700 cursor-pointer" onClick={handleCancelEdit} title="Cancel" />
                          </>
                        ) : (
                          <>
                            <AiFillDelete className="h-4 w-4 text-red-400 cursor-pointer" onClick={() => handleDelete(item?.id)} title="Delete" />
                            <GrEdit className="h-4 w-4 text-blue-400 cursor-pointer" onClick={() => handleEdit(item)} title="Edit" />
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination Buttons */}
        <div className="flex justify-between py-4 mx-8">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-md ${
              currentPage === 1
                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-indigo-600 text-white"
            }`}
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-md ${
              currentPage === totalPages
                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-indigo-600 text-white"
            }`}
          >
            Next
          </button>
        </div>
      </div>

      {modalOpen && (
        <Confirmation
          isClose={isClose}
          deletefunction={deleteSupport}
          id={deleteID}
        />
      )}
    </div>
  );
}
