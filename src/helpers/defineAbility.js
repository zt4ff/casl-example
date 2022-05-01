import { defineAbility } from "@casl/ability";


export default function (user)  {
    return defineAbility((can, cannot) => {
        can("read", "Blog")


        // do some check based on the user given from the server 
        if (user.role == "admin") {
            can("manage", "all")
        }
    })
}