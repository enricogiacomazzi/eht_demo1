


export interface TodoModel {
    id: string,
    text: string,
    done: boolean
}

export type TodoIdModel = Pick<TodoModel, 'id'>['id'];