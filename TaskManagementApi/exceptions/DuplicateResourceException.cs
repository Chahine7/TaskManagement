    namespace TaskManagementApi.Exceptions
{
    public class DuplicateResourceException : Exception
    {
        public DuplicateResourceException(string message) : base(message) { }
    }
}