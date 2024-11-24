import { Links, Meta, Scripts, isRouteErrorResponse, useRouteError } from "@remix-run/react";

export function ErrorBoundary() {
  const error = useRouteError();

  return (
    <html lang="en">
      <head>
        <title>Oops!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full px-6 py-12 bg-white shadow-xl rounded-lg">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {isRouteErrorResponse(error) ? (
                  <>
                    {error.status} {error.statusText}
                  </>
                ) : (
                  "Oops! Something went wrong"
                )}
              </h1>
              <p className="text-gray-600 mb-8">
                {isRouteErrorResponse(error)
                  ? error.status === 404
                    ? "The page you're looking for doesn't exist."
                    : "Sorry, something went wrong."
                  : error instanceof Error
                    ? error.message
                    : "An unexpected error occurred."}
              </p>
              <a
                href="/"
                className="inline-block px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-500 transition-colors"
              >
                Go back home
              </a>
            </div>
          </div>
        </div>
        <Scripts />
      </body>
    </html>
  );
}
