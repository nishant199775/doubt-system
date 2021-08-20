import { CardText,Card } from "reactstrap";

const Comment = (props) => {
    const {User,description}=props.comment;
    return ( 
        <Card style={{margin:"0.5rem",padding:"1rem",backgroundColor:"#d1cfcf"}}>
           
            <CardText>{User.name} : {description}</CardText>
            
        </Card>
        
     );
}
 
export default Comment;