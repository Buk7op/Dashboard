using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TodoApi.DAL.MongoClasses 
{
    public class MongoCategory
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        [BsonElement("title")]
        public string? Title { get; set; }
    }
}