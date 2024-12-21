import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Loader from "../BaseFile/comman/Loader";
import SuccessAlert from "../BaseFile/comman/SuccessAlert";
import ErrorAlert from "../BaseFile/comman/ErrorAlert";
import { getPlan,updatePlan, clearErrors, clearMessage } from "../redux/planSlice";
import { useParams } from "react-router-dom";
export default function AdminEditPlan() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singleplan ,loading, error, message } = useSelector((state) => state.allplans);
  const [upadtedValues, setUpdatedValues] = useState({});

  useEffect(() => {
    dispatch(getPlan(id));
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveChanges = (e) => {
      dispatch(updatePlan({id:id, updatedData: upadtedValues }));
  };

  return (
    <>
      <div className={`${loading ? "h-[560px] items-center" : "h-full"}`}>
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="h-[2px] bg-gray-800 w-full" />
            <div className="bg-gray-100">
              <div className="max-w-7xl mx-auto bg-white rounded shadow overflow-hidden">
                {message && <SuccessAlert message={message} />}
                {error && <ErrorAlert error={error} />}
                <div className="px-6 py-4">
                  <h2 className="text-xl font-semibold mb-5 text-gray-800 mb-2">
                    Editable Details
                  </h2>
                  <form>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                          Plan Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          onChange={handleChange}
                          defaultValue={singleplan?.name || ""}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                          Price /monthly
                        </label>
                        <input
                          type="number"
                          name="monthly_price"
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          onChange={handleChange}
                          defaultValue={singleplan?.monthly_price || ""}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                          Description
                        </label>
                        <input
                          type="text"
                          name="description"
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          onChange={handleChange}
                          defaultValue={singleplan?.description || ""}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                          ROI / Day
                        </label>
                        <input
                          type="number"
                          name="ROI_day"
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          onChange={handleChange}
                          defaultValue={singleplan?.ROI_day || ""}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                          ROI / overall
                        </label>
                        <input
                          type="number"
                          name="ROI_overall"
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          onChange={handleChange}
                          defaultValue={singleplan?.ROI_overall || ""}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                          Sponser Bonus
                        </label>
                        <input
                          type="number"
                          name="Sponser_bonus"
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          onChange={handleChange}
                          defaultValue={singleplan?.Sponser_bonus || ""}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                          Plan Period
                        </label>
                        <input
                          type="number"
                          name="plan_period"
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          onChange={handleChange}
                          defaultValue={singleplan?.plan_period || ""}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                          Yearly Discount
                        </label>
                        <input
                          type="number"
                          name="yearly_discount"
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          onChange={handleChange}
                          defaultValue={singleplan?.yearly_discount || ""}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end mt-6">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
                        onClick={handleSaveChanges}
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}