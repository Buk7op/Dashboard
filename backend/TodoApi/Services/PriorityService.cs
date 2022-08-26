using Microsoft.Extensions.Options;
using TodoApi.DAL;
using TodoApi.Infrastructure;
using TodoApi.Models;

namespace TodoApi.Services
{
    public class PriorityService : IPriorityService
    {
        private readonly DBAccessor _dbAccessor;

        public PriorityService(IOptions<DbSettings> settings)
        {
            _dbAccessor = new DBAccessor(settings.Value);
        }
        
        public async Task<List<Priority>?> GetAllPriorities() => await _dbAccessor.GetAllPriorities();
    }
}