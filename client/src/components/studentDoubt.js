import axios from 'axios';
import { useState,useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { Card, Row, Button, CardTitle, CardText,Col,Input } from 'reactstrap';
import Comment from './Comment'
import moment from 'moment';

const StudentDoubt = (props) => {
    const {description,title,createdBy,_id,answer,resolved,escalated,answeredBy,createdAt}=props.doubt;
    const {name}=createdBy;
    const [comments,setComments]=useState([])
    const [newComment,setNewComment]=useState('')
    const token=localStorage.getItem('token')
    let history=useHistory();
    console.log('id',_id);

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

     const onComment=async (e)=>{
        e.preventDefault();
        try{
            const res=await axios.post('/api/v1/comment/addComment',{doubtId:_id,description:newComment},{
                headers:{
                  "Authorization":`Bearer ${token}`
                }
             })
             console.log('res',res);
             if(res.data.status===200)
             {
                try{
                    const res=await axios.get("/api/v1/comment/getComment",{
                      headers:{
                        "Authorization":`Bearer ${token}`
                      },
                      params:{
                          doubtId:_id
                      }
                    });
                  
                  
                console.log('again comments call',res)
                setComments(res.data.comments)
                  }
                  catch(err)
                  {
                    console.log(err);
                  }
                    
             }
             else{
                 alert(res.data.message);
             }
             
             
        }
        catch(err){
            console.log(err);
        }
        
        
         

    }
    return ( 
        <>
        
    <Row style={{margin:'1rem'}}>
        <Col sm="12" md={{ size: 8, offset: 2 }} >
            <Card style={{padding:'2rem',backgroundColor:'#f2d8d0'}}>
            
            <Row>
                <Col sm="10"><CardTitle tag="h5">{title}</CardTitle></Col>
                
                <Col sm="2"> {resolved?<button class="btn btn-success" disabled>Resolved</button>:(escalated?<button disabled class="btn btn-warning">Escalated</button>:<button class="btn btn-primary" disabled>Active</button>)} </Col>
            </Row>
           
            <CardText>{description}</CardText>
            {answer!=""?<div>
                <CardText>Answer: {answer}</CardText>
                <Row>
                    <small className="text-muted">Answered By: {answeredBy}</small>
                </Row>
            </div>
            :<CardText>Answer: No Answer Yet!</CardText>}
            
            <Row>
            <Col sm="6"></Col>
            <Col> <small className="text-muted">Posted By : {name} on {moment(createdAt).format("LLLL")}</small></Col>
            </Row>
            <hr></hr>
            <Card style={{padding:"1rem",backgroundColor:"#c48e7e"}}>
                <b>{comments.length} comments</b>
                {comments.length===0?<div> <i>Be the first one to comment !</i></div>:(comments.map(comment=>{
                    return(
                        
                       
                            <Comment comment={comment} changeComments={setComments}></Comment>
                       
                        
                        
                    )
                }))}
            <Row style={{margin:"0.5rem"}}>
                <Col sm="10"><Input type="text" placeholder="Write your comment!" onChange={(e)=>{setNewComment(e.target.value)}}></Input></Col>
            <Col sm="2"> <Button onClick={onComment}>Comment</Button></Col>
        
       

            </Row>
            
            </Card>
            </Card>
        </Col>
    </Row>
        
   </>
    );
}
 
export default StudentDoubt;