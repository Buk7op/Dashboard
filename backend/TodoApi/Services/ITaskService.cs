using TodoApi.Models;

namespace TodoApi.Services 
{
    public interface ITaskService 
    {
        public Task<List<Problem>?> GetAllTask();
        public Task<Problem> GetTaskById(string id);
        public Task DeleteTask(string id);
        public Task<Problem?> AddTask(Problem task);
        public Task<Problem?> UpdateTask(Problem task);
    }
}