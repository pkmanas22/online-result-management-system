import mongoose from "mongoose";
import dbConnect from "../dbConnect";
import Admin from "../../models/admin";
import bcrypt from "bcrypt";

export const seedAdmins = async () => {
    try {
        // Connect to MongoDB
        await dbConnect();

        // Dummy data to seed
        const adminData = [
            {
                name: "Admin One",
                email: "admin1@example.com",
                password: "password123", // Plain password
                contactNumber: 1234567890,
            },
            {
                name: "Admin Two",
                email: "admin2@example.com",
                password: "password456", // Plain password
                contactNumber: 9876543210,
            },
        ];

        // Hash passwords before inserting
        const hashedAdmins = await Promise.all(
            adminData.map(async (admin) => ({
                ...admin,
                password: await bcrypt.hash(admin.password, 10), // Hash password with salt rounds = 10
            }))
        );

        // Clear existing data in the collection
        await Admin.deleteMany({});
        // console.log("Cleared existing admin data");

        await Admin.insertMany(hashedAdmins);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        // console.error("Error seeding admins:", error);
        mongoose.connection.close();
        process.exit(1);
    }
};

