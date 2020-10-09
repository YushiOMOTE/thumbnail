import React from "react"
import {StaticQuery, graphql} from "gatsby"
import CopyToClipboard from "react-copy-to-clipboard"
import {Slide,ToastContainer,toast} from 'react-toastify';
import './toastify/ReactToastify.css';

function Image(props) {
    var style = {
        width: "100px",
        height: "100px",
        backgroundImage: "url(" + props.url + ")",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundColor: "transparent",
        borderRadius: "10%",
        border: "none",
        outline: "none",
    };

    function onCopy(name) {
        return () => {
            toast.info("Copied!", {autoClose: 2000});
        };
    }

    function onMouseOver(e) {
        e.currentTarget.style.border = "2px solid #008cba";
    }

    function onMouseOut(e) {
        e.currentTarget.style.border = "none";
    }

    var markdown = "![](" + props.url + ")";
    return (
        <CopyToClipboard text={markdown} onCopy={onCopy(props.base)}>
            <button style={style} onMouseOver={onMouseOver} onMouseOut={onMouseOut} />
        </CopyToClipboard>
    );
}

const query = graphql`
query {
  allFile {
    edges {
      node {
        base
        relativePath
      }
    }
  }
}`;

export default (props) => (
    <StaticQuery
        query={query}
        render={data => (
            <div>
                {data.allFile.edges.map(({node}, index) => (
                    <Image url={props.base + node.relativePath} base={node.base} />
                ))}
                <ToastContainer
                    transition={Slide}
                    position="top-right"
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </div>
        )}
    />
)
