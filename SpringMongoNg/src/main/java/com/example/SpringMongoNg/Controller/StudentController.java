package com.example.SpringMongoNg.Controller;

import com.example.SpringMongoNg.Entity.Student;
import com.example.SpringMongoNg.Service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*") // mandatory for connecting to Frontend App
@RequestMapping("api/v1/student")
public class StudentController
{
    @Autowired
    private StudentService studentService;

    @PostMapping(value = "/save")
    private String saveStudent(@RequestBody Student student)
    {
        studentService.saveOrUpdate(student);
        return student.getId();
    }

    @GetMapping(value = "/getAll")
    private Iterable<Student> getStudents()
    {
        return studentService.getAllStudents();
    }

    @PutMapping(value = "/edit/{id}")
    private Student updateStudent(@RequestBody Student student, @PathVariable(name="id")String id)
    {
        student.setId(id);
        studentService.saveOrUpdate(student);
        return student;
    }

    @DeleteMapping("/delete/{id}")
    private String deleteStudent(@PathVariable("id")String id)
    {
        studentService.deleteStudent(id);
        return "Student deleted !";
    }

    @RequestMapping("/search/{id}")
    private Student getStudent(@PathVariable("id")String id)
    {
        return studentService.getStudentById(id);
    }
}
