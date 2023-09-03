package com.example.SpringMongoNg.Repository;

import com.example.SpringMongoNg.Entity.Student;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface StudentRepository extends MongoRepository<Student, String> {
}
