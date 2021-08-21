import {
    Card, CardHeader,Jumbotron, CardText,Row ,Col , CardBody, CardLink,
    CardTitle, CardDeck
  } from 'reactstrap';
const Home = () => {
    return (  <>

                    <Row style={{margin:"1rem"}}>
                        <Col sm="10" md={{offset:1}} >
                        <Card style={{backgroundColor:"#7d3631",color:"white",textAlign:"center"}}>

                            <CardHeader> <h1 className="display-3">Home</h1></CardHeader>
                        </Card> 
                        </Col>
                        
                    </Row>
        <hr  className="my-2" /> 
       <div>
       <Jumbotron style={{backgroundColor:"rgb(113 113 109)"}}>
         <h1 className="display-3 text-center">FEATURES</h1>
         <p className="lead text-center">Exciting Experience of Solving Doubt Ahead!</p>
         <hr className="my-2" />
         
       
     
     <Row style={{margin:"1rem"}}>
     <CardDeck >
         
         
         <Card style={{backgroundColor:"rgba(12, 5, 4, 0.5)",color:"white",margin:"1rem"}}>
          
           <CardBody>
             <CardTitle className="display-4 text-center">Raise Doubt</CardTitle>
             <CardText className="my-2">Here Students can publish their doubts on the portal. All these doubts are visible to all the TA's. 
             Hence it can be solved by the TA's. Students can also comment on each other's doubts.  </CardText>
           </CardBody>
         </Card>
         
         
         <Card style={{backgroundColor:"rgba(12, 5, 4, 0.5)",color:"white",margin:"1rem"}}>
           
           <CardBody >
             <CardTitle className="display-4 text-center">Solve</CardTitle>
             <CardText>Teaching Assistant can see all the posted doubts and can accept the doubt. Accepted doubt can then be answered by the TA
                 or can be Escalated by the TA.
             </CardText>
           </CardBody>
         </Card>
         
         
         <Card style={{backgroundColor:"rgba(12, 5, 4, 0.5)",color:"white",margin:"1rem"}}>
           
           <CardBody>
             <CardTitle className="display-4 text-center">TRACK</CardTitle>
             <CardText>Here both Student and TA can track their details like how many doubts they have accpeted,
                 how many doubts resolved, how much time they have given.Ta's can also see reports of other TA's.
             </CardText>
           </CardBody>
         </Card>
        
         
       </CardDeck>
       </Row>
       </Jumbotron>
       </div>
       
       </>);
}
 
export default Home;