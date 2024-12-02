import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserById } from "../features/userSlice";
import { RootState } from "../store";

const UserDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const { selectedUser, loading, error } = useSelector(
    (state: RootState) => state.users
  );

  useEffect(() => {
    dispatch(fetchUserById(Number(id)));
  }, [id, dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!selectedUser) return <p>No user found.</p>;

  return (
    <div>
      <h1>
        {selectedUser.firstName} {selectedUser.lastName}
      </h1>
      <p>Email: {selectedUser.email}</p>
      <p>Phone: {selectedUser.phone}</p>
      <p>Company: {selectedUser.company.name}</p>
      <p>Address: {selectedUser.company.address}</p>
    </div>
  );
};

export default UserDetails;
