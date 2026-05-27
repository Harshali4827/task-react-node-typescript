import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import API from "../services/api";

import { decryptData } from "../utils/crypto";

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
    await API.delete(
      `/student/${id}`
    );

    fetchStudents();
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div
      style={{
        width: "95%",
        margin: "20px auto",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          marginBottom: "20px",
        }}
      >
        <h1>Student List</h1>

       <button
  onClick={() =>
    navigate("/register")
  }
  style={{
    padding: "8px 16px",
    height: "40px",
    backgroundColor: "#1976d2",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
  }}
>
  Register Student
</button>
      </div>

      <table
        border={1}
        cellPadding={10}
        width="100%"
      >
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
              <td>
                {student.fullName}
              </td>

              <td>
                {student.email}
              </td>

              <td>
                {
                  student.phoneNumber
                }
              </td>

              <td>
                {
                  student.dateOfBirth
                }
              </td>

              <td>
                {student.gender}
              </td>

              <td>
                {student.address}
              </td>

              <td>
                {
                  student.courseEnrolled
                }
              </td>

              <td>
                <button
                  onClick={() =>
                    navigate(
                      `/edit/${student._id}`
                    )
                  }
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    handleDelete(
                      student._id
                    )
                  }
                  style={{
                    marginLeft:
                      "10px",
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;