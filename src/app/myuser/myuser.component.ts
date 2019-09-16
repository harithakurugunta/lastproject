import { Component, OnInit } from '@angular/core';
import{HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-myuser',
  templateUrl: './myuser.component.html',
  styleUrls: ['./myuser.component.css']
})
export class MyuserComponent implements OnInit {

  constructor(private obj:HttpClient) { }

  ngOnInit() {
    this.getemp();
    
  }

  allemp:any[];
  tokenno=localStorage.getItem("tokenno");
  getemp()
  {
    var url ="https://jobswalkin.com/web/getemployee.php";
    var jsondata={"id":this.tokenno};
    this.obj.post(url,jsondata).subscribe(response=>{
    this.allemp=response as string[];
    });
  }

  //save emp
  name:string;
  mobile:number;
  email:string;
  address:string;
  saveemp()
  {
    var url ="https://jobswalkin.com/web/saveemployee.php";
    var jsondata={"id":this.tokenno,"name":this.name,"mobile":this.mobile,
               "email":this.email,"address":this.address}; 
      this.obj.post(url,jsondata).subscribe (response=>{
          this.getemp();
      });     
  }

}
