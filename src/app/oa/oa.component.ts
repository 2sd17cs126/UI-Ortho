import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalService } from 'src/app/_modal/modal.service';
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
  id:string=''
  Factors=0
  Number_of_factor: string = '0';
  onscreen=[]
  obj: any;
  fetched_list=[];
  radio_list=[]
  SelectedItem='';
  Fac=0;
  data: Array<{}> = [];
  one_time_flag=false
  flag_table:boolean=false;
  /**Initializing row as array of form builder*/
  constructor(private http: HttpClient,private modalService: ModalService) {
    
  }

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


  CreateQA(id:string){
    if(this.one_time_flag==false){
      for(let i=0;i<Number(this.Factors);i++){
        for(let j=0;j<this.rows[i].Level_value.length;j++){
          
          this.rows[i].Level_values+=this.rows[i].Level_value[j].value
          this.rows[i].Level_values+=','
        }
        this.rows[i].Level_values=this.rows[i].Level_values.slice(0,this.rows[i].Level_values.length-1)
    }
    this.one_time_flag=true
    }
    
  
  console.log(this.rows)
  this.id=id
  let count = {};
  for (let index = 0; index < this.rows.length; index++) {
    let s = this.rows[index]['Level_values'].split(',').length;
    if (s in count) {
      let temp = count[s];
      temp = temp + 1;
      count[s] = temp;
    } else {
      count[s] = 1;
    }
  }
  console.log('count dic is :');
  console.log(count);
  let str = '';
  for (let key in count) {
    str += key;
    str = str + '^' + String(count[key]);
    str += ' ';
  }
  str = str.slice(0, str.length - 1);

  for (let index = 0; index < this.rows.length; index++) {
   let temp=this.rows[index].Factor_name
   this.onscreen.push(temp)
   this.map_col[this.displayedColumns[index]]=this.onscreen[index]
  }
  console.log("onscreen:"+this.map_col)
  this.http
    .post('http://127.0.0.1:8000/', {
      pattern: str,
    })
    .subscribe((data) => (this.obj = data));
  console.log(this.obj);
//
 if (this.obj) {
    this.fetched_list=this.obj.result[1]
 
 for (let index=0;index<=2;index++)
{
this.radio_list.push(this.fetched_list[index]['id'])
}
console.log("radio_list:")
console.log(this.radio_list)


 

 this.modalService.open(this.id);
  }
 
}
closeModal(id: string) {
  this.modalService.close(id);
}

submit(){
  let s='';
  console.log("selectedItem:")
  console.log(this.SelectedItem)
  for (let index=0;index<this.fetched_list.length;index++)
   {
   
   if (this.fetched_list[index]['id']==this.SelectedItem){
       console.log("fetched_list[index]:")
       console.log(this.fetched_list[index])
   if (this.fetched_list[index]['F_factor']-this.fetched_list[index]['E_index'] == 0){
   
   s=this.fetched_list[index]['tab']
   }
       else{
     this.Fac=this.fetched_list[index]['F_factor'];
     console.log("type")
     console.log(typeof this.fetched_list[index]['E_factor'] )
     let E=this.fetched_list[index]['F_factor']
     let F=this.fetched_list[index]['E_factor'];
 
     let removing_col=E-F
     console.log("removingcol:")
 
     console.log(removing_col)
     let new_=this.fetched_list[index]['tab'].split("\n")
     new_.pop()
 
     console.log("new_")
     console.log(new_)
 
     for (let i=0;i<new_.length;i++){
       s+=new_[i].slice(0,new_[i].length-removing_col);
       s+="\n";
       console.log("x:")
       console.log(s)
 
               }
 
     
           }
    break;
   }
 
   
   }
   console.log(" s new:")
     console.log(s)
   if(this.obj.result[0]){
          
     }
     else{
       
          
         let new_fac=this.Fac;
         for (let i=0; i<this.rows.length;i++)
         {
            console.log("rowssss")
            console.log(this.rows)
             if (this.rows[i].Level_values.split(",").length<new_fac)
             
             {
              console.log(this.rows[i].Level_values.split(","))
               for (let j=0; j<new_fac-this.rows[i].Level_values.split(",").length; j++)
               {
                 this.rows[i].Level_values+=',~'
                  console.log("new row:")
                  console.log(this.rows[i])
               }
             }
                 
         }
       
     }
   console.log("row.value:")
   console.log(this.rows)
   console.log("s:")
    console.log(s);
     let list = s.split('\n');
     console.log(list);
     console.log(this.displayedColumns);
     const runs = list.length;
     console.log(this.rows)
     for (let index = 0; index < runs; index++) {
       let d = {};
       for (let j = 0; j < list[index].length; j++) {
         d[String(j)] =
           this.rows[j]['Level_values'].split(',')[list[index][j]];
       }
       this.data.push(d);
     }
     console.log(this.data);
    
 
 ///
 
 this.flag_table=true;
 this.modalService.close(this.id);
 }



generate(id:string) {
  this.id=id
  let count = {};
  for (let index = 0; index < this.rows.length; index++) {
    let s = this.rows[index]['Level_values'].split(',').length;
    if (s in count) {
      let temp = count[s];
      temp = temp + 1;
      count[s] = temp;
    } else {
      count[s] = 1;
    }
  }
  console.log('count dic is :');
  console.log(count);
  let str = '';
  for (let key in count) {
    str += key;
    str = str + '^' + String(count[key]);
    str += ' ';
  }
  str = str.slice(0, str.length - 1);

  for (let index = 0; index < this.rows.length; index++) {
   let temp=this.rows[index]['Factor_name']
   this.onscreen.push(temp)
   this.map_col[this.displayedColumns[index]]=this.onscreen[index]
  }
  console.log("onscreen:"+this.map_col)
  this.http
    .post('http://127.0.0.1:8000/', {
      pattern: str,
    })
    .subscribe((data) => (this.obj = data));
  console.log(this.obj);
//
 if (this.obj) {
    this.fetched_list=this.obj.result[1]
 
 for (let index=0;index<=2;index++)
{
this.radio_list.push(this.fetched_list[index]['id'])
}
console.log("radio_list:")
console.log(this.radio_list)


 

 this.modalService.open(id);
  }
 

}
}
