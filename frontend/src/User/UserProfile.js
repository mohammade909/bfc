import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Loader from "../BaseFile/comman/Loader"
import SuccessAlert from "../BaseFile/comman/SuccessAlert"
import ErrorAlert from "../BaseFile/comman/ErrorAlert"
import { getUser, updateUsers,clearErrors, clearMessage } from "../redux/userSlice";
export default function UserProfile() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singleuser, loading, error, message } = useSelector(
    (state) => state.allusers
  );
  const [editUser, setEditUser] = useState([]);

  useEffect(() => {
    dispatch(getUser(id));
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
  }, [dispatch, error, message, clearErrors, clearMessage, id]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    const updatedData = {
      ...editUser,
      updated_at: new Date().toISOString(),
    };
    dispatch(
      updateUsers({
        id: id,
        updatedData: updatedData,
      }
    )
    );
  };
  return (
    <>
     
<div
  className={`${
    loading ? "h-[560px] items-center" : "h-full"
  }`}
>
  {loading ? (
    <Loader />
  ) : (
    <>
      {message && <SuccessAlert message={message} />}
      {error && <ErrorAlert error={error} />}
      <div className="bg-black">
        <div className="max-w-full bg-gray-800 rounded shadow overflow-hidden">
          <div className="px-6 py-4">
            <h2 className="text-xl capitalize font-semibold text-gray-200 mb-4">
              {singleuser?.username} Detail
            </h2>
            <div className="flex flex-wrap gap-4 ">
              <div className="w-full sm:w-1/2 flex gap-4 justify-between">
                <div className="font-medium text-gray-300">Last Login</div>
                <div className="text-gray-300">
                  {singleuser?.last_login || " - "}
                </div>
              </div>
              <div className="w-full sm:w-1/2 flex gap-4 justify-between">
                <div className="font-medium text-gray-300">Created At</div>
                <div className="text-gray-300">
                  {singleuser?.created_at || " - "}
                </div>
              </div>
              <div className="w-full sm:w-1/2 flex gap-4 justify-between">
                <div className="font-medium text-gray-300">Verify At</div>
                <div className="text-gray-300">
                  {singleuser?.verify_at || " - "}
                </div>
              </div>
              <div className="w-full sm:w-1/2 flex gap-4 justify-between">
                <div className="font-medium text-gray-300">Updated At</div>
                <div className="text-gray-300">
                  {singleuser?.updated_at || " - "}
                </div>
              </div>
              <div className="w-full sm:w-1/2 flex gap-4 justify-between">
                <div className="font-medium text-gray-300">Reffer By</div>
                <div className="text-gray-300">
                  {singleuser?.reffer_by || " - "}
                </div>
              </div>
              <div className="w-full sm:w-1/2 flex gap-4 justify-between">
                <div className="font-medium text-gray-300">Activation Date</div>
                <div className="text-gray-300">
                  {singleuser?.activation_date || " - "}
                </div>
              </div>
              <div className="w-full sm:w-1/2 flex gap-4 ">
                <div className="font-medium text-gray-300">Paid Member</div>
                <div className="text-gray-300">
                  {singleuser?.paid_member || " - "}
                </div>
              </div>
              <div className="w-full sm:w-1/2 flex gap-4">
                <div className="font-medium text-gray-300">Refferal Code</div>
                <div className="text-gray-300">
                  {singleuser?.refferal_code || " - "}
                </div>
              </div>
              <div className="w-full sm:w-1/2 flex gap-4">
                <div className="font-medium text-gray-300">Total Team</div>
                <div className="text-gray-300">
                  {singleuser?.total_team || " - "}
                </div>
              </div>
              <div className="w-full flex flex-col sm:flex-row sm:flex-wrap gap-4 p-4 bg-gray-800 rounded-md shadow-lg">
  {/* Bep 20 Input */}
  <div className="w-full sm:w-1/2 flex flex-col gap-2">
    <label className="font-medium text-gray-300">Bep 20</label>
    <input 
      name="bep20" 
      onChange={handleChange} 
      defaultValue={singleuser?.bep20}
      className="w-full p-2 bg-gray-700 text-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Enter Bep 20 value" 
    />
  </div>

  {/* Trc 20 Input */}
  <div className="w-full sm:w-1/2 flex flex-col gap-2">
    <label className="font-medium text-gray-300">Trc 20</label>
    <input 
      name="trc20" 
      onChange={handleChange} 
      defaultValue={singleuser?.trc20}
      className="w-full p-2 bg-gray-700 text-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Enter Trc 20 value" 
    />
  </div>

  {/* Update Button */}
  <div className="w-full sm:w-1/2 flex justify-start mt-4 sm:mt-0">
    <button 
      onClick={handleSaveChanges}
      className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition duration-200"
    >
      Update
    </button>
  </div>
</div>

            </div>
          </div>
        </div>
      </div>
      <div className="h-[2px] bg-gray-800 w-full border-t" />
    
    </>
  )}
</div>

    </>
  );
}
