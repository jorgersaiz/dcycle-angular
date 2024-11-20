import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { NameService } from '../../services/name.service';
import { translateGender } from '../../helpers/translateGender.helper';
import { Nationality } from '../../models/nationality.model';
import { CardComponent } from "../../components/card/card.component";
import { TableComponent } from "../../components/table/table.component";
import { NameFormComponent } from "../../components/name-form/name-form.component";

@Component({
  selector: 'app-exercise1',
  standalone: true,
  imports: [ReactiveFormsModule, CardComponent, TableComponent, NameFormComponent],
  templateUrl: './exercise1.component.html',
  styleUrl: './exercise1.component.scss'
})
export class Exercise1Component {
  public statsForm = new FormGroup({
    name: new FormControl()
  })
  gender!: string;
  age!: string;
  nationality!: Nationality;
  tableData!: string[][];
  selectedName!: string;
  tableHead = [
    '#',
    'Nacionalidad',
    'Probabilidad'
  ]

  constructor(private NameService: NameService) {

  }

  submitForm(name: string) {
    forkJoin(
      [
        this.NameService.getGender(name), 
        this.NameService.getAge(name), 
        this.NameService.getNationality(name)
      ]
    ).subscribe({
      next: results => {
        this.selectedName = name;
        this.gender = `${translateGender(results[0].gender)}: ${results[0].probability * 100}%`;
        this.age = `${results[1].age} años`;
        this.nationality = results[2];
        this.tableData = this.nationality.country.map(item => [item.country_id, String((item.probability * 100).toFixed(2)) + '%'])

      },
      error: err => {
        console.error('Error:', err);
      }
    });
  }
}
