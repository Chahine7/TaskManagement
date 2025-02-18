namespace TaskManagementApi.Exceptions
{
    public class InsufficientAuthenticationException : Exception
    {
        public InsufficientAuthenticationException(string message) : base(message) { }
    }
}