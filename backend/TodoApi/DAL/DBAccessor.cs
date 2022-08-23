using MongoDB.Driver;
using TodoApi.DAL.MongoClasses;

namespace TodoApi.DAL 
{
    public class DBAccessor 
    {
        private const string PROBLEMS_COLLECTION_NAME = "problemsCollection";
        private const string PRIORITY_COLLECTION_NAME = "priorityCollection";
        private const string CATEGORY_COLLECTION_NAME = "categoryCollection";
        private readonly MongoClient _client;
        private readonly IMongoDatabase _db;
        private readonly IMongoCollection<MongoProblem> _problemsCollection;
        private readonly IMongoCollection<MongoPriority> _priorityCollection;
        private readonly IMongoCollection<MongoCategory> _categoryCollection;

        public DBAccessor(string connectionString)
        {
            _client = new MongoClient(connectionString);
            _db = _client.GetDatabase("dashboardDb");
            _problemsCollection = _db.GetCollection<MongoProblem>(PROBLEMS_COLLECTION_NAME);
            _priorityCollection = _db.GetCollection<MongoPriority>(PRIORITY_COLLECTION_NAME);
            _categoryCollection = _db.GetCollection<MongoCategory>(CATEGORY_COLLECTION_NAME);
        }
    }
}