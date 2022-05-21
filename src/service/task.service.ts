import Task, { ITask} from '../model/task.model';

const createTask = async (input: ITask) => {
  try {
    return await Task.create(input)
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw e;
    }
  }
}

export { createTask };