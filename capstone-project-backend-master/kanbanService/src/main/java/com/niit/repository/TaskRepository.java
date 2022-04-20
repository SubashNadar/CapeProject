package com.niit.repository;

import com.niit.model.Task;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface TaskRepository extends MongoRepository<Task,Integer> {

   Optional<Task> findByTaskName(String taskName);
}
