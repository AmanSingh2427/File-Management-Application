const multer = require("multer");
const xlsx = require("xlsx");
const path = require("path");
const fs = require("fs");
const ExcelData = require("../models/ExcelData"); // Import the model

const upload = multer({ dest: "uploads/" });

const handleFileUpload = async (req, res) => {
  const file = req.file;
  const uploadUsersId = req.body.upload_users_id;

  console.log("Received user ID:", uploadUsersId); // Debugging line

  if (!file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  try {
    // Check file extension to determine if it is Excel, CSV, or text file
    const fileExtension = path.extname(file.originalname).toLowerCase();

    let data = [];
    if (fileExtension === ".txt" || fileExtension === ".csv") {
      // Handle text or CSV files
      const fileContent = fs.readFileSync(file.path, "utf-8");
      const lines = fileContent.split("\n").filter(line => line.trim() !== "");

      if (lines.length === 0) {
        fs.unlinkSync(file.path);
        return res.status(400).json({ message: "The file is empty" });
      }

      // Check if header is present and valid
      const headerLine = lines[0].split(",").map(column => column.trim());
      const requiredColumns = ["name", "email", "contact_no", "gender", "address"];
      const missingColumns = requiredColumns.filter(col => !headerLine.includes(col));

      if (missingColumns.length > 0) {
        fs.unlinkSync(file.path);
        return res.status(400).json({ message: `Missing columns: ${missingColumns.join(", ")}` });
      }

      // Remove the header line
      lines.shift();

      // Check if there is any data after the header
      if (lines.length === 0) {
        fs.unlinkSync(file.path);
        return res.status(400).json({ message: "No data found in the file after the header" });
      }

      lines.forEach(line => {
        const [name, email, contact_no, gender, address] = line.split(",");

        data.push({
          name: name ? name.trim() : null,
          email: email ? email.trim() : null,
          contact_no: contact_no ? contact_no.trim() : null,
          gender: gender ? gender.trim() : null,
          address: address ? address.trim() : null,
        });
      });
    } else if (fileExtension === ".xlsx" || fileExtension === ".xls") {
      // Handle Excel files
      const workbook = xlsx.readFile(file.path);
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      data = xlsx.utils.sheet_to_json(sheet);

      if (data.length === 0) {
        fs.unlinkSync(file.path);
        return res.status(400).json({ message: "The file is empty" });
      }

      // Check if all required columns are present in the Excel file
      const headerLine = Object.keys(data[0]);
      const requiredColumns = ["name", "email", "contact_no", "gender", "address"];
      const missingColumns = requiredColumns.filter(col => !headerLine.includes(col));

      if (missingColumns.includes("email") || missingColumns.includes("contact_no")) {
        fs.unlinkSync(file.path);
        return res.status(400).json({ message: `Missing columns: ${missingColumns.join(", ")}` });
      }
    } else {
      fs.unlinkSync(file.path);
      return res.status(400).json({ message: "Invalid file type. Only .txt, .csv, .xlsx, or .xls are allowed" });
    }

    // Validate the data in each row
    for (const row of data) {
      // Ensure the email and contact_no fields are treated as strings
      const email = row.email ? String(row.email).trim() : null;
      const contact_no = row.contact_no ? String(row.contact_no).trim() : null;

      if (!email) {
        fs.unlinkSync(file.path);
        return res.status(400).json({ message: "Please enter email for all rows." });
      }

      // Check if the email already exists in the database
      const existingRecord = await ExcelData.findOne({
        where: { email: email },
      });
      if (existingRecord) {
        fs.unlinkSync(file.path);
        return res.status(400).json({
          message: `The email ${email} already exists in the database.`,
        });
      }

      if (!contact_no) {
        fs.unlinkSync(file.path);
        return res.status(400).json({ message: "Please enter contact_no for all rows." });
      }
    }

    // Insert data into PostgreSQL after all validations pass
    for (const row of data) {
      const name = row.name ? String(row.name).trim() : null;
      const gender = row.gender ? String(row.gender).trim() : null;
      const address = row.address ? String(row.address).trim() : null;
      const email = String(row.email).trim();
      const contact_no = String(row.contact_no).trim();

      await ExcelData.create({
        name: name,
        email: email,
        contact_no: contact_no,
        gender: gender,
        address: address,
        upload_users_id: uploadUsersId,
      });
    }

    // Clean up uploaded file
    fs.unlinkSync(file.path);

    res.json({ message: "File data successfully uploaded" });
  } catch (error) {
    console.error("Error processing file:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { upload, handleFileUpload };
