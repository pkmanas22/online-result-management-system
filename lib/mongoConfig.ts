import Admin from "@/models/admin";
import dbConnect from "./dbConnect";
import Student from "@/models/student";
import Faculty from "@/models/faculty";

export const fetchUserDetails = async (email: string, role: string) => {
    try {
        await dbConnect();

        let db: typeof Admin | typeof Student | typeof Faculty | undefined;
        if (role === "admin") db = Admin;
        else if (role === "student") db = Student;
        else if (role === "faculty") db = Faculty;
        if (!db) {
            // console.error("Invalid role");
            return null; // Return null for invalid role
        }
        const user = await db.findOne({ email });

        if (!user) {
            // console.error("Invalid credentials");
            return null; // Return null for invalid credentials
        }  
        
        return user;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        // console.error(error);
        return null; // Return null for any other error
    }
}
