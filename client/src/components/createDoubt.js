import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button,Form, FormGroup, Label, Input,Row,Col} from 'reactstrap';
import { Redirect } from "react-router";

const CreateDoubt = (props) => {

    const [title,setTitle]=useState('');
    const [description,setDescription]=useState('');
    const token=localStorage.getItem('token');
    const history=useHistory();
    const handleSubmit=async ()=>{
        const res=await axios.post('/api/v1/doubt/create',{title:title,description:description},{
            headers:{
                "Authorization":`Bearer ${token}`
              
                
            }
        })
        alert(res.data.message);
        if(res.data.status===200)
        {
            history.push('/student/home')
        }
    }
    if(!localStorage.getItem('token'))
        {
            return (<Redirect to="/signin"/>)
        }
        else{
            return (

                <Form style={{margin:"5vw 10vw",border:"2px solid black",padding:"2vw",backgroundColor:"rgba(6, 4, 15, 0.32)",color:"white",borderRadius:"12px"}}>
                    <h2 style={{textAlign:"center",padding:"1vw",borderRadius:"12px",marginBottom:"2vw",backgroundColor:"rgba(7, 4, 3, 0.7)"}}>Create Doubt</h2>
                <FormGroup row style={{margin:"1rem"}}>
                <Label for="Name" sm={2}>Title</Label>
                <Col sm={10}>
                  <Input type="name" name="name" onChange={(e)=>setTitle(e.target.value)} placeholder="Enter Title" />
                </Col>
              </FormGroup>
              <FormGroup row style={{margin:"1rem"}}>
                <Label for="exampleEmail" sm={2}>Description</Label>
                <Col sm={10}>
                  <Input type="email" name="email" onChange={(e)=>setDescription(e.target.value)} placeholder="Describe your doubt " />
                </Col>
              </FormGroup>
             
              <FormGroup row>
                
              </FormGroup>
              <FormGroup check row >
                <Col sm={{ size: 10, offset: 5 }}>
                  <Button onClick={handleSubmit}>Raise Doubt</Button>
                </Col>
              </FormGroup>
              </Form>  

            
              );
        }
    
}
 
export default CreateDoubt;




 