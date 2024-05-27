import React, { IframeHTMLAttributes, useRef } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useParams } from "react-router-dom";

function Pci() {
  const [show, setShow] = useState<boolean>(false);
  const [iframeUrl, setIframeUrl] = useState<string>("");
  const [attachEvent, setAttachEvent] = useState<boolean>(false);

  const iframeRef = useRef<HTMLIFrameElement>(null);

  const onLoadFun = (params: any) => {
    // params.target?.postMessage("validate", ()=>{console.log("validation");
    // })
    console.log("target is:");
    
    console.log(params.target);
    
    console.log("attached event");
    const handleValidateMessageFromPciBooking = (event: any) => {
      // Example: Log the message data
      console.log("DEBUG: ");
      console.log("Received message:", event);
      console.log("Received message:", event.data);
    };

    window.addEventListener("message", handleValidateMessageFromPciBooking);
    //@ts-ignore
    console.log(window.receiver);

    return () => {
      window.removeEventListener(
        "message",
        handleValidateMessageFromPciBooking
      );
    };
  };

  useEffect(() => {
    const handleValidateMessageFromPciBooking = (event: any) => {
      // Example: Log the message data
      console.log("DEBUG: ");
      console.log("Received message:", event);
      console.log("Received message:", event.data);
    };

    if (attachEvent){
      console.log("attached");
      
      window.addEventListener("message", handleValidateMessageFromPciBooking);

    }
    else{
      console.log("detached");
      window.removeEventListener("message", handleValidateMessageFromPciBooking);

    }
  }, [attachEvent]);

  return (
    <>
      <div className="m-2 p-2 text-center" style={{ height: "100vh" }}>
        <div className="grid">
          <div className="col-10">
            <InputText
            placeholder="Entrer iframe URL"
            style={{width:"100%"}}
            value={iframeUrl}
            className="m-1"
            onChange={(e) => setIframeUrl(e.target.value)}
          ></InputText>
          </div>
          <div className="col-2">
            <Button
              label="Hit"
              className="m-1"
              onClick={() => {
                setShow(true);
              }}
            ></Button>
            <Button
              label="Attach Event"
              className="m-1"
              onClick={() => {
                setAttachEvent((prev)=>!prev);
              }}
            ></Button>
          </div>
        </div>

        

        <h1>PCI Demo</h1>
        {
          show &&
          <iframe
          ref={iframeRef}
          onLoad={onLoadFun}
          width="100%"
          height="100%"
          src={iframeUrl}
          title="Get Token"
        ></iframe>}

        <Button className="m-2" label="Validate" onClick={()=>{iframeRef?.current?.contentWindow?.postMessage("validate", 'https://service.pcibooking.net/')}}></Button>
        <Button className="m-2" label="Submit" onClick={()=>{iframeRef?.current?.contentWindow?.postMessage("submit", 'https://service.pcibooking.net/')}}></Button>
      </div>
    </>
  );
}

export default Pci;
// https://service.pcibooking.net/api/payments/capturecard?sessionToken=4bb5c71cc9734f59864e00c2eeda8c91&brand=PCIB&cvv=True&autoDetectCardType=True&showOwnerId=False&submitWithPostMessage=true&Success=http://localhost:3000/?cardToken=%7BcardToken%7D