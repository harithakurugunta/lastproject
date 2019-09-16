import { Component, OnInit } from '@angular/core';
import{HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private Obj:HttpClient) { }

  ngOnInit() {
    this.getprofile();
  }
  //name:string;
  //mobile:number;
  //password:string;
  //city:string;
 // pincode:string; if you want you can use this one by removingcoments

  profiledata;

  getprofile()
  {
var jsondata={"id":localStorage.getItem("tokenno")};
var url ="https://jobswalkin.com/web/profile.php";
this.Obj.post(url,jsondata).subscribe(response=>{
this.profiledata=response as string[];
});
  }
}
