import React, { useState, useEffect } from "react"
import axios from "axios"
import { unpackRules } from "@casl/ability/extra"
import { Ability }  from "@casl/ability"
import { Can } from "../helpers/Can"
import { AbilityContext } from "../helpers/Can"

// defines the ability rules here, the rules can be developed on client side or the server side
// but I feel the rules/abilty shouild come from the server side and client side make use of the rules to defines the roles of user

const BlogPost = ({ children }) => {
    return (<div>
        <p>{children}</p>
    </div>)
}

const EditButton = ({changeBlog}) => {
    return (<button onClick={() => changeBlog("This change is made by an admin")} >
        Change
    </button>)
}



export const ServerApp = function(props) {
    const [blog, setBlog] = useState("This is for everyone");

    const ability = new Ability()

    useEffect(async () => {
        async function getPackedRules() {
            // NORMAL USER
            // const { data } = await axios.get("http://localhost:8000/normal")
            
            // ADMIN USER
            const { data } = await axios.get("http://localhost:8000/admin")
            const unpackedRules = unpackRules(data)
            ability.update(unpackedRules)
        }

        getPackedRules()
    }, [])


    return (<div>
        <h1>Server side Side</h1>

        <AbilityContext.Provider value={ability}>
            <Can do="read" this="Blog" >
                <BlogPost>{blog}</BlogPost>
            </Can>
            <Can do="update" this="Blog" >
                <EditButton changeBlog={setBlog}></EditButton>
            </Can>
        </AbilityContext.Provider> 
    </div>)
}