import React, {useEffect, useState} from "react";
import {
    Navigate,
    Link,
    useNavigate
} from "react-router-dom";
import getCookie from "./GetCookie"

function AddPage(props){
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("2021-11-21T02:00:18Z");
    const [completed, setCompleted] = useState(false);
    const [errorMessage, setError] = useState("No Error");
    const [nextId, setId] = useState(0);

    const inputStyle = {
        padding: "10px",
        fontSize: "22",
        width: "50%",
        backgroundColor: "#f5f5f5",
        margin: "0 auto",
    }

    const padd = {
        paddingBottom: "5px",
    }

    const submitStyle = {
        position: "absolute",
        left: "200px",
        width: "12.5%",
        height: "50%",
        border: "none",
        outline: "none",
        background: "#2f2f2f",
        color: "#fff",
        fontSize: "20px",
        borderRadius: "40px",
        textAlign: "center",
        boxShadow: "0 6px 20px -5px rgba(0,0,0,0.4)",
        position: "relative",
        overflow: "hidden",
    }

    // useEffect(() => {
    //     fetch("todo/titles")
    //         .then(response => {
    //             if (response > 400){
    //                 return setError("Something went wrong");
                    
    //             }
    //             return response.json();
    //         })
    //         .then(data => {
    //             console.log(data.data.at(-1)["id"] + 1);
    //             // return setId(data.le + 1);
    //         })
    // });

    const translateDate = function(date){
        var year = "";
        var month = "";
        var day = "";
        for (var i = 0; i < 2; i++){
            month += date[i];
        }
        for (var i = 3; i < 5; i++){
            day += date[i];
        }
        for (var i = 6; i < 10; i++){
            year += date[i];
        }
        return year + "-" + month + "-" + day + "T00:00:00Z"
    }

    const addTodo = async function(event) {
        var csrftoken = getCookie("csrftoken");
        return fetch("/todo/titles", {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken' : csrftoken,
            },
            body: JSON.stringify({
                id: nextId,
                title: event.target.title.value,
                description: event.target.description.value,
                dueDate: dueDate,
                completed: completed,
            })

        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                return data
            })
            .catch(error => console.log(error));
    }

    const history = useNavigate()
    const handleSubmit = async function(event){
        event.preventDefault();
        console.log(event.target.title.value);
        setTitle(event.target.title.value);
        console.log(title);
        setDescription(event.target.description.value);
        setDueDate(translateDate(event.target.dueDate.value));
        const json = await addTodo(event);
        history("/List");
    }
    // Figure out how post request works and why it doesnt work for addpage but works for Todo
    return (
        <div>
            
            <form onSubmit={handleSubmit}>
                <div style={padd}>
                    <input style={inputStyle} name="title" class="form-control" type="text" placeholder="Title"/>
                </div>
                <div style={padd}>
                    <input style={inputStyle} name="description" class="form-control" type="text" placeholder="Description"/>
                </div>
                <div style={padd}>
                    <input style={inputStyle} name="dueDate" class="form-control" type="text" placeholder="Due Date (MM/DD/YYYY)"/>
                </div>
                <input style={submitStyle} type="submit" value="Submit"></input>
            </form>
        </div>
    )
}

export default AddPage;