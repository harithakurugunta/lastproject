import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-useritem',
  templateUrl: './useritem.component.html',
  styleUrls: ['./useritem.component.css']
})
export class UseritemComponent implements OnInit {

  constructor(private obj:HttpClient) { }

  ngOnInit()
  
  {
this.getemp();
this.getitem();

this.showempitem();
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

  allitem:any[];

  getitem()
  {
var url ="https://jobswalkin.com/web/getitem.php";
var jsondata={"id":this.tokenno};
this.obj.post(url,jsondata).subscribe(response=>{
this.allitem=response as string[];

});
  }

  myemp:string;
  myitem:string;
  myqty:string;


save()
{
  var url ="https://jobswalkin.com/web/itememp.php";
  var jsondata={"userid":this.tokenno,
                 "myemp":this.myemp,     //"myemp" this one is given in php,"myitem" these two
                 "myitem":this.myitem,
                 "qty":this.myqty

                };


this.obj.post(url,jsondata).subscribe(response=>{
   this.showempitem();
});

}

allempitem:any[];

showempitem()
{
  var url ="https://jobswalkin.com/web/getempitemdata.php";
  var jsondata={"userid":this.tokenno
                  };

this.obj.post(url,jsondata).subscribe(response=>{
   this.allempitem=response as string[];
});
}

}
