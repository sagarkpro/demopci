import { useEffect } from "react";
import { useParams } from "react-router-dom";

function Token() {
    let {cardToken} = useParams<{cardToken: string}>();
        
    useEffect(()=>{
        console.log("card token is:");
        console.log(cardToken);
        
    },[])

    return ( 
        <>
            <div className="m-2 p-2 text-center">
                <h2>
                    Your Token is: {cardToken?.substring(62)}
                </h2>
                <a href={cardToken}><h3>Full URL: {cardToken}</h3></a>
            </div>
        </>
     );
}

export default Token;