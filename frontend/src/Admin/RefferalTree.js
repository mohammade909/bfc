import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getReferralTree,clearErrors, clearMessage  } from "../redux/referralSlice";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
const TreeNode = ({ user }) => {
  return (
    <div className="flex items-center">
      <div className="relative">
        <img
          src="/default.jpg"
          alt={user?.username}
          className="w-10 h-10 rounded-full border border-gray-300"
        />
        <div className="absolute w-0.5 h-full bg-gray-300 left-1/2 transform -translate-x-1/2 top-10"></div>
      </div>
      <div className="ml-2">{user?.username}</div>
    </div>
  );
};

const UserTree = ({ users }) => {
  return (
    <div className="flex flex-col">
      {users?.map((user, index) => (
        <div key={user?.id} className="flex flex-col items-center">
          <TreeNode user={user} />
          {index < users.length - 1 && <div className="h-5"></div>}
        </div>
      ))}
    </div>
  );
};

// Example usage

const RefferalTree = () => {
  const { referral_code } =useParams()
  const dispatch = useDispatch();
  const { referralTree } = useSelector(
    (state) => state.referralTree
  );


  useEffect(() => {
    dispatch(getReferralTree(referral_code));
  }, [dispatch, referral_code]);
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Refferal Tree</h1>
      {referralTree?.length > 0 ? (<UserTree users={referralTree} />) : ( " no tree ")}
      
    </div>
  );
};

export default RefferalTree;
