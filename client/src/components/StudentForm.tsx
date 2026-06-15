import {
  useEffect,
  useState,
} from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";
import API from "../services/api";
import "../styles/common.css";
import {
  encryptData,
  decryptData,
} from "../utils/crypto";
import { toast } from "react-toastify";
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
  
  if (!student.fullName.trim()) {
  toast.error("Full Name is required");
  return;
}

if (!student.email.trim()) {
  toast.error("Email is required");
  return;
}

const emailRegex =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (
  !emailRegex.test(student.email)
) {
  toast.error(
    "Please enter a valid email address"
  );
  return;
}

if (!student.phoneNumber.trim()) {
  toast.error(
    "Mobile Number is required"
  );
  return;
}

const phoneRegex = /^[0-9]{10}$/;

if (
  !phoneRegex.test(
    student.phoneNumber
  )
) {
  toast.error(
    "Mobile Number must be exactly 10 digits"
  );
  return;
}

if (!student.dateOfBirth) {
  toast.error(
    "Date of Birth is required"
  );
  return;
}

if (!student.gender) {
  toast.error(
    "Please select Gender"
  );
  return;
}

if (!student.courseEnrolled.trim()) {
  toast.error(
    "Course is required"
  );
  return;
}

if (!student.address.trim()) {
  toast.error(
    "Address is required"
  );
  return;
}

if (!student.password.trim()) {
  toast.error(
    "Password is required"
  );
  return;
}

if (student.password.length < 6) {
  toast.error(
    "Password must be at least 6 characters"
  );
  return;
}

  const encryptedData = {
    fullName: encryptData(
      student.fullName
    ),
    email: encryptData(
      student.email
    ),
    phoneNumber: encryptData(
      student.phoneNumber
    ),
    dateOfBirth: encryptData(
      student.dateOfBirth
    ),
    gender: encryptData(
      student.gender
    ),
    address: encryptData(
      student.address
    ),
    courseEnrolled: encryptData(
      student.courseEnrolled
    ),
    password: encryptData(
      student.password
    ),
  };

  try {
    if (id) {
      await API.put(
        `/student/${id}`,
        encryptedData
      );

      toast.success(
        "Student Updated Successfully"
      );
    } else {
      await API.post(
        "/register",
        encryptedData
      );

      toast.success(
        "Student Registered Successfully"
      );
    }

    setTimeout(() => {
      navigate("/students");
    }, 1000);
  } catch (error: any) {
    toast.error(
      error?.response?.data
        ?.message ||
        "Something went wrong"
    );
  }
};
  return (
    <div className="page-container">
  <div
    className="card"
    style={{ maxWidth: "1000px" }}
  >

        <div className="form-header">
   <h1>
    {id
      ? " Update Student"
      : " Register Student"}
  </h1>

</div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">

            <div className="form-group">
              <label>Full Name</label>

              <input
                type="text"
                name="fullName"
                value={student.fullName}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter Full Name"
              />
            </div>

            <div className="form-group">
              <label>Email</label>

              <input
                type="email"
                name="email"
                value={student.email}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter Email"
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>

              <input
                type="text"
                name="phoneNumber"
                value={student.phoneNumber}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter Phone Number"
              />
            </div>

            <div className="form-group">
              <label>Date Of Birth</label>

              <input
                type="date"
                name="dateOfBirth"
                value={student.dateOfBirth}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>Gender</label>

              <select
                name="gender"
                value={student.gender}
                onChange={handleChange}
                className="form-control"
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

                <option value="Other">
                  Other
                </option>
              </select>
            </div>

            <div className="form-group">
              <label>Course</label>

              <input
                type="text"
                name="courseEnrolled"
                value={
                  student.courseEnrolled
                }
                onChange={handleChange}
                className="form-control"
                placeholder="Enter Course"
              />
            </div>

            <div className="form-group full-width">
              <label>Address</label>

              <textarea
                name="address"
                value={student.address}
                onChange={handleChange}
                className="form-control textarea"
                placeholder="Enter Address"
              />
            </div>

            <div className="form-group full-width">
              <label>Password</label>

              <input
                type="password"
                name="password"
                value={student.password}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter Password"
              />
            </div>

          </div>

       <button
  type="submit"
  className="primary-btn"
>
  {id
    ? "Update Student"
    : "Register Student"}
</button>
        </form>
      </div>
    </div>
  );
};


export default StudentForm;
