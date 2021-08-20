import { useState,useEffect } from "react";
import axios from 'axios';

import { Card, Row, Col,CardHeader } from 'reactstrap';

const TaReport = () => {
    const [details,setDetails]=useState([]);
    const token=localStorage.getItem('token');
    useEffect(async ()=>{
        try{
            
          const res=await axios.get("/api/v1/ta/getAllTa",{
            headers:{
              "Authorization":`Bearer ${token}`
            }
          });
        
        
      console.log('res',res)
      setDetails(res.data.details);
        }
        catch(err)
        {
          console.log(err);
        }
          
       
    
        },[])
    return (
        <>
        
        <Row  >
        
        
        <Col sm="12">
      <Card style={{padding:'1vw',backgroundColor:"#dadbbd"}}>
      {/* <CardHeader className="my-2" style={{textTransform:"capitalize",textAlign:"center",backgroundColor:"grey"}} tag="h1">
         TA Report</CardHeader> */}
        <Card body style={{backgroundColor:"#302f2f"}}>
        <Row>
          <Col sm="4"></Col>
          <Col sm="4"><h2 style={{border:"2px solid green",color:"white",textAlign:"center",borderRadius:"12px"}} className="my-2">Top Achievers</h2></Col>
          <Col sm="4"></Col>
          
        </Row>
        </Card>
        
        {
                details.map((detail)=>{
                    return(<Card body style={{marginTop:"2vw",backgroundColor:"#f2f2e4"}}>
                        <Row><b>{detail.name}</b></Row>
                    <Row>
                        <Col sm="3">
                            Doubt Accepted:
                            <b>{detail.accepted.length}</b>
                        </Col>
                        <Col sm="3">
                            Doubt Resolved:
                           <b>{detail.resolved.length}</b> 
                        </Col>
                        <Col sm="3">
                            Doubt Escalated:
                            <b>{detail.escalated.length}</b>
                        </Col>
                        <Col sm="3">
                            Average Time:<b>{detail.averageTime} Mins</b>
                        </Col>
                        
                        
                        
                                
                            
                       
                    </Row>
                </Card>);
                })

            }
      </Card>
    </Col>
  </Row>
           
                
            
             
        </>
    
    )
}
 
export default TaReport;