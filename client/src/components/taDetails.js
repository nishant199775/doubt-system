import { useState,useEffect } from "react";
import axios from 'axios';
import TaReport from "./taReport";
import { Card,CardHeader, Container, CardTitle, CardText, Row, Col } from 'reactstrap';
import { Redirect } from "react-router";

const TaDetails = () => {
    const [escalated,setEscalated]=useState(0);
    const [resolved,setResolved]=useState(0);
    const [accepted,setAccepted]=useState(0);
    const [avg,setAvg]=useState(0);
    const token=localStorage.getItem('token');
    useEffect(async ()=>{
        try{
          const res=await axios.get("/api/v1/ta/getTaDetails",{
            headers:{
              "Authorization":`Bearer ${token}`
            }
          });
        
        
      console.log('res',res)
      const {accepted,resolved,escalated,averageTime}=res.data.details;
      console.log(accepted+' '+resolved+' '+escalated+' '+averageTime)
      setAccepted(accepted);
      setEscalated(escalated);
      setResolved(resolved);
      setAvg(averageTime)
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
      <>
      <Row style={{margin:"1rem"}}>
                        <Col sm="12" >
                        <Card style={{backgroundColor:"#947847",color:"white",textAlign:"center"}}>

                            <CardHeader> <h1 className="display-3">Dashboard</h1></CardHeader>
                        </Card> 
                        </Col>
                    </Row>
     <Card style={{margin:"2rem",padding:"1rem",backgroundColor:"#edede4"}}>
       <Row>
         
         <Col sm="12">
            <Row>
                <Col sm="3">
                  <Card body style={{backgroundColor:"#dadbbd"}}>
                    <CardTitle>Doubts Accepted</CardTitle>
                    <CardText>{accepted}</CardText>
                    
                  </Card>
                </Col>
                <Col sm="3">
                  <Card body style={{backgroundColor:"#dadbbd"}}>
                    <CardTitle>Doubts Resolved </CardTitle>
                    <CardText>{resolved}</CardText>
                    
                  </Card>
                </Col>
                <Col sm="3">
                  <Card body style={{backgroundColor:"#dadbbd"}}>
                    <CardTitle>Doubts Escalated</CardTitle>
                    <CardText>{escalated}</CardText>
              
                  </Card>
                </Col>
                <Col sm="3">
                  <Card body style={{backgroundColor:"#dadbbd"}}>
                    <CardTitle>Average Time</CardTitle>
                    <CardText>{avg}</CardText>
                  </Card>
                </Col>
               </Row>
         </Col>
       </Row>
          
        </Card>
        
    <Card style={{margin:"2rem",padding:"1rem",backgroundColor:"#edede4"}}>
    <TaReport></TaReport>
    </Card>
    
    </>
     );
    }
}
 
export default TaDetails;