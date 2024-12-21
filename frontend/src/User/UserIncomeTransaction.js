// import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
// import Loader from "../BaseFile/comman/Loader";
// import { getTransactionById, clearErrors, clearMessage } from "../redux/transactionSlice";

// export default function UserIncomeTransaction() {
//   const { table_name } = useParams();
//   const dispatch = useDispatch();

//   const { auth } = useSelector((state) => state.auth);
//   const { transaction, loading, error, message } = useSelector((state) => state.transaction);

//   useEffect(() => {
//     if (table_name && auth?.id) {
//       const user_id = auth?.id;
//       dispatch(getTransactionById({ table_name, user_id }));
//     }
//     if (error) {
//       const errorInterval = setInterval(() => {
//         dispatch(clearErrors());
//       }, 3000);
//       return () => clearInterval(errorInterval);
//     }
//     if (message) {
//       const messageInterval = setInterval(() => {
//         dispatch(clearMessage());
//       }, 3000);
//       return () => clearInterval(messageInterval);
//     }
//   }, [dispatch, table_name, auth?.id]);

//   return (
//     <>
//       <div className="lg:mx-5">
//         <div className="w-full flex flex-col sm:flex-row justify-between items-center mb-3 pl-3">
//           <div>
//             <h3 className="text-lg font-semibold text-slate-300">Transaction History</h3>
//             <p className="text-slate-400 text-sm">Overview of the Transaction History.</p>
//           </div>
//           <div className="ml-3 mt-3 sm:mt-0">
//             <div className="w-full flex gap-5 max-w-sm relative">
//               <div className="relative">
//                 <input
//                   id="search"
//                   name="search"
//                   className="bg-black w-full pr-11 h-10 pl-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-300 text-sm border border-slate-200 rounded transition duration-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
//                   placeholder="Search for invoice..."
//                 />
//                 <button
//                   className="absolute h-8 w-8 right-1 top-1 my-auto px-2 flex items-center bg-gray-900 rounded"
//                   type="button"
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     strokeWidth="3"
//                     stroke="currentColor"
//                     className="w-8 h-8 text-slate-300"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
//                     />
//                   </svg>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="relative flex flex-col w-full h-full text-gray-300 mb-4 bg-gray-800 px-2 py-1 shadow-md rounded-lg bg-clip-border">
//           {loading ? (
//             <Loader />
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full text-left table-auto min-w-max border">
//                 <thead>
//                   <tr>
//                     <th className="p-4 border-b border-slate-200 bg-black">
//                       <p className="text-sm font-normal leading-none text-white">ID</p>
//                     </th>
//                     <th className="p-4 border-b border-slate-200 bg-black">
//                       <p className="text-sm font-normal leading-none text-white">Amount</p>
//                     </th>
//                     <th className="p-4 border-b border-slate-200 bg-black">
//                       <p className="text-sm font-normal leading-none text-white">Type</p>
//                     </th>
//                     <th className="p-4 border-b border-slate-200 bg-black">
//                       <p className="text-sm font-normal leading-none text-white">On Amount</p>
//                     </th>
//                     <th className="p-4 border-b border-slate-200 bg-black">
//                       <p className="text-sm font-normal leading-none text-white">Percent</p>
//                     </th>
//                     <th className="p-4 border-b border-slate-200 bg-black w-16">
//                       <p className="text-sm font-normal leading-none text-white">Created At</p>
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-gray-900">
//                   {transaction
//                     ?.slice()
//                     .reverse()
//                     .map((item, index) => (
//                       <tr key={index} className="even:bg-gray-800">
//                         <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-300 sm:pl-3">
//                           {item?.email}
//                         </td>
//                         <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-300 sm:pl-3">
//                           $ {item?.amount}
//                         </td>
//                         <td className="whitespace-nowrap px-3 py-4 capitalize text-sm text-gray-300">
//                           {table_name?.split("_")[0]}
//                         </td>
//                         <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
//                           $ {item?.onamount}
//                         </td>
//                         <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
//                           {item?.percent} %
//                         </td>
//                         <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
//                           {item?.createdAt}
//                         </td>
//                       </tr>
//                     ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }


import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Loader from "../BaseFile/comman/Loader";
import { getTransactionById, clearErrors, clearMessage } from "../redux/transactionSlice";

export default function UserIncomeTransaction() {
  const { table_name } = useParams();
  const { fit } = useParams();
  const dispatch = useDispatch();

  const { auth } = useSelector((state) => state.auth);
  const { transaction, loading, error, message } = useSelector((state) => state.transaction);

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 20;

  // Calculate total pages
  const totalPages = Math.ceil(transaction?.length / entriesPerPage);

  // Get current transactions to display
  const currentTransactions = transaction
    ?.slice()
    .reverse()
    .slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage);

  useEffect(() => {
    if (table_name && auth?.id) {
      const user_id = auth?.id;
      dispatch(getTransactionById({ table_name, user_id }));
    }
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
  }, [dispatch, table_name, auth?.id]);

  // Pagination handlers
  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <>
      <div className="lg:mx-5">
        <div className="w-full flex flex-col sm:flex-row justify-between items-center mb-3 pl-3">
          <div>
            <h3 className="text-lg font-semibold text-slate-300">Transaction History</h3>
            <p className="text-slate-400 text-sm">Overview of the Transaction History.</p>
          </div>
          <div className="ml-3 mt-3 sm:mt-0">
            <div className="w-full flex gap-5 max-w-sm relative">
              <div className="relative">
                <input
                  id="search"
                  name="search"
                  className="bg-black w-full pr-11 h-10 pl-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-300 text-sm border border-slate-200 rounded transition duration-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                  placeholder="Search for invoice..."
                />
                <button
                  className="absolute h-8 w-8 right-1 top-1 my-auto px-2 flex items-center bg-gray-900 rounded"
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="3"
                    stroke="currentColor"
                    className="w-8 h-8 text-slate-300"
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

        <div className="relative flex flex-col w-full h-full text-gray-300 mb-4 bg-gray-800 px-2 py-1 shadow-md rounded-lg bg-clip-border">
          {loading ? (
            <Loader />
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-left table-auto min-w-max border">
                  <thead>
                    <tr>
                      <th className="p-4 border-b border-slate-200 bg-black">
                        <p className="text-sm font-normal leading-none text-white">SR No</p>
                      </th>
                      <th className="p-4 border-b border-slate-200 bg-black">
                        <p className="text-sm font-normal leading-none text-white">ID</p>
                      </th>
                      <th className="p-4 border-b border-slate-200 bg-black">
                        <p className="text-sm font-normal leading-none text-white">Amount</p>
                      </th>
                      <th className="p-4 border-b border-slate-200 bg-black">
                        <p className="text-sm font-normal leading-none text-white">Type</p>
                      </th>
                      {table_name !== 'reward_transaction' ? (
                        <>
                      <th className="p-4 border-b border-slate-200 bg-black">
                        <p className="text-sm font-normal leading-none text-white">On Amount</p>
                      </th>
                      <th className="p-4 border-b border-slate-200 bg-black">
                        <p className="text-sm font-normal leading-none text-white">Percent</p>
                      </th></>
                      ):(null)}
                      <th className="p-4 border-b border-slate-200 bg-black w-16">
                        <p className="text-sm font-normal leading-none text-white">Created At</p>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-900">
                    {(fit ? currentTransactions?.filter((item)=>item?.type.includes(fit)) : currentTransactions)?.map((item, index) => (
                      <tr key={index} className="even:bg-gray-800">
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-300 sm:pl-3">
                          {((currentPage - 1) * entriesPerPage) + index + 1}
                        </td>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-300 sm:pl-3">
                          {item?.email}
                        </td>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-300 sm:pl-3">
                          $ {item?.amount}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 capitalize text-sm text-gray-300">
                          {table_name == 'invest_level_transaction' ? (item?.type): (table_name.split("_")[0])}
                        </td>
                        {table_name !== 'reward_transaction' ? (
                          <>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                          $ {item?.onamount}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {item?.percent} %
                        </td>
                      </>):(null)}
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                          {item?.createdAt}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination controls */}
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 bg-gray-700 text-white rounded ${
                    currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  Previous
                </button>
                <p className="text-sm text-gray-300">
                  Page {currentPage} of {totalPages}
                </p>
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 bg-gray-700 text-white rounded ${
                    currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
