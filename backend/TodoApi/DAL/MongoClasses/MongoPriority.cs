using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TodoApi.DAL.MongoClasses 
{
    class MongoPriority 
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        [BsonElement("title")]
        public string? Title { get; set; }
        [BsonElement("color")]
        public string? Color { get; set; }
    }
}