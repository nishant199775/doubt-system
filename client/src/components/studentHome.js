
import { useState,useEffect } from "react";
import axios from "axios";
import {Card,Row,CardHeader,Col} from 'reactstrap'
import StudentDoubt from './studentDoubt';
import {Redirect} from 'react-router-dom'


const StudentHome = (props) => {
    const token=localStorage.getItem('token');
    const [doubts,setDoubts]=useState([])
    useEffect(async ()=>{
        try{
          const res=await axios.get("/api/v1/user/getDoubts",{
            headers:{
              "Authorization":`Bearer ${token}`
            }
          });
        
        
      console.log('res',res)
        setDoubts(res.data.doubts)
        }
        catch(err)
        {
          console.log(err);
        }
          
       
    
        },[])

        if(!localStorage.getItem('token'))
        {
            return (<Redirect to="/signin"/>)
        }
        else{
            return ( 
       
                
                <div style={{margin:'1rem'}}>
                    <Row style={{margin:"1rem"}}>
                        <Col sm="10" md={{offset:1}} >
                        <Card style={{backgroundColor:"#7d3631",color:"white",textAlign:"center"}}>

                            <CardHeader> <h1 className="display-3">Home</h1></CardHeader>
                        </Card> 
                        </Col>
                        
                    </Row>
                    <Row style={{margin:'1rem'}}>
                            <Col sm="9" xs="6"></Col>
                            <Col sm="1" xs="3"><Card style={{padding:"0.8rem"}}><b><small>{doubts.length} Doubts</small></b></Card></Col>
                    </Row>
                        
                            {doubts.length===0?<Col sm="12" md={{ size: 10, offset: 1 }}><CardHeader> <h1 className="display-4">No Doubts Posted!</h1></CardHeader>
                            </Col>:
                                doubts.map(doubt=>{
                                    return <StudentDoubt doubt={doubt}></StudentDoubt>
                                })
                                
                            }
                            
                        
                    </div>
        
             );
        }
   
}
 
export default StudentHome;