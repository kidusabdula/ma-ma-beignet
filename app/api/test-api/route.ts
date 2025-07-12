import { NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';

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

export async function GET() {
  try {
    const response = await axios.get<ApiResponse>(
      `${process.env.ERP_API_URL}/api/method/frappe.auth.get_logged_user`,
      {
        headers: { 
          Authorization: `token ${process.env.ERP_API_KEY}:${process.env.ERP_API_SECRET}` 
        },
      }
    );

    if (!response.data) {
      throw new Error('No data received from API');
    }

    return NextResponse.json(response.data);
  } catch (err) {
    let errorResponse: ErrorResponse = {
      error: 'An unexpected error occurred',
    };

    if (axios.isAxiosError(err)) {
      const axiosError = err as AxiosError;
      errorResponse = {
        error: 'API request failed',
        details: axiosError.message,
        statusCode: axiosError.response?.status || 500,
      };
    } else if (err instanceof Error) {
      errorResponse = {
        error: 'Application error',
        details: err.message,
      };
    }

    return NextResponse.json(
      errorResponse,
      { status: errorResponse.statusCode || 500 }
    );
  }
}