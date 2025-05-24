interface ErrorAlertProps {
    error: string;
}

const ErrorAlert = ({ error }: ErrorAlertProps) => {
    return (
        <div className="alert alert-danger mt-1 py-2">{error}</div>
    )
}

export default ErrorAlert;