import { hub } from "dom-native";
import { webDelete, webGet, webPatch, webPost } from "src/webc";

export interface Todo {
    id: number;
    title: string;
    status: 'Open' | 'Close';
}

export type TodoPatch = Partial<Omit<Todo, 'id'>>;

class TodoMco {
    async list(): Promise<Todo[]> {
        const data = await webGet("todos");
        return data as Todo[];
    }

    async create(data: TodoPatch): Promise<Todo> {
        // guard (TODO - validate data)
        if (data.title === null || data.title?.trim().length === 0) {
            throw new Error("Cannot create Todo with empty title");
        }
        // to server
        const newData = await webPost("todos", data);
        // sending event
        hub("dataHub").pub("Todo", "create", newData);

        return newData as Todo;
    }

    async update(id: number, data: TodoPatch): Promise<Todo> {
        // guard (TODO - validate data)
        if (data.title === null || data.title?.trim().length === 0) {
            throw new Error("Cannot update Todo with empty title");
        }
        // to server
        const newData = await webPatch(`todos/${id}`, data);
        // sending event
        hub("dataHub").pub("Todo", "update", newData);

        return newData as Todo;
    }

    async delete(id: number): Promise<Todo> {
        // to server
        const oldData = await webDelete(`todos/${id}`);
        // sending event
        hub("dataHub").pub("Todo", "delete", oldData);

        return oldData as Todo;
    }
}

export const todoMco = new TodoMco();
