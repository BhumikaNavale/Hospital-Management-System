const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const corsOptions = require("./config/corsOptions");
const medicalRecordRoutes = require("./routes/medicalRecordRoutes");
const app = express();

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Home route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Hospital Management System API is running",
  });
});

// API routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/patients", require("./routes/patientRoutes"));
app.use("/api/doctors", require("./routes/doctorRoutes"));
app.use("/api/departments", require("./routes/departmentRoutes"));
app.use("/api/appointments", require("./routes/appointmentRoutes"));
app.use("/api/medical-records", require("./routes/medicalRecordRoutes"));
app.use("/api/prescriptions", require("./routes/prescriptionRoutes"));
app.use("/api/lab-tests", require("./routes/labTestRoutes"));
app.use("/api/medicines", require("./routes/medicineRoutes"));
app.use("/api/suppliers", require("./routes/supplierRoutes"));
app.use("/api/purchase-records", require("./routes/purchaseRecordRoutes"));
app.use("/api/bills", require("./routes/billRoutes"));
app.use("/api/payments", require("./routes/paymentRoutes"));
app.use("/api/notifications", require("./routes/notificationRoutes"));
app.use("/api/audit-logs", require("./routes/auditLogRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/medical-records", medicalRecordRoutes);
// Error handling
app.use(require("./middleware/notFoundMiddleware"));
app.use(require("./middleware/errorMiddleware"));

// Start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
};

startServer();