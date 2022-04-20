package com.niit.controller;


import com.niit.model.Task;
import com.niit.model.TaskDTO;
import com.niit.service.TaskService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin(origins ="http://localhost:4200")
@RequestMapping("api/v3/")
public class TaskController {


    private TaskService taskService;

    @GetMapping("tasks")
    public ResponseEntity<?> getAllTasks(){
        try {
            return new ResponseEntity<>(
                    taskService.getAllTasks(),
                    HttpStatus.OK);
        } catch (Exception e) {
            return errorResponse();
        }
    }

    @GetMapping("{id}/tasks")
    public ResponseEntity<?> getTask(@PathVariable int id){
        try {
            Optional<Task> optTask = taskService.getTaskById(id);
            if (optTask.isPresent()) {
                return new ResponseEntity<>(
                        optTask.get(),
                        HttpStatus.OK);
            } else {
                return noTaskFoundResponse(id);
            }
        } catch (Exception e) {
            return errorResponse();
        }
    }

    @GetMapping("task")
    public ResponseEntity<?> getTaskByTitle(@RequestParam String taskName){
        try {
            Optional<Task> optTask = taskService.getTaskByName(taskName);
            if (optTask.isPresent()) {
                return new ResponseEntity<>(
                        optTask.get(),
                        HttpStatus.OK);
            } else {
                return new ResponseEntity<>("No task found with a title: " + taskName, HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return errorResponse();
        }
    }

    @PostMapping("create")
    public ResponseEntity<?> createTask(@RequestBody TaskDTO taskDTO){
        try {
            return new ResponseEntity<>(
                    taskService.saveNewTask(taskDTO),
                    HttpStatus.CREATED);
        } catch (Exception e) {
            return errorResponse();
        }
    }

    @PutMapping("update")
    public ResponseEntity<?> updateTask( @RequestBody TaskDTO taskDTO){
        try {
            Optional<Task> optTask = taskService.getTaskById(taskDTO.getTaskId());
            if (optTask.isPresent()) {
                return new ResponseEntity<>(
                        taskService.updateTask(optTask.get(), taskDTO),
                        HttpStatus.OK);
            } else {
                return noTaskFoundResponse(taskDTO.getTaskId());
            }
        } catch (Exception e) {
            return errorResponse();
        }
    }

    @DeleteMapping("{id}/delete")
    public ResponseEntity<?> deleteTask(@PathVariable int id){
        try {
            Optional<Task> optTask = taskService.getTaskById(id);
            if (optTask.isPresent()) {
                taskService.deleteTask(optTask.get());
                return new ResponseEntity<>(String.format("Task with id: %d was deleted", id), HttpStatus.OK);
            } else {
                return noTaskFoundResponse(id);
            }
        } catch (Exception e) {
            return errorResponse();
        }
    }

    private ResponseEntity<String> errorResponse(){
        return new ResponseEntity<>("Something went wrong :(", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private ResponseEntity<String> noTaskFoundResponse(int id){
        return new ResponseEntity<>("No task found with id: " + id, HttpStatus.NOT_FOUND);
    }

}
