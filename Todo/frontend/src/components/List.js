import React, {useEffect, useState} from "react";
import Todo from './Todo';
import "../styles.css"

export default function List(props){
    const [titles, setTitles] = useState([]);
    const [message, setMessage] = useState("Loading");
    const [loaded, setLoaded] = useState(false);
    const [empty, setEmpty] = useState(true);

    const fetching = async function() {
      fetch("todo/titles")
        .then(response => {
          if (response.status > 400){
            return this.setState(() => {
              return {
                message: "Something went wrong"
              };
            });
          }
          console.log(response);
          return response.json();
        })
        .then(data => {
          setTitles(data);
          setLoaded(true);
          setEmpty(data.data?.length == 0);
          return;
        })
      }


    const getInfo = async function(){
      await fetching();
    }

    //add async and await to this
    useEffect(() => {
        getInfo();
      }
    )

    const submitStyle = {
      right: "10px",
      width: "12.5%",
      right: "150px",
      border: "none",
      outline: "none",
      fontSize: "18px",
      borderRadius: "40px",
      textAlign: "center",
      boxShadow: "0 6px 20px -5px rgba(0,0,0,0.4)",
      position: "absolute",
      overflow: "hidden",
    } 

    const padd = {
      padding: "5px",
      position: "relative",
    }

    return(
      <div>
        {loaded ? 
        (titles.data.map(todo => 
          <Todo data={todo} getInfo={getInfo}></Todo>
        )) : message}
        {empty? 
          <div>
            <label class="emptyStyle">List is Currently Empty</label>
          </div>:
          <div style={padd}>
            <button className="form-control" style={submitStyle}>Save</button> 
          </div>
        }
        
      </div>
      
    )

    
}
