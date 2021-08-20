
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Card,Input, Button,Row,Col,CardHeader, CardTitle, CardText } from 'reactstrap';
import { Redirect } from 'react-router';
import Comment from './Comment';
import moment from 'moment';

const AcceptedDoubt = (props) => {
    const {title,description,_id,createdBy,createdAt}=props.location.state.doubt;
    const {name}=createdBy;
    const [answer,setAnswer]=useState('');
    const history=useHistory();
    const token=localStorage.getItem('token');
    const [comments,setComments]=useState([])
    // fetch comments
    useEffect(async ()=>{
        try{
          const res=await axios.get("/api/v1/comment/getComment",{
            headers:{
              "Authorization":`Bearer ${token}`
            },
            params:{
                doubtId:_id
            }
          });
        
        
      console.log('res',res)
      setComments(res.data.comments)
        }
        catch(err)
        {
          console.log(err);
        }
          
       
    
        },[])

    // RESOLVE ANSWER HANDLER
    const onResolve=async (e)=>{
        try{
            const res2=await axios.post('/api/v1/doubt/addAnswer',{doubtId:_id,answer:answer},{
                headers:{
                  "Authorization":`Bearer ${token}`
                }
            })
            if(res2.data.status===200){
                const res=await axios.post('/api/v1/ta/resolve',{doubtId:_id,acceptedTime:localStorage.getItem('acceptedTime')},{
                    headers:{
                      "Authorization":`Bearer ${token}`
                    }
                })
    
                if(res.data.status===200)
                {
            
                    history.push('/doubtPage');
                }
                else{
                    alert(res.data.message);
                }
            }
            else{
                alert(res2.data.message);
            }
            
        }
        catch(err){
            console.log(err);
            alert(err);
        }
        
    }
     // ESCALATE HANDLER
    const onEscalate=async (e)=>{
        try{
            const res=await axios.post('/api/v1/ta/escalate',{doubtId:_id,acceptedTime:localStorage.getItem('acceptedTime')},{
                headers:{
                  "Authorization":`Bearer ${token}`
                }
            })
            alert(res.data.message);
            if(res.data.status===200)
            {
                
                history.push('/doubtPage');
            }
        }
        catch(err)
        {
            console.log(err);
            alert(err);
        }
        

    }

    if(!localStorage.getItem('token'))
        {
            return (<Redirect to="/signin"/>)
        }
        else{
    return ( 
    <div>
        <Row style={{margin:"1rem"}}>
            <Col sm="12" >
            <Card style={{backgroundColor:"#7d3631",color:"white"}}>

                <CardHeader> <h1 className="display-3">SOLVE DOUBT</h1></CardHeader>
            </Card> 
            </Col>
        </Row>
        <Row>
            <Col sm="6" md={{ size: 6, offset: 1 }}>
            <Card style={{padding:'2rem',backgroundColor:"#e8e4e3"}} >
            
            <Row>
                <Col sm="10"><CardTitle tag="h5">{title}</CardTitle></Col>
                
                {/* <Col sm="2"> {resolved?<button class="btn btn-success" disabled>Resolved</button>:(escalated?<button disabled class="btn btn-warning">Escalated</button>:<button class="btn btn-primary" disabled>Active</button>)} </Col> */}
            </Row>
           
            <CardText>{description}</CardText>
           
            
            <Row>
            <Col sm="4"></Col>
            <Col> <small className="text-muted">Posted By : {name} on {moment(createdAt).format("LLLL")}</small></Col>

            </Row>
            <hr></hr>
            <Card style={{padding:"1rem"}}>
                <b>{comments.length} comments</b>
                {comments.length===0?<div> <i>No Comments!</i></div>:(comments.map(comment=>{
                    return(
                        
                       
                            <Comment comment={comment} changeComments={setComments}></Comment>
                       
                        
                        
                    )
                }))}
           
        </Card>
            
            </Card>
            </Col>


            {/* -------------- */}
            <Col sm="4">
            
            <Card style={{padding:'1rem',backgroundColor:"#e8e4e3"}}>
            <Row>
                <Col sm="11">
                <Input type="text" placeholder="Write your answer!" onChange={(e)=>{setAnswer(e.target.value)}}></Input>
                </Col>
            </Row>
            <Row style={{margin:"1rem"}}>
                <Col sm="9">
                </Col>
                <Col>
                    <Button class="btn btn-success" onClick={onResolve}>Resolve</Button>
                </Col>
            </Row>
            </Card>
            <Row style={{margin:"1rem"}}>
                <Col sm="9"></Col>
                <Col><Button class="btn btn-warning" onClick={onEscalate}>Escalate</Button></Col>
            </Row>
        
       
        
     
            </Col>
        </Row>
      
     
    </div> );
        }
}
 
export default AcceptedDoubt;