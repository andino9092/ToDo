import React, {useState} from "react";
import getCookie from "./GetCookie"
import { Link } from "react-router-dom";

export default function Todo(props){
    
    const [complete, setCompleted] = useState(props.data.completed);
    const [title, setTitle] = useState(props.data.title);
    const [dueDate, setDueDate] = useState(props.data.dueDate);
    const [description, setDescription] = useState(props.data.description);
    const [deleted, setDeleted] = useState(false);

    const completeStyle = {
        textDecoration: "line-through",
        border: "None",
        backgroundColor: "transparent",
    }

    const padd = {
        paddingBottom: "5px",
    }

    const inputStyle = {
        padding: "10px",
        fontSize: "22",
        width: "30%",
        backgroundColor: "#f5f5f5",
        margin: "0 auto",
    }

    const iconStyle = {
        border: "None",
        backgroundColor: "transparent",
        margin: "0 auto",
        size: "50%",
        width: "50%",
    }

    const handleChange = function(){
        var csrftoken = getCookie('csrftoken');
        setCompleted(!complete);
        fetch("/todo/titles", {
            credentials: 'include',
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            body: JSON.stringify({
                id: props.data.id,
                title: title,
                description: description,
                dueDate: dueDate,
                completed: !complete,
            }),
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.log(error));
    }

    const del = async function(){
        var csrftoken = getCookie('csrftoken');
        return fetch("/todo/titles/" + props.data.id, {
            credentials: 'include',
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken
            },
        })
            .then(response => response.json)
            .then(responsejson => {return responsejson});
    }

    const handleDelete = async function(){
        const json = await del();
        setDeleted(true);
        props.getInfo();
    }

    const spanStyle = {
        display: "flex",
        flexDirection: "row", 
        justifyContent: "flex-end",
        width: "25%",
    }
    

    if (deleted){
        return "";
    }
    return (
        <div> 
            <div style={complete ? completeStyle : {}}>
                <div style={padd}>
                    <input style={inputStyle} class="form-control" type="text" defaultValue={title} readOnly={complete}/>
                </div>
                <div style={padd}>
                    <input style={inputStyle} class="form-control" type="text" defaultValue={description} readOnly={complete}/>
                </div>
                <div style={padd}>
                    <input style={inputStyle} class="form-control" type="text" defaultValue={dueDate} readOnly={complete}/>
                </div>
                <div class="container" style={spanStyle}>
                    <input type="checkbox" style={iconStyle} class="form-control" defaultChecked={complete} onClick={handleChange}></input> 
                    <button style={iconStyle} class="form-control" onClick={handleDelete}><i class="fa fa-trash"></i></button>
                </div>
                
            </div>
            {/* <Link 
                to={{
                    pathname: "/edit",
                }}
                state={{
                    id: props.data.id,
                    title: title,
                    description: description,
                    dueDate: dueDate,
                }}
            >
                <button style={iconStyle}><i class="fa fa-edit"></i></button>
            </Link> */}
        </div>
        

    )
}
