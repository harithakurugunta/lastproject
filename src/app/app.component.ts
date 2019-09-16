import { Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angularApp';
  login:boolean=true;//if false it show signup else 
  signup:boolean=false;//if true it show signup page else login
 
  
  pagesubmit:boolean=false;
  loginform:FormGroup;
  tokenno:boolean=false;
  name:string;
  errormessage:string;

  constructor(private formobj:FormBuilder, private httpObj:HttpClient)
  
  {
    
    if((localStorage.getItem("tokenno")==null) || (localStorage.getItem("tokenno")==""))//dynamic 
    {
  this.tokenno=false;
    }else{
      this.tokenno=true;
      this.name=localStorage.getItem("name");
    }
  }

  enableblock(flag:string)
  {
    if(flag=="1")
    {
      this.login=false;
      this.signup=true;

    }else{
      this.login=true;
      this.signup=false;
    }
  }



  ngOnInit()
  {
    this.loginform=this.formobj.group({
      emailid :["",[Validators.required, Validators.email]],
      upass : ["",[Validators.required, Validators.minLength(5), Validators.maxLength(8)]] 
    });
  }


  userdata;

  logincheck()
  {
    this.pagesubmit=true;
    if(this.loginform.invalid)
    {
      return;
    }
    
 var jsondata = JSON.stringify(this.loginform.value);
 var url ="https://jobswalkin.com/web/auth.php";
 this.httpObj.post(url, jsondata).subscribe(
   response=>{
     this.userdata = response as string[];

     if
     (this.userdata.name !="")
     {
    localStorage.setItem("name",this.userdata.name);
    localStorage.setItem("tokenno",this.userdata.id);// to set data in local storage
    window.location.href="/dashboard";//to reload current page
   

  }else{
    this.errormessage ="Invalid/ Not Exit Login Details";
  }
   });
  }

  
  logout()
  {
    localStorage.setItem("name","");
    localStorage.setItem("tokenno","");
    this.tokenno=false;
    window.location.href="";
    //window.location.reload();//to reload current page
  }

  

  //signup start here

  fname:string;
  mobile:string;
  email:string;
  pass:string;
  city:string;
  pincode:string;

serverres;

register()
{
  var url ="https://jobswalkin.com/web/register.php";
var jsondata={"name":this.fname,"mobile":this.mobile,
              "email":this.email,"pass":this.pass,
              "city":this.city,"pincode":this.pincode
               

            };

            this.httpObj.post(url,jsondata).subscribe(response=>{
               this.serverres=response as string[];
               if(this.serverres.status=="SUCCESS")
               {
                 this.errormessage="Register success ! please login";
                 this.login=true;
                 this.signup=false;
               }else{
                this.errormessage="duplicate email try again";
                this.login=false;
                this.signup=true;
               }
            });

}//register class end

  
}
