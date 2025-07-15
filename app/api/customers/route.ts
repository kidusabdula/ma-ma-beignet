import { NextResponse } from "next/server";
import axios, { AxiosError } from "axios";

type ApiResponse = {
  data?: unknown;
};

type ErrorResponse = {
  error: string;
  details?: string;
  statusCode?: number;
};

export async function GET() {
  try {
    const response = await axios.get<ApiResponse>(
      `${process.env.ERP_API_URL}/api/resource/Customer`,
      {
        headers: {
          Authorization: `token ${process.env.ERP_API_KEY}:${process.env.ERP_API_SECRET}`,
        },
        params: { fields: '["name","customer_name","status"]' },
      }
    );

    if (!response.data) {
      throw new Error("No customers received from API");
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
    export async function POST(request: Request) {
    try {
      const data = await request.json();
      if (!data.customer_name || !data.customer_type) {
        throw new Error("Missing required fields: customer_name or customer_type");
      }
      const response = await axios.post(
        `${process.env.ERP_API_URL}/api/resource/Customer`,
        data,
        {
          headers: {
            Authorization: `token ${process.env.ERP_API_KEY}:${process.env.ERP_API_SECRET}`,
          },
        }
      );
      return NextResponse.json(response.data, { status: 201 });
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

  export async function PUT(request: Request) {
    try {
      const { searchParams } = new URL(request.url);
      const name = searchParams.get('name');
      if (!name) throw new Error("Customer name required");
      const data = await request.json();
      const response = await axios.put(
        `${process.env.ERP_API_URL}/api/resource/Customer/${name}`,
        data,
        {
          headers: {
            Authorization: `token ${process.env.ERP_API_KEY}:${process.env.ERP_API_SECRET}`,
          },
        }
      );
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

  export async function DELETE(request: Request) {
    try {
      const { searchParams } = new URL(request.url);
      const name = searchParams.get('name');
      if (!name) throw new Error("Customer name required");
      const response = await axios.delete(
        `${process.env.ERP_API_URL}/api/resource/Customer/${name}`,
        {
          headers: {
            Authorization: `token ${process.env.ERP_API_KEY}:${process.env.ERP_API_SECRET}`,
          },
        }
      );
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
    }}