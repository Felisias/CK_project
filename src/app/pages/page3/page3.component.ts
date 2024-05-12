import { Component, OnInit } from '@angular/core';
import { filter, map } from 'rxjs';
import { DataService, Student } from 'src/app/core/services/data.service';

enum Potato {
  small,
  medium,
  large
}

enum Burger {
  BigHit,
  Premier,
  Chiz
}

enum Drink {
  Cola,
  Fanta,
  Sprite
}

enum Sauce {
  Cheesy,
  Sweet,
  Barbecue
}

enum Dessert {
  Sunday,
  Mcflury
}


export class BigHit {
  constructor(public numn: string, public potato: Potato, public drink: Drink, public burger: Burger, public sauce: Sauce, public dessert: Dessert) {

  }
}
@Component({
  selector: 'app-page3',
  templateUrl: './page3.component.html',
  styleUrls: ['./page3.component.css']
})
export class Page3Component implements OnInit {

  users: BigHit[] = [];
  students: Student[] = [];

  numn = " ";
  potato = 0;
  burger = 0;
  drink = 0;
  sauce = 0;
  dessert = 0;

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
    this.users.push(new BigHit(this.numn, this.potato, this.drink, this.burger, this.sauce, this.dessert));
    this.numn = " ";
    this.potato = 0;
    this.burger = 0;
    this.drink = 0;
    this.sauce = 0;
    this.dessert = 0;
  }

  onNameChange(): void {
    console.log('Что-то изменилось в поле ' + this.burger)
  }
}