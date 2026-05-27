import { Request, Response } from "express";
import Student from "../models/Student";
import {
  backendEncrypt,
  backendDecrypt,
  frontendDecrypt
} from "../utils/crypto";



// CREATE STUDENT
export const registerStudent = async (
  req: Request,
  res: Response
) => {
  try {
    const student = new Student({
      fullName: backendEncrypt(req.body.fullName),
      email: backendEncrypt(req.body.email),
      phoneNumber: backendEncrypt(req.body.phoneNumber),
      dateOfBirth: backendEncrypt(req.body.dateOfBirth),
      gender: backendEncrypt(req.body.gender),
      address: backendEncrypt(req.body.address),
      courseEnrolled: backendEncrypt(req.body.courseEnrolled),
      password: backendEncrypt(req.body.password),
    });

    await student.save();

    res.status(201).json({
      success: true,
      message: "Student Registered Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// LOGIN STUDENT
export const loginStudent = async (
  req: Request,
  res: Response
) => {
  try {
    const { email, password } =
      req.body;

    const students =
      await Student.find();

    const validStudent =
      students.find(
        (student: any) => {

          const backendEmail =
            backendDecrypt(
              student.email
            );

          const backendPassword =
            backendDecrypt(
              student.password
            );
          const originalEmail =
            frontendDecrypt(
              backendEmail
            );

          const originalPassword =
            frontendDecrypt(
              backendPassword
            );

          return (
            originalEmail ===
              email &&
            originalPassword ===
              password
          );
        }
      );

    if (!validStudent) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid Credentials",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Login Successful",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Login Failed",
    });
  }
};

// GET STUDENTS
export const getStudents = async (
  req: Request,
  res: Response
) => {
  try {
    const students = await Student.find();

    const decryptedStudents = students.map((student: any) => ({
      _id: student._id,

      fullName: backendDecrypt(student.fullName),

      email: backendDecrypt(student.email),

      phoneNumber: backendDecrypt(student.phoneNumber),

      dateOfBirth: backendDecrypt(student.dateOfBirth),

      gender: backendDecrypt(student.gender),

      address: backendDecrypt(student.address),

      courseEnrolled: backendDecrypt(student.courseEnrolled),

      password: backendDecrypt(student.password),
    }));

    res.status(200).json(decryptedStudents);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};



// UPDATE STUDENT
export const updateStudent = async (
  req: Request,
  res: Response
) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      {
        fullName: backendEncrypt(req.body.fullName),
        email: backendEncrypt(req.body.email),
        phoneNumber: backendEncrypt(req.body.phoneNumber),
        dateOfBirth: backendEncrypt(req.body.dateOfBirth),
        gender: backendEncrypt(req.body.gender),
        address: backendEncrypt(req.body.address),
        courseEnrolled: backendEncrypt(req.body.courseEnrolled),
        password: backendEncrypt(req.body.password),
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      updatedStudent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Update Failed",
    });
  }
};



// DELETE STUDENT
export const deleteStudent = async (
  req: Request,
  res: Response
) => {
  try {
    await Student.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Student Deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Delete Failed",
    });
  }
};