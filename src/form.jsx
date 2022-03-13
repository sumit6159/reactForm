import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import './form.css'


export const Form= ()=>{
    const [formdata, setFormdata] = useState({
       name:"",
       age:"",
       address:"",
       Department:"",
       Salary:"",
       married:"",
       unmarried:"",

    })
    const [data,setData]= useState([])
    
    const [order, setOrder] = useState("ASC")


    const handler=(e)=>{
       const {id, value}= e.target
       setFormdata({
           ...formdata,
           [id]:value,
       })
    }

    const sorting=(col)=>{
        if(order==="ASC"){
            const sorted=[...data].sort((a,b)=>
              a[col].toLowerCase()>b[col].toLowerCase()? 1:-1
              
            )
            setData(sorted)
            setOrder("DSC")
        }
    }

    useEffect(()=>{
        getData()
    },[])

    const getData=()=>{
        axios.get(`http://localhost:2701/users`).then((res)=>{
            setData(res.data)
        })
    }
    
    const submission=(e)=>{
          axios.post("http://localhost:2701/users",formdata).then(()=>{
              getData()
              alert("user created")
              setFormdata({
                name:"",
                age:"",
                address:"",
                Department:"",
                Salary:"",
                married:"",
                unmarried:"",
              })
          })
    }
    return(
        <div className="form">
            <form onSubmit={submission}>
                <input type="text" placeholder="Full Name" id="name" onChange={handler} />
                <input type="number" placeholder="age" id="age" onChange={handler} />
                <input type="text" placeholder="Address" id="address" onChange={handler} />
                <select  id="Department" onChange={handler}>
                     <option value="">Department</option>
                     <option value="frontend">frontend</option>
                     <option value="backend">backend</option>
                     <option value="design">design</option>
                    
                </select>
                <input type="number" placeholder="Salary" id="Salary" onChange={handler} />
               
                    <label > married</label>
                    <input type="checkbox" name="married" value={"married"} id="married" onChange={handler} />
                    <label > unmarried</label>
                    <input type="checkbox" value={"unmarried"} id="unmarried" onChange={handler} />
                <input type="submit" value={"submit"} />
            </form>
            
            <div className="showdata">
                <table>
                    <thead>
                        <tr>
                        <th onClick={()=>sorting("name")}>NAME</th>
                        <th onClick={()=>sorting("age")}>AGE</th>
                        <th>ADDRESS</th>
                        <th>DEPARTMENT</th>
                        <th onClick={()=>sorting("Salary")}>SALARY</th>
                        <th>MARITAL STATUS</th>
                        </tr>
                        
                    </thead>
                    <tbody>
                        {data.map((d)=>
                          <tr key={d.id}>
                              <td>{d.name}</td>
                              <td>{d.age}</td>
                              <td>{d.address}</td>
                              <td>{d.Department}</td>
                              <td>{d.Salary}</td>
                              <td>{d.married||d.unmarried}</td>
                          </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}