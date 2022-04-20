package com.niit.service;


import com.niit.model.Task;
import com.niit.model.TaskDTO;
import com.niit.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TaskServiceImpl implements TaskService{

    @Autowired
    private TaskRepository taskRepository;

    @Override
    public List<Task> getAllTasks() {
        List<Task> tasksList = new ArrayList<>();
        taskRepository.findAll().forEach(tasksList::add);
        return tasksList;
    }

    @Override
    public Optional<Task> getTaskById(int taskId) {
        return taskRepository.findById(taskId);
    }

    @Override
    public Optional<Task> getTaskByName(String taskName) {
        return taskRepository.findByTaskName(taskName);
    }

    @Override
    public Task saveNewTask(TaskDTO taskDTO) {
        return taskRepository.save(convertDTOToTask(taskDTO));
    }

    @Override
    public Task updateTask(Task oldTask, TaskDTO newTaskDTO) {
        return taskRepository.save(updateTaskFromDTO(oldTask, newTaskDTO));
    }

    @Override
    public void deleteTask(Task task) {
        taskRepository.delete(task);
    }


    private Task convertDTOToTask(TaskDTO taskDTO) {
        Task task = new Task();
        task.setTaskName(taskDTO.getTaskName());
        task.setDescription(taskDTO.getDescription());
        task.setTaskStatus(taskDTO.getTaskStatus());
        task.setAssignTo(taskDTO.getAssignTo());
        return task;
    }

    private Task updateTaskFromDTO(Task task, TaskDTO taskDTO){
        if(Optional.ofNullable(taskDTO.getTaskName()).isPresent()){
            task.setTaskName(taskDTO.getTaskName());
        }

        if (Optional.ofNullable((taskDTO.getDescription())).isPresent()) {
            task.setDescription(taskDTO.getDescription());
        }

        if (Optional.ofNullable((taskDTO.getAssignTo())).isPresent()) {
            task.setAssignTo(taskDTO.getAssignTo());
        }

        if (Optional.ofNullable((taskDTO.getTaskStatus())).isPresent()) {
            task.setTaskStatus(taskDTO.getTaskStatus());
        }
        return task;
    }
}
