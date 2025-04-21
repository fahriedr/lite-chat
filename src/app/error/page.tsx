"use client";

import React from "react";
import Link from "next/link";
import { XCircle, Home } from "lucide-react";

const ErrorPage =  ({
  reset,
}: {
  reset: () => void;
}) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-main-color px-4 py-8">
      <div className="max-w-md w-full bg-white shadow-xl rounded-xl p-8 text-center">
        <XCircle className="mx-auto mb-6 text-red-500" size={80} strokeWidth={1.5} />

        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Oops! Something went wrong
        </h1>

        <p className="text-gray-600 mb-6">We encountered an unexpected error</p>

        <div className="flex justify-center space-x-4">
          <button
            onClick={reset}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300"
          >
            Try Again
          </button>

          <Link
            href="/home"
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300"
          >
            <Home size={18} />
            Back to Home
          </Link>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>If the problem persists, please contact our support team.</p>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-400 text-sm">
          © {new Date().getFullYear()} Lite Chat. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default ErrorPage