using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using TodoApi.Models;

namespace TodoApi.DAL.MongoClasses 
{
    public class MongoProblem 
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        [BsonElement("title")]
        public string? Title { get; set; }
        [BsonElement("completed")]
        public bool Completed { get; set; }
        [BsonElement("priority")]
        public Priority? Priority { get; set; }
        [BsonElement("category")]
        public Category? Category { get; set; }
        [BsonElement("date")]
        public DateTime Date { get; set; }
    }
}