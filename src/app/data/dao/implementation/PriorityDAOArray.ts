import { Observable } from "rxjs";
import { Category } from "src/app/model/Category";
import { Priority } from "src/app/model/Priority";
import { Task } from "src/app/model/Task";
import { PriorityDAO } from "../interface/PriorityDAO";

export class PriorityDAOArray implements PriorityDAO {
    get(id: number): Observable<Priority> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Observable<Priority> {
        throw new Error("Method not implemented.");
    }
    add(entity: Priority): Observable<Priority> {
        throw new Error("Method not implemented.");
    }
    update(entity: Priority): Observable<Priority> {
        throw new Error("Method not implemented.");
    }
    getAll(): Observable<Priority[]> {
        throw new Error("Method not implemented.");
    }
}