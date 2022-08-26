import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Category } from "src/app/model/Category";
import { TestData } from "../../TestData";
import { CategoryDAO } from "../interface/CategoryDAO";

@Injectable({
    providedIn: 'root'
  })
export class CategoryDAOArray implements CategoryDAO {
    categoriesUrl = 'http://localhost:5268/api/v1/categories';
    allCategories: Category[];

    constructor(private http: HttpClient) {
    
    }
    
    search(title: string): Observable<Category[]> {
        this.http.get<Category[]>(this.categoriesUrl).subscribe((response) => {
            this.allCategories = response;
            if (title != null) {
                this.allCategories = this.allCategories.filter(cat => cat.title.toUpperCase().includes(title.toUpperCase()));
            }
        });
        return of(this.allCategories);
    }

    get(id: number): Observable<Category> {
        throw new Error("Method not implemented.");
    }

    delete(id: number): Observable<Category> {
        return this.http.delete<any>(this.categoriesUrl+`/${id}`);
    }

    add(entity: Category): Observable<Category> {
        return this.http.post<Category>(this.categoriesUrl, entity);
    }

    update(entity: Category): Observable<Category> {
        return this.http.put<Category>(this.categoriesUrl, entity);
    }
    getAll(): Observable<Category[]> {
        return this.http.get<Category[]>(this.categoriesUrl);
    }

}