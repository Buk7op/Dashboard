import { CommonDAO } from "./CommonDAO";
import { Task } from "src/app/model/Task";
import { Category } from "src/app/model/Category";
import { Priority } from "src/app/model/Priority";
import { Observable } from "rxjs";

export interface TaskDAO extends CommonDAO<Task> {
    
    search(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]>;

    getCompletedCountInCategory(category: Category): Promise<number>;

    getUncompletedCountInCategory(category: Category): Observable<number>;

    getTotalCountInCategory(category: Category): Observable<number>;

    getTotalCount(category: Category): Promise<number>;

}