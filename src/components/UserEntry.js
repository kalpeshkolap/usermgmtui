import React from "react";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Button, Modal } from "react-bootstrap";
import TextError from "./TextError";
import { useAddUserMutation, useGetUserByIdQuery, useUpdateUserMutation } from "../services/api";
import {toast} from 'react-toastify'
function UserEntry({ show, onClose ,id}) {
    const[addUser]=useAddUserMutation()
    const {data:UserById}=useGetUserByIdQuery(id)
    const[updateUser]=useUpdateUserMutation()
    const edit = id ? true:false;
  const initialValues = edit
  ?{
    id:id,
    name: UserById?.name,
    email: UserById?.email,
    contact: UserById?.contact
  }
 :{
    name: "",
    email: "",
    contact: "",
  };

  const onSubmit = (values,onSubmitProps) => {
    console.log("values", values);
    onSubmitProps.resetForm()
    if(edit)
    {
      updateUser(values)
      toast.success("User Updated Successfully")
      onClose()
    }
    else{
      addUser(values)
      toast.success("User Added Successfully...")
      onClose()
    }
   
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    contact: Yup.string()
    .matches(
      /^[0-9]{10}$/,
      "Phone number must be 10 digits and contain only numbers"
    )
    .required("Phone number is required"),
  });

  
  
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize={true}
    >
      {(formikProps) => (
        <Modal show={show} onHide={onClose} centered size="lg">
          <Modal.Header closeButton className="bg-primary text-white">
            <Modal.Title>{edit?"Edit User Details":"Create User Details"}</Modal.Title>
          </Modal.Header>
          <Form>
            <Modal.Body>
              <div className="form-group mb-3">
                <label htmlFor="name">Name</label>
                <Field
                  type="text"
                  className="form-control"
                  name="name"
                  id="name"
                  placeholder="Enter Your Name"
                />
                <ErrorMessage name="name" component={TextError} />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="email">Email</label>
                <Field
                  type="email"
                  className="form-control"
                  name="email"
                  id="email"
                  placeholder="Enter Your Email-Id"
                />
                <ErrorMessage name="email" component={TextError} />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="contact">Contact</label>
                <Field
                  type="text"
                  className="form-control"
                  name="contact"
                  id="contact"
                  placeholder="Enter Your Phone Number"
                />
                <ErrorMessage name="contact" component={TextError} />
              </div>
            </Modal.Body>
            <Modal.Footer>
              {
                edit?(
                 <Button variant="warning" type="submit">
                    Update
                 </Button>
                ):
                (
                  <Button variant="primary"  type="submit">
                  Submit
                </Button>
                )
              }
             
            </Modal.Footer>
          </Form>
        </Modal>
      )}
    </Formik>
  );
}

export default UserEntry;
