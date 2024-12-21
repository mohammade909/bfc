import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import { Confirmation } from "../BaseFile/comman/Confirmation";
import Loader from "../BaseFile/comman/Loader";
import { Radio, RadioGroup } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import Spinner from "../BaseFile/comman/Spinner";

import {
  getAllPlans,
  clearErrors,
  deletePlan,
  clearMessage,
} from "../redux/planSlice";
import { useDispatch, useSelector } from "react-redux";

export default function AdminPlan() {
  const dispatch = useDispatch();
  const { allplans, loading, error, message } = useSelector(
    (state) => state.allplans
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [modalopen, setModalopen] = useState(false);
  const [annual, setAnnual] = useState(false);
  const [deleteID, setdeleteID] = useState();

  useEffect(() => {
    dispatch(getAllPlans());
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

  function isClose() {
    setModalopen(false);
  }
  function handleDelete(id) {
    setdeleteID(id);
    if (deleteID) {
      console.log(id);
      setModalopen(true);
    }
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="bg-gray-100 border rounded-lg">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-1">
          <div className=" isolate mx-auto mt-10 grid max-w-md grid-cols-1 my-2   gap-8 md:max-w-2xl md:grid-cols-2 lg:max-w-4xl xl:mx-0 xl:max-w-none xl:grid-cols-4">
              {allplans?.map((allPlan) => (
                <div className="transition-transform duration-300 p-8 bg-gradient-to-r from-gray-900 to-indigo-900 border rounded-2xl shadow-xl transform hover:scale-105">
                  <div className="flex justify-between">
                    <h3 className="text-center text-gray-300 text-2xl capitalize font-semibold">
                      {allPlan?.name}
                    </h3>
                  </div>
                  <div key={allPlan?.id}>
                    <p className="mt-4 text-sm leading-6 text-gray-400">
                      {allPlan?.description}
                    </p>
                    <p className="mt-6 flex items-baseline gap-x-1">
                      <span className="text-3xl font-bold tracking-tight text-gray-300">
                        ${allPlan?.monthly_price}
                      </span>
                    </p>

                    <ul
                      role="list"
                      className="mt-8 space-y-3 text-sm leading-6 text-gray-600"
                    >
                      <li className="flex gap-x-3 text-gray-300">
                        <CheckIcon
                          aria-hidden="true"
                          className="h-6 w-5 flex-none text-indigo-600"
                        />
                        {allPlan?.ROI_overall} % ROI Overall
                      </li>
                      <li className="flex gap-x-3 text-gray-300">
                        <CheckIcon
                          aria-hidden="true"
                          className="h-6 w-5 flex-none text-indigo-600"
                        />
                        {allPlan?.Sponser_bonus} % Sponser Bonus
                      </li>
                      <li className="flex gap-x-3 text-gray-300">
                        <CheckIcon
                          aria-hidden="true"
                          className="h-6 w-5 flex-none text-indigo-600"
                        />
                        T & C : Participants must be at least 18 years old to enroll in any marketing plan
                      </li>
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {modalopen && (
        <Confirmation
          isClose={isClose}
          deletefunction={deletePlan}
          id={deleteID}
        />
      )}
    </>
  );
}
