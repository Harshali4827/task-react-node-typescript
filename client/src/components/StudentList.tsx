import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import API from "../services/api";

import { decryptData } from "../utils/crypto";
import './StudentList.css';
import Swal from "sweetalert2";
import { toast } from "react-toastify";
const StudentList = () => {
  const navigate = useNavigate();

  const [students, setStudents] =
    useState<any[]>([]);

  const fetchStudents = async () => {
    const response =
      await API.get("/students");

    const decryptedStudents =
      response.data.map(
        (student: any) => ({
          ...student,

          fullName: decryptData(
            student.fullName
          ),

          email: decryptData(
            student.email
          ),

          phoneNumber:
            decryptData(
              student.phoneNumber
            ),

          dateOfBirth:
            decryptData(
              student.dateOfBirth
            ),

          gender: decryptData(
            student.gender
          ),

          address: decryptData(
            student.address
          ),

          courseEnrolled:
            decryptData(
              student.courseEnrolled
            ),
        })
      );

    setStudents(decryptedStudents);
  };
  
  const handleDelete = async (
  id: string
) => {
  const result = await Swal.fire({
    title: "Delete Student?",
    text: "This action cannot be undone.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, Delete",
    cancelButtonText: "Cancel",
    reverseButtons: true,
  });

  if (!result.isConfirmed) {
    return;
  }

  try {
    await API.delete(
      `/student/${id}`
    );

    toast.success(
      "Student deleted successfully"
    );

    fetchStudents();
  } catch (error) {
    toast.error(
      "Failed to delete student"
    );
  }
};
  useEffect(() => {
    fetchStudents();
  }, []);

  return (
  
<div className="list-page">

  <div className="list-container">

    <div className="list-header">

      <div>
        <h1 className="page-title">
          Student Management
        </h1>
      </div>

      <button
        className="add-btn"
        onClick={() =>
          navigate("/register")
        }
      >
        + Add Student
      </button>

    </div>

    <div className="table-wrapper">

      <table className="student-table">

        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>DOB</th>
            <th>Gender</th>
            <th>Address</th>
            <th>Course</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr key={student._id}>

              <td>{student.fullName}</td>

              <td>{student.email}</td>

              <td>{student.phoneNumber}</td>

              <td>{student.dateOfBirth}</td>

              <td>
                <span
                  className={
                    student.gender === "Male"
                      ? "gender male"
                      : "gender female"
                  }
                >
                  {student.gender}
                </span>
              </td>

              <td>{student.address}</td>

              <td>
                {student.courseEnrolled}
              </td>

              <td>
                <div className="action-buttons">

                  <button
                    className="edit-btn"
                    onClick={() =>
                      navigate(
                        `/edit/${student._id}`
                      )
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      handleDelete(
                        student._id
                      )
                    }
                  >
                    Delete
                  </button>

                </div>
              </td>

            </tr>
          ))}
        </tbody>

      </table>

    </div>

  </div>

</div>
  );
};

export default StudentList;