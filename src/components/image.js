import React from "react"
import CopyToClipboard from "react-copy-to-clipboard"
import {NotificationContainer,NotificationManager} from 'react-notifications';

export default function Image(props) {
    var style = {
        width: "100px",
        height: "100px",
        backgroundImage: "url(" + props.url + ")",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundColor: "transparent",
        border: "0",
    };

    function onCopy(url) {
        return () => {
            console.log("copied");
            NotificationManager.info(url.replace(/^.*[\\\/]/, ''), "Copied!", 10000);
        };
    }

    var markdown = "![](" + props.url + ")";
    return (
        <CopyToClipboard text={markdown} onCopy={onCopy(props.url)}>
            <button style={style} />
        </CopyToClipboard>
    );
}
