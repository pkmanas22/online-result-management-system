import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import department from "@/models/department";

// Handle GET and POST requests
export const GET = async () => {
  try {
    await dbConnect(); // Ensure the database is connected
    const departments = await department.find({}); // Fetch all departments
    return NextResponse.json({success : true, data : departments});

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({success : false, error : "Failed to fetch departments"});
  }
};

export const POST = async (req : NextRequest) => {
  try {
    await dbConnect(); // Ensure the database is connected
    const { department } = await req.json();

    // Validate input
    if (!department) {
      return NextResponse.json({msg : "department is required"});
    }

    // Check if the department already exists
    const existingDepartment = await department.findOne({ department });
    if (existingDepartment) {
      return NextResponse.json({msg : "Department already added"});
    }

    // Fetch all departments to calculate the department code
    const departments = await department.find({});
    const add = departments.length + 1;
    const departmentCode = add < 9 ? `0${add}` : `${add}`;

    // Create and save a new department
    const newDepartment = new department({
      department,
      departmentCode,
    });
    await newDepartment.save();

    return NextResponse.json({success : true, data : newDepartment});

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({success : false, error : "An error occurred while adding the department"});
  }
};
