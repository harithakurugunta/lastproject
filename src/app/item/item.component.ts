import { Component, OnInit } from '@angular/core';
import{HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  constructor(private Obj:HttpClient) { }

 tokenno=localStorage.getItem("tokenno");

  ngOnInit() {

    this.getitem();
  }

  itemname:string;
  price:number;
  qty:number;
  msg:string;

  save()
  {
       var url ="https://jobswalkin.com/web/saveitem.php";
       var jsondata={"name":this.itemname,"price":this.price,
               "qty":this.qty,"userid":this.tokenno};//userid is given here to know who sending the data userid is unique thats why
      this.Obj.post(url,jsondata).subscribe(response=>{
       //this.msg=response as string;
        this.getitem();
        this.itemname="";
        this.price=0;
        this.qty=0;


 });  

  }
  allitem:any[];

  getitem()
  {
var url ="https://jobswalkin.com/web/getitem.php";
var jsondata={"id":this.tokenno};
this.Obj.post(url,jsondata).subscribe(response=>{
this.allitem=response as string[];
this.msg="my total item:"+this.allitem.length;
});
  }

}

//itemname:string,price:string,qty:string
//save(u:string,p:string,q:string){
//
// }
