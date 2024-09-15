const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../model/User");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const Employee = require("../model/Employee");

const router = express.Router();

// Register new user without taking f_sno as input
router.post(
  "/register",
  [
    body("f_userName").notEmpty().withMessage("Username is required"),
    body("f_Pwd")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 characters long"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { f_userName, f_Pwd } = req.body;

    try {
      const existingUser = await User.findOne({ f_userName });
      if (existingUser) {
        return res
          .status(400)
          .json({ success: false, message: "Username already exists" });
      }

      const hashedPwd = await bcrypt.hash(f_Pwd, 10);
      const newUser = new User({
        f_userName,
        f_Pwd: hashedPwd,
      });

      await newUser.save();
      res.json({
        success: true,
        message: "Admin registered successfully",
        user: newUser,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
);

// Login user
router.post(
  "/login",
  [
    body("f_userName").notEmpty().withMessage("Username is required"),
    body("f_Pwd").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { f_userName, f_Pwd } = req.body;

    try {
      const user = await User.findOne({ f_userName });
      if (!user) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid username or password" });
      }

      const isValidPassword = await bcrypt.compare(f_Pwd, user.f_Pwd);
      if (!isValidPassword) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid username or password" });
      }

      res.json({ success: true, message: "Login successful", user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
);

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Ensure this directory exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
  },
});

const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only .jpg and .png files are allowed!"));
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // Limit file size to 2MB
  fileFilter: fileFilter,
});

// POST API for form submission with validation

router.post(
  "/submit",
  upload.single("image"),
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email")
      .isEmail()
      .withMessage("Invalid email format")
      .custom(async (value) => {
        const existingEmployee = await Employee.findOne({ email: value });
        if (existingEmployee) {
          throw new Error("Email already exists");
        }
        return true;
      }),
    body("mobile").isNumeric().withMessage("Mobile number must be numeric"),
    body("designation")
      .isIn(["HR", "Manager", "Sales"])
      .withMessage("Invalid designation"),
    body("gender").isIn(["M", "F"]).withMessage("Invalid gender"),
    body("course")
      .isArray()
      .withMessage("At least one course must be selected"),
    body("course.*")
      .isIn(["MCA", "BCA", "BSC"])
      .withMessage("Invalid course selection"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    if (!req.file) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Image is required and must be jpg/png",
        });
    }

    const { name, email, mobile, designation, gender, course, date } = req.body;

    try {
      const newEmployee = new Employee({
        name,
        email,
        mobile,
        designation,
        gender,
        course,
        image: req.file.filename, // Store the file name of the uploaded image
        date: date || Date.now(), // Set current date if not provided
      });

      await newEmployee.save();

      res.status(201).json({
        success: true,
        message: "Employee created successfully",
        employee: newEmployee,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
);

// Fetch all employees

router.get("/getEmployees", async (req, res) => {
  try {
    const employees = await Employee.find(); // Fetch all employees from the database
    res.status(200).json({
      success: true,
      employees,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});
// show  the one employee
router.get("/getEmployee/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }
    res.status(200).json({ success: true, employee });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});
// edit the employee
router.put("/editEmployee/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, mobile, designation, gender, course, image } = req.body;

  try {
    // Find the employee by ID and update with new data
    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      {
        name,
        email,
        mobile,
        designation,
        gender,
        course,
        image,
      },
      { new: true } // Return the updated document
    );

    if (!updatedEmployee) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }

    res.status(200).json({
      success: true,
      message: "Employee updated successfully",
      employee: updatedEmployee,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.delete("/deleteEmployee/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Find the employee by ID and delete it
    const deletedEmployee = await Employee.findByIdAndDelete(id);

    if (!deletedEmployee) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }

    res.status(200).json({
      success: true,
      message: "Employee deleted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
