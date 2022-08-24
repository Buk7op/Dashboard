using TodoApi.DAL.MongoClasses;
using TodoApi.Models;

namespace TodoApi.DAL
{
    internal static class Converter 
    {
        public static MongoCategory Convert(this Category category)
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

        public static MongoPriority Convert(this Priority priority)
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

        public static MongoProblem Convert(this Problem problem)
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

        public static Category Convert(this MongoCategory category)
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

        public static Priority Convert(this MongoPriority priority)
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

        public static Problem Convert(this MongoProblem problem)
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
    }
}