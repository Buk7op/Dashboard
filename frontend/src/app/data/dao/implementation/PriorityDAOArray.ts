import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Category } from "src/app/model/Category";
import { Priority } from "src/app/model/Priority";
import { Task } from "src/app/model/Task";
import { TestData } from "../../TestData";
import { PriorityDAO } from "../interface/PriorityDAO";

@Injectable({
    providedIn: 'root'
  })
export class PriorityDAOArray implements PriorityDAO {

    constructor(private http: HttpClient) {
        
    }

    prioritiesUrl = 'http://localhost:5268/api/v1/priorities';

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
        return this.http.get<Priority[]>(this.prioritiesUrl);
    }
}