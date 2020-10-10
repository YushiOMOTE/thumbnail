import React from "react"
import {StaticQuery, graphql} from "gatsby"
import CopyToClipboard from "react-copy-to-clipboard"
import {Slide,ToastContainer,toast} from 'react-toastify';
import './toastify/ReactToastify.css';
import Switch from 'react-switch';
import SearchField from 'react-search-field';
import ReactToolTip from 'react-tooltip';

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


export default class Thambnail extends React.Component {
    constructor() {
        super();
        this.state = { large: true, keyword: "" };
        this.onSwitch = this.onSwitch.bind(this);
        this.onSearch = this.onSearch.bind(this);
    }

    onSwitch(large) {
        this.setState({ large })
    }

    onSearch(keyword, event) {
        console.log(keyword);
        this.setState({ keyword })
    }

    render() {
        var size = "";
        if (!this.state.large) {
            size = " =200x200"
        }

        return (
            <div>
                <label>
                    <span>small</span>
                    <Switch
                        onChange={this.onSwitch}
                        checked={this.state.large}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        onColor="#3498db"
                    />
                    <span>large</span>
                </label>
                <SearchField
                    placeholder="Search..."
                    onChange={this.onSearch}
                    onEnter={this.onSearch}
                    onSearchClick={this.onSearch}
                />
                <ReactToolTip delayShow={500}/>
                <StaticQuery
                    query={query}
                    render={data => (
                        <div>
                            {data.allFile.edges.filter(({node}, index) => {
                                if (this.state.keyword == "") {
                                    return true
                                } else {
                                    return node.relativePath.includes(this.state.keyword)
                                }
                            }).map(({node}, index) => (
                                <Image url={this.props.base + node.relativePath} base={node.base} size={size} />
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
            </div>
        )
    }
}

class Image extends React.Component {
    render() {
        var style = {
            width: "100px",
            height: "100px",
            backgroundImage: "url(" + this.props.url + ")",
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
                toast.info("Copied " + name, {autoClose: 2000});
            };
        }

        function onMouseOver(e) {
            e.currentTarget.style.border = "2px solid #008cba";
        }

        function onMouseOut(e) {
            e.currentTarget.style.border = "none";
        }

        var size = this.props.size || "";
        var markdown = "![](" + this.props.url + size + ")";
        return (
            <CopyToClipboard text={markdown} onCopy={onCopy(this.props.base)}>
                <button data-tip={this.props.base} style={style} onMouseOver={onMouseOver} onMouseOut={onMouseOut} />
            </CopyToClipboard>
        );
    }
}
