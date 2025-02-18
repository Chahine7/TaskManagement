using System.Net;
using TaskManagementApi.Exceptions;

public class ExceptionHandlingMiddleware
{
    private readonly RequestDelegate _next;

    public ExceptionHandlingMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            await HandleExceptionAsync(context, ex);
        }
    }

    public async Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        var statusCode = exception switch
        {
            ResourceNotFoundException _ => HttpStatusCode.NotFound,
            RequestValidationException _ => HttpStatusCode.BadRequest,
            BadCredentialsException _ => HttpStatusCode.Unauthorized,
            DuplicateResourceException _ => HttpStatusCode.Conflict,
            InsufficientAuthenticationException _ => HttpStatusCode.Forbidden,
            _ => HttpStatusCode.InternalServerError
        };

        var apiError = new ApiError(
            context.Request.Path,
            exception.Message,
            (int)statusCode,
            DateTime.UtcNow
        );

        context.Response.ContentType = "application/json";
        context.Response.StatusCode = (int)statusCode;

        await context.Response.WriteAsJsonAsync(apiError);
    }
}
