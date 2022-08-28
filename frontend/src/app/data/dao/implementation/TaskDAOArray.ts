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

    constructor(private http: HttpClient) {
        
    }

    search(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]> {
        return from(this.searchTask(category, searchText, status, priority));
    }

    async searchTask(category: Category, searchText: string, status: boolean, priority: Priority): Promise<Task[]> {
        let allTasks = await this.http.get<Task[]>(this.tasksUrl).toPromise();

        if (status != null) {
            allTasks = allTasks.filter(todo => todo.completed === status);
        }

        if (category != null) {
            allTasks = allTasks.filter(todo => todo.category?.id === category.id);
        }

        if (priority != null) {
            allTasks = allTasks.filter(todo => todo.priority === priority);
        }

        if (searchText != null) {
            allTasks = allTasks.filter(todo => todo.title.toUpperCase().includes(searchText.toUpperCase()));
        }
        return allTasks;
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
        return (await this.searchTask(category, null!, true, null!)).length;
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