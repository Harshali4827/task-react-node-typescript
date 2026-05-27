import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import API from "../services/api";

import {
  encryptData,
  decryptData,
} from "../utils/crypto";

const StudentForm = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [student, setStudent] =
    useState({
      fullName: "",
      email: "",
      phoneNumber: "",
      dateOfBirth: "",
      gender: "",
      address: "",
      courseEnrolled: "",
      password: "",
    });

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setStudent({
      ...student,

      [e.target.name]:
        e.target.value,
    });
  };

  const fetchStudent = async () => {
    const response =
      await API.get("/students");

    const selectedStudent =
      response.data.find(
        (item: any) =>
          item._id === id
      );

    if (selectedStudent) {
      setStudent({
        fullName: decryptData(
          selectedStudent.fullName
        ),

        email: decryptData(
          selectedStudent.email
        ),

        phoneNumber:
          decryptData(
            selectedStudent.phoneNumber
          ),

        dateOfBirth:
          decryptData(
            selectedStudent.dateOfBirth
          ),

        gender: decryptData(
          selectedStudent.gender
        ),

        address: decryptData(
          selectedStudent.address
        ),

        courseEnrolled:
          decryptData(
            selectedStudent.courseEnrolled
          ),

        password: decryptData(
          selectedStudent.password
        ),
      });
    }
  };

  useEffect(() => {
    if (id) {
      fetchStudent();
    }
  }, [id]);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    const encryptedData = {
      fullName: encryptData(
        student.fullName
      ),

      email: encryptData(
        student.email
      ),

      phoneNumber:
        encryptData(
          student.phoneNumber
        ),

      dateOfBirth:
        encryptData(
          student.dateOfBirth
        ),

      gender: encryptData(
        student.gender
      ),

      address: encryptData(
        student.address
      ),

      courseEnrolled:
        encryptData(
          student.courseEnrolled
        ),

      password: encryptData(
        student.password
      ),
    };

    if (id) {
      await API.put(
        `/student/${id}`,
        encryptedData
      );

      alert(
        "Student Updated Successfully"
      );
    } else {
      await API.post(
        "/register",
        encryptedData
      );

      alert(
        "Student Registered Successfully"
      );
    }

    navigate("/students");
  };

  return (
    <div
      style={{
        width: "600px",
        margin: "30px auto",
        border:
          "1px solid #ccc",
        padding: "25px",
        borderRadius: "10px",
      }}
    >
      <h1>
        {id
          ? "Edit Student"
          : "Register Student"}
      </h1>

      <form onSubmit={handleSubmit}>
        <label>
          Full Name
        </label>

        <input
          type="text"
          name="fullName"
          value={student.fullName}
          onChange={handleChange}
          style={inputStyle}
        />

        <label>Email</label>

        <input
          type="email"
          name="email"
          value={student.email}
          onChange={handleChange}
          style={inputStyle}
        />

        <label>
          Phone Number
        </label>

        <input
          type="text"
          name="phoneNumber"
          value={
            student.phoneNumber
          }
          onChange={handleChange}
          style={inputStyle}
        />

        <label>
          Date Of Birth
        </label>

        <input
          type="date"
          name="dateOfBirth"
          value={
            student.dateOfBirth
          }
          onChange={handleChange}
          style={inputStyle}
        />

        <label>Gender</label>

        <select
          name="gender"
          value={student.gender}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="">
            Select Gender
          </option>

          <option value="Male">
            Male
          </option>

          <option value="Female">
            Female
          </option>
        </select>

        <label>Address</label>

        <textarea
          name="address"
          value={student.address}
          onChange={handleChange}
          style={inputStyle}
        />

        <label>
          Course Enrolled
        </label>

        <input
          type="text"
          name="courseEnrolled"
          value={
            student.courseEnrolled
          }
          onChange={handleChange}
          style={inputStyle}
        />

        <label>Password</label>

        <input
          type="password"
          name="password"
          value={student.password}
          onChange={handleChange}
          style={inputStyle}
        />

        <button
          type="submit"
          style={{
            padding:
              "10px 20px",
          }}
        >
          {id
            ? "Update Student"
            : "Register Student"}
        </button>
      </form>
    </div>
  );
};

const inputStyle = {
  width: "100%",

  padding: "10px",

  marginBottom: "15px",

  marginTop: "5px",
};

export default StudentForm;