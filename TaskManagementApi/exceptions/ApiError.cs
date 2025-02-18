public record ApiError(
    string Path,
    string Message,
    int StatusCode,
    DateTime Timestamp
);
