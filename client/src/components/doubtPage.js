import { Col,Card,CardHeader,Row } from "reactstrap"
import { useState,useEffect } from "react";
import axios from "axios";
import Doubt from './doubt'
import { Redirect } from "react-router";

const DoubtPage = (props) => {
    const token=localStorage.getItem('token');
    const [doubts,setDoubts]=useState([])
    useEffect(async ()=>{
        try{
          const res=await axios.get("/api/v1/doubt/getDoubts",{
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
       
                <div style={{margin:'2rem'}}>
                    <Row style={{margin:"1rem"}}>
                        <Col sm="12" >
                        <Card style={{backgroundColor:"#7d3631",color:"white",textAlign:"center"}}>

                            <CardHeader> <h1 className="display-3">Solve Doubts</h1></CardHeader>
                        </Card> 
                        </Col>
                    </Row>
                    
                        {
                            doubts.length===0?<Row>
                            <Col sm="12" md={{ size: 10, offset: 1 }}><CardHeader> <h1 className="display-4">No Doubts Posted!</h1></CardHeader>
                            </Col></Row>:(doubts.map(doubt=>{
                                return <Doubt doubt={doubt}></Doubt>
                            }))
                            
                        }
                        
                    
                </div>
            
        );
        }

    
}
 
export default DoubtPage;