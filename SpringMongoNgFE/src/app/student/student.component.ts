import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent {

  StudentsArray: any[] = [];

  // unless the below variables are present in .ts, error in .html
  student_name: string = '';
  student_address: string = '';
  student_mobile: Number = 0;

  currentStudentID = '';

  constructor(private http: HttpClient) {
    this.getAllStudents();
  }

  register() {
    let dataOb = {
      // 'entity-data-member': form-name
      'name': this.student_name,
      'address': this.student_address,
      'mobile': this.student_mobile
    };

    this.http.post(
      'http://localhost:8080/api/v1/student/save', dataOb, { responseType: 'text' }
    ).subscribe((data: any) => {
      console.log(data);
      alert('Student registered successfully !');

      // To display records in the below table
      this.getAllStudents();

      // To reset the values  in the browser form for new entry
      this.student_name = '';
      this.student_address = '';
      this.student_mobile = 0;
    });
  }

  getAllStudents() {
    this.http.get('http://localhost:8080/api/v1/student/getAll').subscribe((data: any) => {
      console.log(data);
      this.StudentsArray = data;
    });
  }

  setUpdate(student: any) {
    this.currentStudentID = student.id;
    this.student_name = student.name;
    this.student_address = student.address;
    this.student_mobile = student.mobile;

    alert(student.id);
  }

  updateRecord() {
    let dataOb = {
      'id': this.currentStudentID,
      'name': this.student_name,
      'address': this.student_address,
      'mobile': this.student_mobile
    };

    this.http.put(
      'http://localhost:8080/api/v1/student/edit/' + this.currentStudentID, dataOb, { responseType: 'text' }
    ).subscribe((data: any) => {
      console.log(data);
      alert('Student updated successfully !');

      this.getAllStudents();

      this.student_name = '';
      this.student_address = '';
      this.student_mobile = 0;
    });
  }

  save() {
    if (this.currentStudentID == '') {
      this.register();
    } else {
      this.updateRecord();
    }
  }

  setDelete(student: any) {
    this.http.delete('http://localhost:8080/api/v1/student/delete/' + student.id, { responseType: 'text' }
    ).subscribe((data: any) => {
      console.log(data);
      alert('Student deleted successfully !');

      this.getAllStudents();

      this.student_name = '';
      this.student_address = '';
      this.student_mobile = 0;
    });
  }
}
