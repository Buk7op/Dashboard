using MongoDB.Bson;
using MongoDB.Driver;
using TodoApi.DAL.MongoClasses;
using TodoApi.Infrastructure;
using TodoApi.Models;

namespace TodoApi.DAL 
{
    public class DBAccessor 
    {
        private const string PROBLEMS_COLLECTION_NAME = "Tasks";
        private const string PRIORITY_COLLECTION_NAME = "Priorities";
        private const string CATEGORY_COLLECTION_NAME = "Categories";
        private readonly MongoClient _client;
        private readonly IMongoDatabase _db;
        private readonly IMongoCollection<MongoProblem> _problemsCollection;
        private readonly IMongoCollection<MongoPriority> _priorityCollection;
        private readonly IMongoCollection<MongoCategory> _categoryCollection;

        public DBAccessor(DbSettings dbSettings)
        {
            _client = new MongoClient(dbSettings.ConnectionString);
            _db = _client.GetDatabase("dashboardDb");
            _problemsCollection = _db.GetCollection<MongoProblem>(PROBLEMS_COLLECTION_NAME);
            _priorityCollection = _db.GetCollection<MongoPriority>(PRIORITY_COLLECTION_NAME);
            _categoryCollection = _db.GetCollection<MongoCategory>(CATEGORY_COLLECTION_NAME);
        }

        public async Task<List<Problem>?> GetAllTasks() 
        {
            var tasks = await _problemsCollection.FindAsync(new BsonDocument());
            return tasks.ToList().Convert();
        }

        public async Task<List<Category>?> GetAllCategory() 
        {
            var categories = await _categoryCollection.FindAsync(new BsonDocument());
            return categories.ToList().Convert();
        }

        public async Task<List<Priority>?> GetAllPriority() 
        {
            var priorities = await _priorityCollection.FindAsync(new BsonDocument());
            return priorities.ToList().Convert();
        }

        public async Task<Problem?> AddTask(Problem task)
        {
            var mongoTask = task.Convert();
            if(mongoTask != null) 
            {
                await _problemsCollection.InsertOneAsync(mongoTask);
                return mongoTask.Convert();
            }
            else
            {
                throw new FormatException("Task cannot be null");
            }
        }

        public async Task DeleteTaskById(string id)
        {
            var filter = Builders<MongoProblem>.Filter.Where(p => p.Id == id);
            await _problemsCollection.DeleteOneAsync(filter);
        }

        public async Task<Problem?> UpdateTask(Problem task)
        {
            var mongoTask = task.Convert();
            var filter = Builders<MongoProblem>.Filter.Where(p => p.Id == task.Id);
            if(mongoTask != null) 
            {
                var createdTask = await _problemsCollection.FindOneAndReplaceAsync(filter, mongoTask, new FindOneAndReplaceOptions<MongoProblem, MongoProblem> { IsUpsert = true, ReturnDocument = ReturnDocument.After});
                return createdTask.Convert();
            }
            else
            {
                throw new FormatException("Task cannot be null");
            }
        }

    }
}