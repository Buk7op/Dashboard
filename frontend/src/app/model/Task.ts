import { Category } from "./Category";
import { Priority } from "./Priority";

export class Task {
    id: number;
    title: string;
    completed: boolean;
    priority?: Priority;
    category?: Category;
    date?: Date;

    constructor(id: number, title: string, completed: boolean, priority?: Priority, category?: Category, date?: Date) {
        this.id = id;
        this.title = title;
        this.completed = completed;
        this.priority = priority;
        this.category = category;
        this.date = date;
    }
}