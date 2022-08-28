using TodoApi.Models;

namespace TodoApi.Services 
{
    public interface ICategoryService 
    {
        public Task<List<Category>?> GetAllCategories();
        public Task<List<Category>?> GetCategoriesByTitle(string title);
        public Task DeleteCategory(string id);
        public Task<Category?> AddCategory(Category task);
        public Task<Category?> UpdateCategory(Category task);
    }
}