import { Observable, of } from "rxjs";
import { Category } from "src/app/model/Category";
import { TestData } from "../../TestData";
import { CategoryDAO } from "../interface/CategoryDAO";

export class CategoryDAOArray implements CategoryDAO {

    search(title: string): Observable<Category[]> {
        let allCategories = TestData.categories;
        if (title != null) {
            allCategories = allCategories.filter(cat => cat.title.toUpperCase().includes(title.toUpperCase()));
        }
        return of(allCategories);
    }
    get(id: number): Observable<Category> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Observable<Category> {
        TestData.tasks.forEach(task => {
            if (task.category && task.category.id === id) {
                task.category = null!;
            }
        })
        const category = TestData.categories.find(c => c.id === id);
        if (category) {
            TestData.categories.splice(TestData.categories.indexOf(category), 1)
            return of(category)
        }
        throw new Error("Category not found");
    }

    add(entity: Category): Observable<Category> {
        if(entity.id === null || entity.id === 0){
            entity.id = this.getLastIdCategory();
        }
        TestData.categories.push(entity);
        return of(entity);
    }

    getLastIdCategory(): number {
        return Math.max.apply(Math, TestData.tasks.map(task => task.id)) + 1
    }

    update(entity: Category): Observable<Category> {
        const category = TestData.categories.find(c => c.id === entity.id);
        if (category) {
            TestData.categories.splice(TestData.categories.indexOf(category), 1, entity)
            return of(category)
        }
        throw new Error("Category not found");
    }
    getAll(): Observable<Category[]> {
        return of(TestData.categories);
    }

}