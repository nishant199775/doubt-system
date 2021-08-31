import { useEffect, useState } from "react";
import { Row,Col,CardHeader,Card } from "reactstrap";
import AcceptedDoubt from "./acceptedDoubt";
import axios from "axios";
import {Redirect} from 'react-router-dom';

const Unresolved = (props) => {

    const [doubts,setDoubts]=useState([]);
    const token=localStorage.getItem('token');
    useEffect(async ()=>{
       const doubts=await axios.get('/api/v1/ta/getUnresolvedDoubt',{
        headers:{
          "Authorization":`Bearer ${token}`
        }});
        console.log('doubts',doubts);
        setDoubts(doubts.data.doubts)
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
                            <Card style={{backgroundColor:"#7d3631",color:"white"}}>

                                <CardHeader> <h1 className="display-3">UNRESOLVED DOUBT</h1></CardHeader>
                            </Card> 
                            </Col>
                        </Row>

                        
                            {
                                doubts.length===0?<Row>
                                <Col sm="12" md={{ size: 10, offset: 1 }}><CardHeader> <h1 className="display-4">No Doubts Unresolved!</h1></CardHeader>
                                </Col></Row>:(
                                doubts.map((doubt)=>{
                                    return(
                                        <div>
                                            <AcceptedDoubt doubt={doubt} ></AcceptedDoubt>
                                        </div>
                                    )
                                
                                }))
                                
                            }
                        
                    </>
                );
            }
}
 
export default Unresolved;