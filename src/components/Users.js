import React, { useEffect, useState } from "react";
import { Button, Col, Row, Table,Spinner } from "react-bootstrap";
import { useDeleteUserMutation, useGetUserQuery } from "../services/api";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import UserEntry from "./UserEntry";

function Users() {
  const [user, setUser] = useState([]);
  const { data, error, isLoading } = useGetUserQuery(
    
  );

  useEffect(() => {
    if (error) {
      toast.error("Something Went Wrong!!!");
    }

    if (data) {
      setUser(data);
    }
  }, [error, data]);

 

  const [showModal, setShowModal] = useState(false);
  const [userid, setUserId] = useState("");
  const [deletefunc] = useDeleteUserMutation();

  const openmodal = () => {
    setShowModal(true);
  };
  const closemodal = () => {
    setShowModal(false);
  };
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <Spinner animation="border" />
      </div>
    );
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
        <h1>User Management System</h1>
        <p>The User Details Management System</p>
      </div>
      <Row className="custom-padding center-items">
        <Col xs={8}>
          <h1>Users Details</h1>
        </Col>
       
        <Col xs={2}>
          <div className="d-flex justify-content-end">
            <Button variant="primary" onClick={() => (setUserId(""), openmodal())}>
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
                    <td>{items.id}</td>
                    <td>{items.name}</td>
                    <td>{items.email}</td>
                    <td>{items.contact}</td>
                    <td>
                      <Button
                        variant="warning"
                        onClick={() => (setUserId(items.id), openmodal())}
                      >
                        <FaEdit />
                      </Button>
                    </td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(items.id)}
                      >
                        <FaTrash />
                      </Button>
                    </td>
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

