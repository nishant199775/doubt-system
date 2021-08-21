import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Card, Row, Button, CardTitle, CardHeader,Col } from 'reactstrap';

const Doubt = (props) => {
    const {description,title,createdBy,_id,answer,resolved,escalated}=props.doubt;
    const {name}=createdBy;
    const token=localStorage.getItem('token')
    let history=useHistory();
    console.log('id',_id);
     const handleAccept=async (e)=>{
        e.preventDefault();
        try{
            const res=await axios.get('/api/v1/ta/takeDoubt',{
                headers:{
                  "Authorization":`Bearer ${token}`
                },
                params:{
                    id:_id
                }
             })
             console.log('res',res);
             if(res.data.status===200)
             {
                 localStorage.setItem('acceptedTime',res.data.acceptedTime);
                history.push({
                    pathname:'/acceptedDoubt',
                    state:{doubt:props.doubt}
                  });
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
    <Row>
    <Col sm="12" md={{ size: 9, offset: 1 }}>
        
        </Col>
    </Row>
    <Row style={{margin:'1rem'}}>
        <Col sm="12" md={{ size: 10, offset: 1 }}>
            <Card style={{padding:'1rem'}}>
                <Row>
                    <Col sm="10">
                    <CardTitle tag="h5">{title}</CardTitle>
                    </Col>
                    <Col sm="2">
                    <Button class="btn btn-primary" onClick={handleAccept} id={_id}>Accept</Button>
                    </Col>
                </Row>
            </Card>
        </Col>
    </Row>
        </>
   
    );
}
 
export default Doubt;