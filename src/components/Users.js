import React, { useEffect, useState } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import { useDeleteUserMutation, useGetUserQuery } from "../services/api";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import UserEntry from "./UserEntry";

function Users() {
  const {data, error , isLoading} = useGetUserQuery();
  console.log(data);
  const [user,setUser]=useState(data);
  const [showModal, setShowModal] = useState(false);
  const [userid, setUserId] = useState("");
  const [deletefunc] = useDeleteUserMutation();
  useEffect(() => {
    if (error) {
      toast.error("Something Went Wrong!!!");
    }
    
    if(data){
      setUser(data)
    }
  }, [error,data]);

  const openmodal = () => {
    setShowModal(true);
  };
  const closemodal = () => {
    setShowModal(false);
  };
  if (isLoading) {
    // Handle loading state
    return <h1>Loading...</h1>;
  }

  const UserModal = () => {
    if (showModal) {
      return <UserEntry show={showModal} onClose={closemodal} id={userid} />;
    }
  };
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deletefunc(id)
        .then(() => {
          toast.success("User deleted successfully");
        })
        .catch((error) => {
          toast.error("Failed to delete user");
        });
    }
  };
  return (
    <div className="container-fluid">
      <div className="p-3 bg-primary text-white text-center">
        <h1>User Details Management System</h1>
        <p>
          The User Details Management System is a powerful and user-friendly
          application designed to help you efficiently manage user data. Whether
          you are a business owner, a project manager, or an individual looking
          to organize personal information, this system provides a convenient
          platform for storing, creating, editing, and deleting user details.
        </p>
      </div>
      <Row className="custom-padding center-items">
        <Col xs={8}>
          <h1>Users Details</h1>
        </Col>
        <Col xs={2}>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
            />
          </div>
        </Col>
        <Col xs={2}>
          <div className="d-flex justify-content-end">
            <Button variant="primary"  onClick={() => (setUserId(""), openmodal())}>
              <FaPlus />
              Add User
            </Button>
          </div>
        </Col>
      </Row>
      {UserModal()}
      <div className="small-width">
        <Table striped bordered>
          <thead className="text-center">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Action</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {user &&
              user.map((items) => {
                return (
                  <tr key={items.id}>
                    <th>{items.id}</th>
                    <th>{items.name}</th>
                    <th>{items.email}</th>
                    <th>{items.contact}</th>
                    <th>
                      <Button
                        variant="warning"
                        onClick={() => (setUserId(items.id), openmodal())}
                      >
                        <FaEdit />
                      </Button>
                    </th>
                    <th>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(items.id)}
                      >
                        <FaTrash />
                      </Button>
                    </th>
                  </tr>
                );
              })}
          </tbody> 
        </Table>
      </div>
    </div>
  );
}

export default Users;
