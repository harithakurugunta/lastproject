import { Component, OnInit } from '@angular/core';
import{HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private obj:HttpClient) { }

  ngOnInit() {
      this.getemp();
      this.getitem();
      this.getditem();
  }

  allemp:any[];
  tokenno=localStorage.getItem("tokenno");
  getemp()
  {
    var url ="https://jobswalkin.com/web/getemployee.php";
    var jsondata={"id":this.tokenno};
    this.obj.post(url,jsondata).subscribe(response=>{
    this.allemp=response as string[];
    this.allemp.length;
    });
  }

  allitem:any[];

  getitem()
  {
var url ="https://jobswalkin.com/web/getitem.php";
var jsondata={"id":this.tokenno};
this.obj.post(url,jsondata).subscribe(response=>{
this.allitem=response as string[];
this.allitem.length;
});
  }

  allditem:string;

  getditem()//getditem means getdistributed items
  {
var url ="https://jobswalkin.com/web/getditem.php";
var jsondata={"id":this.tokenno};
this.obj.post(url,jsondata).subscribe(response=>{
this.allditem=response as string;

});
  }

}
