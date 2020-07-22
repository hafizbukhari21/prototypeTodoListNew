import React, { Fragment } from "react";


export default class Home extends React.Component{

    
    constructor(props){
        super(props);
        this.state={
            pushTitle :'',
            pushDesc :'',
            pushCategory:'',
            pushCity :'',
            pushCity_temp: '',
            pushDone:false,

            todo_list:[],
            
            pushItem:{
                index:0,
                title: "",
                desc:"",
                category:'',
                city:'',
                city_temp:'',
                done:false
                
            },

            int:[],
            getIndex:0,
            loading:false


            
        }

        this.handlechage = this.handlechage.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.delete = this.delete.bind(this); 
        this.getTemprature = this.getTemprature.bind(this);
        this.searchingCategory =this.searchingCategory.bind(this);
        this.checkFinish = this.checkFinish.bind(this);
    }

    componentDidMount(){
        const backup =  JSON.parse(localStorage.getItem("backup"));
        console.log(backup);

        this.setState({todo_list:backup})
    
    }

    checkFinish(index){
       
        // let  stateCopy = Object.assign({}, this.state)
        // stateCopy.todo_list[index].done = true
        // this.setState({stateCopy})
        // console.log(this.state.todo_list[index])
        
        let todo_list_temp = Object.values (this.state.todo_list)

        todo_list_temp[index].category =  todo_list_temp[index].category+ ' - Finished';
        this.setState({
            todo_list:todo_list_temp
        })

        
       
       
       
    }
    delete(index){
        const todo_list = this.state.todo_list;
        todo_list.splice(index,1);
        this.setState({todo_list : todo_list});

    }


    async getTemprature(city)  {

        if(city==""||city==undefined||city==null){
            city="jakarta,id";
        }
        
        const api_call =await fetch("https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=bf0b89e563a6be270297ec0e20ac8d05");
        const data =await api_call.json();
        let temp =  JSON.stringify(data.main.temp);
        sessionStorage.setItem("temp", temp);
 


    }


    handlechage(event){
        this.setState({[event.target.name]:event.target.value})      
    }

   

    searchingCategory(){
        // let index = this.setState.todo_list.find(item=>item.category =="Work");
        // console.log(index);
        
    }


    async handleSubmit(){
        
        
        if(this.state.pushTitle==""||this.state.pushDesc==""||this.state.pushCategory==""||this.state.pushCity=="") alert("Mohon Diisi Data yang masih kosong")
        else{
            this.setState({loading:true});
            setTimeout(()=>{
                    this.setState({loading:false});
                },1000);

            let local_todo_list = this.state.todo_list;
           await this.getTemprature(this.state.pushCity);
            let getTemp = sessionStorage.getItem("temp")-273.15;
            getTemp = getTemp.toFixed(2);
                
            this.state.pushItem={
                index:this.state.getIndex,
                title:this.state.pushTitle,
                desc:this.state.pushDesc,
                category:this.state.pushCategory,
                city:this.state.pushCity,
                city_temp:getTemp,
                done:false
                
            }
            
            sessionStorage.removeItem("temp");
            
    
            
            local_todo_list.unshift(this.state.pushItem);
    
            this.setState({todo_list:local_todo_list});
            
            localStorage.setItem("backup",JSON.stringify(this.state.todo_list))
        }
      

        

     

        

    }

 
    render(){
        const {loading} =this.state;
        const {done} = this.state.todo_list;
        

        return(
            <Fragment>
                
                {/* <div class="container mt-5">
                <form>   
                <div class="form-group">
                            <label for="exampleFormControlSelect1">Category</label>
                            <select class="form-control" id="exampleFormControlSelect1">
                            <option>Hollyday</option>
                            <option>Work</option>
                            <option>School</option>
                            <option>Not Urgent</option>
                            <option>Other..</option>
                            </select>
                        </div>
                 <button type="submit" class="btn btn-primary">Search</button>
                        
                
                </form>
                </div> */}
                

                <div class="container mt-5 ">
                <div class="card" style={{border:"0.5px solid gray"}}>
                    <div class="card-header text-light bg-dark">
                    Todo List
                    
                    </div>
                    
                    <div class="card-body" >
                    
                        <div class="form-group">
                            <label for="exampleInputEmail1">Title</label>
                            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Something Might be Happen" name="pushTitle" onChange={this.handlechage}/>
                        </div>
                        
                        <div class="form-group">
                            <label for="exampleFormControlTextarea1">Description</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" name="pushDesc" onChange={this.handlechage}></textarea>
                        </div>

                        <div class="form-group">
                            <label for="exampleFormControlSelect1">Category</label>
                            <select class="form-control" id="exampleFormControlSelect1" name="pushCategory" onChange={this.handlechage}>
                            <option  ></option>
                            <option value="Hollyday" >Hollyday</option>
                            <option value="Work">Work</option>
                            <option value="School">School</option>
                            <option value="Urgent">Urgent</option>
                            <option value="Other">Other..</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="exampleFormControlSelect1">City</label>
                            <select class="form-control" id="exampleFormControlSelect1" name="pushCity" onChange={this.handlechage} >
                            <option ></option>
                            <option value="jakarta,id" >Jakarta</option>
                            <option value="berlin,de" >Berlin</option>
                            <option value="london,uk">London</option>
                            <option value="tokyo,jp">Tokyo</option>
                            <option value="surabaya,id">Surabaya</option>
                            <option value="medan,id">Medan</option>
                            <option value="bandung,id">Bandung</option>
                            <option value="tangerang,id">tangerang</option>
                            </select>
                        </div>


                       

                        {!loading && <button  class="btn btn-primary" onClick={this.handleSubmit} disabled={loading}>
                           Add Todo
                        </button>}
                        {loading && <div class="spinner-border text-primary" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>}
                        
                    </div>
                    
                </div>  
                </div>


                <div class="container ">
                <div class="row">
                {this.state.todo_list.map((todoList,index)=>{
                        return(
                        
                                <div class="col-sm-6 mt-3">
                                   <div class="card">

                                    {!done &&  <h5 class="card-header bg-primary text-white">{todoList.title} - {todoList.category}</h5> }
                                    {done &&   <h5 class="card-header bg-success text-white">asdsad</h5> }
                                        <div class="card-body">

                                            <h5 class="card-title"> {todoList.desc} </h5>
                                            <p class="card-text text-secondary"> {todoList.city},&nbsp; {todoList.city_temp}<sup>0</sup> </p>
                                            <div class="form-check">
                                                <input type="checkbox" class="form-check-input" id="exampleCheck1"  onClick={() => this.checkFinish(parseInt(index))} value={index}/>
                                                <label class="form-check-label" for="exampleCheck1">Finish</label>
                                            </div>
                                            <a  class="btn btn-danger text-white" value={index} onClick={() => this.delete(parseInt(index))}>Delete</a>
                                        </div>
                                        </div>
                                </div>
            
                        )
                    }
                    )} 
                </div>
                </div>

                
               

                <br></br>
                <br></br>
                <br></br>
                
               
                
            
            </Fragment>
        );
    }
}

