import { Observable } from "rxjs";

export interface CommonDAO<T> {
    get(id: number): Observable<T>;
    delete(id: number): Observable<T>;
    add(entity: T): Observable<T>;
    update(entity: T): Observable<T>;
    getAll(): Observable<T[]>;
}