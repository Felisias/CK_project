import { Component, OnInit } from '@angular/core';
import { filter, map } from 'rxjs';
import { DataService, Student } from 'src/app/core/services/data.service';

enum Bake {
  shiabata, cruasan, tart, nof
}

enum Coffe {
  late, capushino, espresso, nof
}

enum Toping {
  caramel, les_oreh, malina, no
}

enum Shuga {
  yes, no
}


export class Delivery {
  constructor(public numn: string, public bake: Bake, public coffe: Coffe, public toping: Toping, public shuga: Shuga) {

  }
}
@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.css']
})
export class Page2Component implements OnInit {

  users: Delivery[] = [];
  students: Student[] = [];

  numn = " ";
  bake = 0;
  coffe = 0;
  toping = 0;
  shuga = 0;

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
    this.users.push(new Delivery(this.numn, this.bake, this.coffe, this.toping, this.shuga));
    this.numn = " ";
    this.bake = 0;
    this.coffe = 0;
    this.toping = 0;
    this.shuga = 0;
  }

  onNameChange(): void {
    console.log('Что-то изменилось в поле ' + this.bake)
  }
}