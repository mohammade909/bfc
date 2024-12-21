import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, Fragment } from "react";
import Loader from "../BaseFile/comman/Loader";
import { getAllDepositeByid } from "../redux/depositeSlice";
import { getAllWithdrawalByid } from "../redux/withdrawalSlice";
import { ArrowUpCircleIcon } from "@heroicons/react/20/solid";

import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ClockIcon,
} from "@heroicons/react/20/solid";
const statuses = {
  pending: "text-green-700 bg-green-50 ring-green-600/20",
  complete: "text-gray-600 bg-gray-50 ring-gray-500/10",
  inprogress: "text-red-700 bg-red-50 ring-red-600/10",
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function UserTransaction() {
  const dispatch = useDispatch();
  const { singleDeposite, loading, error, message } = useSelector(
    (state) => state.alldeposite
  );
  const { singleWithdrawal } = useSelector((state) => state.allwithdrawal);

  const { auth } = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth?.id) {
      dispatch(getAllDepositeByid(auth?.id));
      dispatch(getAllWithdrawalByid(auth?.id));
    }
  }, [auth?.id]);
  let combinedArray = [];

  const depositsWithType =
    singleDeposite?.map((deposit) => ({ ...deposit, type: "deposit" })) || [];
  const withdrawalsWithType =
    singleWithdrawal?.map((withdrawal) => ({
      ...withdrawal,
      type: "withdrawal",
    })) || [];

  if (withdrawalsWithType.length > 0) {
    combinedArray = [...depositsWithType, ...withdrawalsWithType];
    combinedArray.sort((a, b) => new Date(a.createdAT) - new Date(b.createdAT));
  }


  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="mx-auto lg:max-w-2xl lg:mx-0 w-full" >
  {/* Table structure with fixed header and scrollable body */}
  <div className="relative overflow-x-auto rounded-lg">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-900 sticky top-0">
        <tr className="py-2">
          <th
            scope="col"
            className="whitespace-nowrap py-3.5 text-left text-sm font-semibold text-gray-300 px-2 border-b border-gray-300"
          >
            ID
          </th>
          <th
            scope="col"
            className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-300 border-b border-gray-300"
          >
            Date
          </th>
          <th
            scope="col"
            className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-300 border-b border-gray-300"
          >
            Type
          </th>
          <th
            scope="col"
            className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-300 border-b border-gray-300"
          >
            Amount
          </th>
          <th
            scope="col"
            className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900 border-b border-gray-300"
          >
            Accept At
          </th>
          <th
            scope="col"
            className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-300 border-b border-gray-300"
          >
            Status
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-black">
        {combinedArray
          ?.slice(-8)
          .reverse()
          .map((transaction) => (
            <tr key={transaction.id} className="hover:bg-gray-900">
              <td className="whitespace-nowrap py-3 text-sm text-gray-500 px-2">
                {transaction.id}
              </td>
              <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                {new Date(transaction.createdAT).toLocaleDateString()}{" "}
                {new Date(transaction.createdAT).toLocaleTimeString()}
              </td>
              <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                {transaction.type}
              </td>
              <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                $ {transaction.amount}
              </td>
              <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                {transaction.acceptat || " - - "}
              </td>
              <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                {transaction.status === "complete" ? (
                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                ) : transaction.status === "pending" ? (
                  <ClockIcon className="h-5 w-5 text-yellow-500" />
                ) : (
                  <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                )}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  </div>
</div>

      )}
    </>
  );
}
