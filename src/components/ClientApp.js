import React, { useState } from "react"
import { Can } from "../helpers/Can"
import { AbilityContext } from "../helpers/Can"
import defineAbility from "../helpers/defineAbility"


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

export const ClientApp = function(props) {
    const [blog, setBlog] = useState("This is for everyone");

    // assuming the user object comes from the server, we will define the ability and pass it to the provider
    // NORMAL USER
    const user = {}

    // ADMIN USER
    // const user = {role: "admin"}

    const ability = defineAbility(user)

    return (<div>
        <h1>Client side Side</h1>
        
        <AbilityContext.Provider value={ability}>
            <Can do="read" this="Blog" >
                <BlogPost>{blog}</BlogPost>
            </Can>
            <Can do="update" this="Blog" >
                <EditButton changeBlog={setBlog} ></EditButton>
            </Can>
        </AbilityContext.Provider>
    </div>)
}