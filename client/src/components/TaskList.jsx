import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { editTask, getTasksForProject } from "../api/task";
import TaskListItem from "./TaskListItem";
import Button from 'react-bootstrap/Button';
import {
  useApplicationState,
  useApplicationDispatch,
} from '../hooks/useApplicationData';
import { ADD_TASK, CLOSE_ADD_TASK, SET_TASKS } from '../reducer/data_reducer';
import TaskForm from "./TaskForm";
import EditTaskForm from "./EditTaskForm";

export default function TaskList() {
  const { taskId, tasks, taskToEdit, taskToAdd } = useApplicationState();
  const dispatch = useApplicationDispatch();

  const { id } = useParams();


  useEffect(() => {
    console.log("ID ==========>", id);
    getTasksForProject(id)
      .then((data) => {
        dispatch({
          type: SET_TASKS,
          tasks: data,
        });
      });
  }, [id]);

  const taskList = tasks.map((task) => {
    return (
      <>
        <TaskListItem
          task={task}
        />
      </>
    );
  });

  return (
    <>
      <table className="table table-light table-striped">
        <thead>
          <tr>
            <th scope="col">Task</th>
            <th scope="col">Status</th>
            <th scope="col">Deadline</th>
            <th scope="col">Assigned User</th>
            <th scope="col">Project ID</th>
            <th scope="col">Description</th>
            <th scope="col">Delete</th>
            <th scope="col">Edit</th>
          </tr>
        </thead>
        <tbody>{taskList}</tbody>
      </table>
      <TaskForm taskToAdd={taskToAdd} />
      {taskToEdit && <EditTaskForm taskToEdit={taskToEdit} />}

    </>
  );
}
