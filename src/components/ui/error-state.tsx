import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CMSError } from "@/types/cms";

interface ErrorStateProps {
  error: CMSError;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState = ({ error, onRetry, className = "" }: ErrorStateProps) => {
  return (
    <div className={`flex flex-col items-center justify-center p-8 ${className}`}>
      <Alert variant="destructive" className="max-w-md">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error {error.status}</AlertTitle>
        <AlertDescription className="mt-2">
          {error.message}
          {error.details && (
            <details className="mt-2 text-sm">
              <summary className="cursor-pointer">More details</summary>
              <pre className="mt-1 text-xs overflow-auto">
                {JSON.stringify(error.details, null, 2)}
              </pre>
            </details>
          )}
        </AlertDescription>
      </Alert>
      
      {onRetry && (
        <Button 
          onClick={onRetry} 
          variant="outline" 
          className="mt-4"
          size="sm"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Try Again
        </Button>
      )}
    </div>
  );
};

interface NetworkErrorProps {
  onRetry?: () => void;
  className?: string;
}

export const NetworkError = ({ onRetry, className = "" }: NetworkErrorProps) => {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center ${className}`}>
      <div className="text-red-500 mb-4">
        <AlertCircle size={48} />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Connection Error
      </h3>
      <p className="text-gray-600 mb-4 max-w-md">
        Unable to connect to the server. Please check your internet connection or try again later.
      </p>
      
      {onRetry && (
        <Button onClick={onRetry} variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Retry
        </Button>
      )}
    </div>
  );
};

interface EmptyStateProps {
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export const EmptyState = ({ title, description, action, className = "" }: EmptyStateProps) => {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center ${className}`}>
      <div className="text-gray-400 mb-4">
        <AlertCircle size={48} />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      <p className="text-gray-600 mb-4 max-w-md">
        {description}
      </p>
      
      {action && (
        <Button onClick={action.onClick} variant="outline">
          {action.label}
        </Button>
      )}
    </div>
  );
};
