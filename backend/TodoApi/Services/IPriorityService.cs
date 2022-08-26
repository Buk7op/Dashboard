using TodoApi.Models;

namespace TodoApi.Services 
{
    public interface IPriorityService 
    {
        public Task<List<Priority>?> GetAllPriorities();
    }
}