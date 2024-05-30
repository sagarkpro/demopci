import React, { useRef } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { InputTextarea } from 'primereact/inputtextarea';

interface IframeResp{
  sessionId: string,
  url: string,
  iFrameUrl: string
}

function Pci() {
  const [iFrameResp, setIframeResp] = useState<IframeResp>();
  const [accountId, setAccountId] = useState<string>("zentrum-demo-account");
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

  const getIframeURL = async()=>{
    try{
      const resp = await axios.get('https://dev.api.zentrumhub.com/api/hotel/book/pci/getToken/', {headers:{accountId: accountId}});
      if(resp.status === 200){
        let iframe: IframeResp = {
          url: resp.data.url,
          sessionId: resp.data.sessionId,
          iFrameUrl: resp.data.iFrameUrl
        }
        setIframeResp(iframe);
      }
    }
    catch(ex){
      console.log("ERROR fetching iframe");
      console.log(ex);
    }
  }

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
          
            <div className="col-6 text-right">
              <InputText placeholder="Enter AccountId" value={accountId} onChange={(e)=>{setAccountId(e.target.value)}}></InputText>
            </div>
            <div className="col-6 text-left">
              <Button label="Get Iframe URL" onClick={getIframeURL}></Button>
            </div>
          
            <div className="col-12 text-center">
            <h3>iFrameUrl: <a href={iFrameResp?.iFrameUrl}>{iFrameResp?.iFrameUrl}</a></h3>
              <h3>PCI URL: <a href={iFrameResp?.url}>{iFrameResp?.url}</a></h3>
              <h3>SessionId: <a href={iFrameResp?.sessionId}>{iFrameResp?.sessionId}</a></h3>
            </div>
          
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
          className="p-2"
          ref={iframeRef}
          onLoad={onLoadFun}
          width="100%"
          height="100%"
          src={iframeUrl}
          title="Get Token"
        ></iframe>}

        <Button className="m-2" label="Validate" onClick={()=>{iframeRef?.current?.contentWindow?.postMessage("validate", "https://pci.channex.io")}}></Button>
        <Button className="m-2" label="Submit" onClick={()=>{iframeRef?.current?.contentWindow?.postMessage("submit", "https://pci.channex.io")}}></Button>
      </div>
    </>
  );
}

export default Pci;
// https://service.pcibooking.net/api/payments/capturecard?sessionToken=4bb5c71cc9734f59864e00c2eeda8c91&brand=PCIB&cvv=True&autoDetectCardType=True&showOwnerId=False&submitWithPostMessage=true&Success=http://localhost:3000/?cardToken=%7BcardToken%7D