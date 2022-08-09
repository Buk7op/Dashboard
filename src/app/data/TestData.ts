import { Category } from "../model/Category";
import { Priority } from "../model/Priority";
import { Task } from "../model/Task";

export class TestData {

    static categories: Category[] = [
        {id: 1, title: 'Job'},
        {id: 2, title: 'Family'},
        {id: 3, title: 'Study'},
        {id: 4, title: 'Rest'},
        {id: 5, title: 'Sport'},
        {id: 6, title: 'Food'},
        {id: 7, title: 'Finance'},
        {id: 8, title: 'Gadgets'},
        {id: 9, title: 'Health'},
        {id: 10, title: 'Car'},
    ]

    static priorities: Priority[] = [
        {id: 1, title: 'Low', color: '#34eb34'},
        {id: 2, title: 'Medium', color: '#eb9b34'},
        {id: 3, title: 'High', color: '#eb5234'},
        {id: 4, title: 'Very high', color: '#eb3434'},
    ]

    static tasks: Task[] = [
        {
            id: 1, 
            title: 'Pour gasoline into the car', 
            priority: TestData.priorities[0],
            completed: false,
            category: TestData.categories[9],
            date: new Date('2022-08-08')
        },
        {
            id: 2, 
            title: 'Integration with Salesforce', 
            priority: TestData.priorities[1],
            completed: false,
            category: TestData.categories[0],
            date: new Date('2022-08-09')
        },
        {
            id: 3, 
            title: 'Cook food', 
            priority: TestData.priorities[2],
            completed: true,
            category: TestData.categories[5],
            date: new Date('2022-08-07')
        },
        {
            id: 4, 
            title: 'Learn to juggle', 
            completed: false,
            date: new Date('2024-08-08')
        },
    ]
}