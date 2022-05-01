import * as ReactDOM from "react-dom/client";
import { ClientApp } from "./components/ClientApp";
import { ServerApp } from "./components/ServerApp";


const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(<>
    <ClientApp />
    <ServerApp />
</>)