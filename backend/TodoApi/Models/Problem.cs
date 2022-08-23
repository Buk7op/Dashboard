namespace TodoApi.Models 
{
    class Problem
    {
        public string? Id { get; set; }
        public string? Title { get; set; }
        public bool Completed { get; set; }
        public Priority? Priority { get; set; }
        public Category? Category { get; set; }
        public DateTime Date { get; set; }
    }
}