package com.niit.service;

import com.niit.model.Task;
import com.niit.model.TaskDTO;

import java.util.List;
import java.util.Optional;

public interface TaskService {

    List<Task> getAllTasks();

    Optional<Task> getTaskById(int taskId);

    Optional<Task> getTaskByName(String taskName);

    Task saveNewTask(TaskDTO taskDTO);

    Task updateTask(Task oldTask, TaskDTO newTaskDTO);

    void deleteTask(Task task);


}
