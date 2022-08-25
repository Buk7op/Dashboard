using Microsoft.Extensions.Options;
using TodoApi.DAL;
using TodoApi.Infrastructure;
using TodoApi.Models;

namespace TodoApi.Services
{
    public class TaskService : ITaskService
    {
        private readonly DBAccessor _dbAccessor;

        public TaskService(IOptions<DbSettings> settings)
        {
            _dbAccessor = new DBAccessor(settings.Value);
        }
        public async Task<Problem?> AddTask(Problem task) => await _dbAccessor.AddTask(task);
        
        public async Task DeleteTask(string id) => await _dbAccessor.DeleteTaskById(id);

        public async Task<List<Problem>?> GetAllTask() => await _dbAccessor.GetAllTasks();
        
        public async Task<Problem> GetTaskById(string id) => await _dbAccessor.GetTaskById(id);
        
        public async Task<Problem?> UpdateTask(Problem task) => await _dbAccessor.UpdateTask(task);
        
    }
}