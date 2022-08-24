using MongoDB.Driver;
using TodoApi.DAL.MongoClasses;
using TodoApi.Infrastructure;

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
    }
}