import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

export default function Welcome() {
    const setTitle = useOutletContext();

    useEffect(()=>{
        setTitle('Page Title');
    },[])

    return (
        <div style={{height:"1200px"}}>Welcome page</div>
    )
}