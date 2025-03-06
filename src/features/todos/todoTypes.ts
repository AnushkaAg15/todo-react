export type TodoStatus =  'pending' | 'completed' | 'archived';

export interface Todo {
    id: string;
    title: string;
    description: string;
    startDate: string;
    endDate: string; 
    status: TodoStatus;
}
