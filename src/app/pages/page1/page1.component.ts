import { Component, OnInit } from '@angular/core';
import { filter, map } from 'rxjs';
import { DataService, Student } from 'src/app/core/services/data.service';

export class BigHit {
  constructor(public name: string, public surname: string, public second_name: string, public phone_number: string, public age: string) {

  }
}
@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css']
})
export class Page1Component implements OnInit {

  users: BigHit[] = [];
  students: Student[] = [];

  name = " ";
  surname = " ";
  second_name = " ";
  phone_number = " ";
  age = " ";

  constructor(private dataService: DataService) {
    
  }

  ngOnInit(): void {
      this.dataService.getStudents()
      .pipe(
        filter(data => data != null),
        map((data => (data.map(student => ({...student, group: student.group + ' 1 курс'})))))
      )
      .subscribe((students) => {
          this.students = students;
      })

  }


  addUser() {
    this.users.push(new BigHit(this.name, this.surname, this.second_name, this.phone_number, this.age));
    this.name = " ";
    this.surname = " ";
    this.second_name = " ";
    this.phone_number = " ";
    this.age = " ";
  }

  onNameChange(): void {
    console.log('Что-то изменилось в поле ' + this.name)
  }
}