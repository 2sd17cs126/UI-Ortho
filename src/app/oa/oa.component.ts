import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  FormArray,
  NgForm,
} from '@angular/forms';
import { Arr } from 'src/app/model';
/**
 * @title Basic expansion panel
 *
 */


@Component({
  selector: 'app-oa',
  templateUrl: './oa.component.html',
  styleUrls: ['./oa.component.css']
})
export class OAComponent {
  firstScreen:boolean=true;
  secondScreen:boolean=false;
  map_col={}
  arr: Arr = { Factors: '0', Levels: '0' };
  addForm: FormGroup;
  displayedColumns=[]
  rows=[];
  flag=false;

  Factors=0
  Number_of_factor: string = '0';

  /**Initializing row as array of form builder*/
  

  /**Adding rows to form group */
  ngOnInit() {
    
  }
  
  /**Getting the factor value and generating columns based on Factor value*/
  onSave() {
    for (let index = 0; index < Number(this.Factors); index++) {
      this.displayedColumns.push(String(index));
    }
    this.firstScreen=false;
    this.secondScreen=true;
    console.log(this.displayedColumns);

    for(let i=0 ; i< Number(this.Factors); i++)
    {
      this.rows.push({
        Factor_name:'',
        Level_count: '',
        Level_value:[],
        Level_values:''
      });
    }
  }
  
  display(){
    for(let i=0;i<Number(this.Factors);i++){
      for(let j=0;j<Number(this.rows[i].Level_count);j++){
        this.rows[i].Level_value.push({value:'0'})
      }
    }
    console.log("level_values:")
    console.log(this.rows)
    this.flag=true;
  }
  /**used to create element of form array*/


  CreateQA(){
    for(let i=0;i<Number(this.Factors);i++){
      for(let j=0;j<this.rows[i].Level_value.length;j++){
        
        this.rows[i].Level_values+=this.rows[i].Level_value[j].value
        this.rows[i].Level_values+=','
      }
      this.rows[i].Level_values=this.rows[i].Level_values.slice(0,this.rows[i].Level_values.length-1)
  }
  
  console.log(this.rows)
  
}
}
