import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { from, Observable, of, scheduled } from "rxjs";
import { Category } from "src/app/model/Category";
import { Priority } from "src/app/model/Priority";
import { Task } from "src/app/model/Task";
import { TestData } from "../../TestData";
import { TaskDAO } from "../interface/TaskDAO";

@Injectable({
    providedIn: 'root'
  })
export class TaskDAOArray implements TaskDAO {
    tasksUrl = 'http://localhost:5268/api/v1/tasks'
    allTasks: Task[];

    constructor(private http: HttpClient) {
        
    }

    async setupSearch() {
        this.allTasks = await this.getAll().toPromise();
    }

    search(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]> {
        return from(this.searchTask(category, searchText, status, priority));
    }

    async searchTask(category: Category, searchText: string, status: boolean, priority: Priority): Promise<Task[]> {
        if(this.allTasks == undefined) {
            await this.setupSearch();
        }

        let tasks = this.allTasks;

        if (status != null) {
            tasks = tasks.filter(todo => todo.completed === status);
        }

        if (category != null) {
            tasks = tasks.filter(todo => todo.category?.id === category.id);
        }

        if (priority != null) {
            tasks = tasks.filter(todo => todo.priority?.id === priority.id);
        }

        if (searchText != null) {
            tasks = tasks.filter(todo => todo.title.toUpperCase().includes(searchText.toUpperCase()));
        }
        return tasks;
    }

    async getCompletedCountInCategory(category: Category): Promise<number> {
        return (await this.searchTask(category, null!, true, null!)).length;
    }
    getUncompletedCountInCategory(category: Category): Observable<number> {
        throw new Error("Method not implemented.");
    }
    getTotalCountInCategory(category: Category): Observable<number> {
        throw new Error("Method not implemented.");
    }
    async getTotalCount(category: Category): Promise<number> {
        return (await this.searchTask(category, null!, null!, null!)).length;
    }
    get(id: number): Observable<Task> {
        throw new Error("Method not implemented.");
    }

    delete(id: number): Observable<Task> {
        return this.http.delete<any>(this.tasksUrl+`/${id}`);
    }
    add(entity: Task): Observable<Task> {
        return this.http.post<Task>(this.tasksUrl, entity);
    }

    update(entity: Task): Observable<Task> {
        return this.http.put<Task>(this.tasksUrl, entity);
    }

    getAll(): Observable<Task[]> {
        return this.http.get<Task[]>(this.tasksUrl);
    }

}