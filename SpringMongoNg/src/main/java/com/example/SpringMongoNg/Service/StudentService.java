package com.example.SpringMongoNg.Service;

import com.example.SpringMongoNg.Entity.Student;
import com.example.SpringMongoNg.Repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    public void saveOrUpdate(Student student)
    {
        studentRepository.save(student);
    }

    public Iterable<Student> getAllStudents()
    {
        return this.studentRepository.findAll();
    }

    public void deleteStudent(String id)
    {
        studentRepository.deleteById(id);
    }

    public Student getStudentById(String id)
    {
        return studentRepository.findById(id).get();
    }
}
