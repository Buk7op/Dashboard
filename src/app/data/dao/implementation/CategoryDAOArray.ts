import { Observable } from "rxjs";
import { Category } from "src/app/model/Category";
import { CategoryDAO } from "../interface/CategoryDAO";

export class CategoryDAOArray implements CategoryDAO {
    
    search(title: string): Observable<Category[]> {
        throw new Error("Method not implemented.");
    }
    get(id: number): Observable<Category> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Observable<Category> {
        throw new Error("Method not implemented.");
    }
    add(entity: Category): Observable<Category> {
        throw new Error("Method not implemented.");
    }
    update(entity: Category): Observable<Category> {
        throw new Error("Method not implemented.");
    }
    getAll(): Observable<Category[]> {
        throw new Error("Method not implemented.");
    }

}