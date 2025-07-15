import { NextResponse } from "next/server";
import axios, { AxiosError } from "axios";

type ApiResponse = {
  message?: string;
  data?: unknown;
  user?: string;
};

type ErrorResponse = {
  error: string;
  details?: string;
  statusCode?: number;
};

// Placeholder for dashboard data (aggregates multiple DocTypes)
export async function GET() {
  try {
    const response = await axios.get<ApiResponse>(
      `${process.env.ERP_API_URL}/api/method/frappe.desk.dashboard.get`,
      {
        headers: {
          Authorization: `token ${process.env.ERP_API_KEY}:${process.env.ERP_API_SECRET}`,
        },
      }
    );

    if (!response.data) {
      throw new Error("No dashboard data received from API");
    }

    return NextResponse.json(response.data);
  } catch (err) {
    let errorResponse: ErrorResponse = {
      error: "An unexpected error occurred",
    };

    if (axios.isAxiosError(err)) {
      const axiosError = err as AxiosError;
      errorResponse = {
        error: "API request failed",
        details: axiosError.message,
        statusCode: axiosError.response?.status || 500,
      };
    } else if (err instanceof Error) {
      errorResponse = {
        error: "Application error",
        details: err.message,
      };
    }

    return NextResponse.json(errorResponse, {
      status: errorResponse.statusCode || 500,
    });
  }
}

// Other CRUD operations not applicable for dashboard; use specific DocTypes instead
export async function POST() {
  return NextResponse.json({ error: "POST not supported for dashboard" }, { status: 405 });
}
export async function PUT() {
  return NextResponse.json({ error: "PUT not supported for dashboard" }, { status: 405 });
}
export async function DELETE() {
  return NextResponse.json({ error: "DELETE not supported for dashboard" }, { status: 405 });
}