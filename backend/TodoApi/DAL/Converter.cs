using TodoApi.DAL.MongoClasses;
using TodoApi.Models;

namespace TodoApi.DAL
{
    public static class Converter 
    {
        public static MongoCategory? Convert(this Category category)
        {
            if(category == null)
            {
                return null;
            }
            return new MongoCategory
            {
                Id = category.Id,
                Title = category.Title
            };
        }

        public static MongoPriority? Convert(this Priority priority)
        {
            if(priority == null)
            {
                return null;
            }
            return new MongoPriority
            {
                Id = priority.Id,
                Title = priority.Title,
                Color = priority.Color
            };
        }

        public static MongoProblem? Convert(this Problem problem)
        {
            if(problem == null)
            {
                return null;
            }
            return new MongoProblem
            {
                Id = problem.Id,
                Title = problem.Title,
                Completed = problem.Completed,
                Priority = problem.Priority,
                Category = problem.Category,
                Date = problem.Date
            };
        }

        public static Category? Convert(this MongoCategory category)
        {
            if(category == null)
            {
                return null;
            }
            return new Category
            {
                Id = category.Id,
                Title = category.Title
            };
        }

        public static Priority? Convert(this MongoPriority priority)
        {
            if(priority == null)
            {
                return null;
            }
            return new Priority
            {
                Id = priority.Id,
                Title = priority.Title,
                Color = priority.Color
            };
        }

        public static Problem? Convert(this MongoProblem problem)
        {
            if(problem == null)
            {
                return null;
            }
            return new Problem
            {
                Id = problem.Id,
                Title = problem.Title,
                Completed = problem.Completed,
                Priority = problem.Priority,
                Category = problem.Category,
                Date = problem.Date
            };
        }

        public static List<Problem>? Convert(this List<MongoProblem>? problems)
        {
            if (problems == null)
            {
                return null;
            }
            var problemsList = new List<Problem>();
            foreach (var i in problems)
            {
                var converted = i.Convert();
                if (converted != null)
                {
                    problemsList.Add(converted);
                }
            }
            return problemsList;
        }

        public static List<Priority>? Convert(this List<MongoPriority>? priority)
        {
            if (priority == null)
            {
                return null;
            }
            var priorityList = new List<Priority>();
            foreach (var i in priority)
            {
                var converted = i.Convert();
                if (converted != null)
                {
                    priorityList.Add(converted);
                }
            }
            return priorityList;
        }

        public static List<Category>? Convert(this List<MongoCategory>? category)
        {
            if (category == null)
            {
                return null;
            }
            var categoryList = new List<Category>();
            foreach (var i in category)
            {
                var converted = i.Convert();
                if (converted != null)
                {
                    categoryList.Add(converted);
                }
            }
            return categoryList;
        }
    }
}