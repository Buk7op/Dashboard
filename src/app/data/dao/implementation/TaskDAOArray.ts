import { Observable, of, scheduled } from "rxjs";
import { Category } from "src/app/model/Category";
import { Priority } from "src/app/model/Priority";
import { Task } from "src/app/model/Task";
import { TestData } from "../../TestData";
import { TaskDAO } from "../interface/TaskDAO";

export class TaskDAOArray implements TaskDAO {

    search(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]> {
        return of(this.searchTask(category, searchText, status, priority));
    }
    searchTask(category: Category, searchText: string, status: boolean, priority: Priority): Task[] {
        let allTasks = TestData.tasks;

        if (status != null) {
            allTasks = allTasks.filter(todo => todo.completed === status);
        }

        if (category != null) {
            allTasks = allTasks.filter(todo => todo.category === category);
        }

        if (priority != null) {
            allTasks = allTasks.filter(todo => todo.priority === priority);
        }

        if (searchText != null) {
            allTasks = allTasks.filter(todo => todo.title.toUpperCase().includes(searchText.toUpperCase()));
        }
        return allTasks;
    }

    getCompletedCountInCategory(category: Category): Observable<number> {
        return of(this.searchTask(category, null!, true, null!).length);
    }
    getUncompletedCountInCategory(category: Category): Observable<number> {
        throw new Error("Method not implemented.");
    }
    getTotalCountInCategory(category: Category): Observable<number> {
        throw new Error("Method not implemented.");
    }
    getTotalCount(category: Category): Observable<number> {
        return of(this.searchTask(category, null!, null!, null!).length);
    }
    get(id: number): Observable<Task> {
        throw new Error("Method not implemented.");
    }

    delete(id: number): Observable<Task> {
        const task = TestData.tasks.find(t => t.id === id);
        if (task) {
            TestData.tasks.splice(TestData.tasks.indexOf(task), 1);
            return of(task);
        }
        throw new Error("Task not found");
    }
    add(entity: Task): Observable<Task> {
        if (entity.id === null || entity.id === 0) {
            entity.id = this.getLastIdTask();
        }
        TestData.tasks.push(entity);
        return of(entity);
    }

    getLastIdTask(): number {
        return Math.max.apply(Math, TestData.tasks.map(task => task.id)) + 1
    }

    update(entity: Task): Observable<Task> {
        const task = TestData.tasks.find(t => t.id === entity.id);
        if (task) {
            TestData.tasks.splice(TestData.tasks.indexOf(task), 1, entity)
            return of(task)
        }
        throw new Error("Task not found");
    }

    getAll(): Observable<Task[]> {
        return of(TestData.tasks);
    }

}