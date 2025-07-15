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
      `${process.env.ERP_API_URL}/api/resource/Web Page`,
      {
        headers: {
          Authorization: `token ${process.env.ERP_API_KEY}:${process.env.ERP_API_SECRET}`,
        },
        params: { fields: '["name","title","published"]' },
      }
    );

    if (!response.data) {
      throw new Error("No web pages received from API");
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


  }  export async function POST(request: Request) {
    try {
      const data = await request.json();
      if (!data.title) {
        throw new Error("Missing required field: title");
      }
      const response = await axios.post(
        `${process.env.ERP_API_URL}/api/resource/Web Page`,
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
      if (!name) throw new Error("Web Page name required");
      const data = await request.json();
      const response = await axios.put(
        `${process.env.ERP_API_URL}/api/resource/Web Page/${name}`,
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
      if (!name) throw new Error("Web Page name required");
      const response = await axios.delete(
        `${process.env.ERP_API_URL}/api/resource/Web Page/${name}`,
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