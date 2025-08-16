import mongoose from "mongoose";
import config from "../config.js";
import Employee from "../models/Employee.js";
import User from "../models/User.js";

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

// Update employee and user IDs to match civil IDs
const updateEmployeeUserIds = async () => {
  try {
    console.log("🔄 Starting employee and user ID update process...");

    // Get all employees
    const employees = await Employee.find({});
    console.log(`📊 Found ${employees.length} employees`);

    // Get all users
    const users = await User.find({});
    console.log(`👥 Found ${users.length} users`);

    let updatedEmployees = 0;
    let updatedUsers = 0;
    let createdUsers = 0;

    // Process each employee
    for (const employee of employees) {
      const civilId = employee.الرقم_المدني;
      
      if (!civilId) {
        console.log(`⚠️  Employee ${employee.الاسم} has no civil ID, skipping...`);
        continue;
      }

      // Check if there's already a user with this civil ID
      let existingUser = await User.findById(civilId);
      
      if (!existingUser) {
        // Create a new user account for this employee
        const newUser = new User({
          _id: civilId,
          email: `${civilId}@company.com`, // Default email based on civil ID
          password: "123456", // Default password
          role: "Employee",
          isActive: true,
          createdAt: employee.createdAt || new Date(),
          updatedAt: new Date()
        });

        await newUser.save();
        createdUsers++;
        console.log(`✅ Created user account for employee: ${employee.الاسم} (Civil ID: ${civilId})`);
      } else {
        // Update existing user to ensure it has the correct civil ID
        if (existingUser._id.toString() !== civilId) {
          existingUser._id = civilId;
          await existingUser.save();
          updatedUsers++;
          console.log(`🔄 Updated user ID for employee: ${employee.الاسم} (Civil ID: ${civilId})`);
        }
      }

      // Update employee to ensure civil ID is properly set
      if (employee.الرقم_المدني !== civilId) {
        employee.الرقم_المدني = civilId;
        await employee.save();
        updatedEmployees++;
        console.log(`🔄 Updated employee civil ID: ${employee.الاسم} (Civil ID: ${civilId})`);
      }
    }

    // Process users that might not have corresponding employees
    for (const user of users) {
      const civilId = user._id.toString();
      
      // Check if there's an employee with this civil ID
      const correspondingEmployee = await Employee.findOne({ الرقم_المدني: civilId });
      
      if (!correspondingEmployee) {
        console.log(`⚠️  User with ID ${civilId} has no corresponding employee`);
      }
    }

    console.log("\n📈 Update Summary:");
    console.log(`- Employees processed: ${employees.length}`);
    console.log(`- Employees updated: ${updatedEmployees}`);
    console.log(`- Users processed: ${users.length}`);
    console.log(`- Users updated: ${updatedUsers}`);
    console.log(`- New users created: ${createdUsers}`);

    console.log("\n✅ Employee and user ID update process completed successfully!");

  } catch (error) {
    console.error("❌ Error updating employee and user IDs:", error);
  }
};

// Run the migration
const runMigration = async () => {
  try {
    await connectDB();
    await updateEmployeeUserIds();
    
    console.log("\n🎉 Migration completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  }
};

// Run if this file is executed directly
const isMainModule = import.meta.url.endsWith(process.argv[1].replace(/\\/g, '/'));

if (isMainModule) {
  runMigration();
}

export default updateEmployeeUserIds;
