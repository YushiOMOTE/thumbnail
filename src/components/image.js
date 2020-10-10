import React from "react"
import {StaticQuery, graphql} from "gatsby"
import CopyToClipboard from "react-copy-to-clipboard"
import {Slide,ToastContainer,toast} from 'react-toastify';
import './toastify/ReactToastify.css';

import ReactToolTip from 'react-tooltip';

import Switch from '@material-ui/core/Switch';
import Pagination from '@material-ui/lab/Pagination';
import Grid from '@material-ui/core/Grid';

import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

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
        this.pageSize = 500;
        this.state = { large: true, keyword: "", page: 1 };
        this.onSwitch = this.onSwitch.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.onClickSearch = this.onClickSearch.bind(this);
        this.onPageChange = this.onPageChange.bind(this);
    }

    onSwitch(event) {
        this.setState({ large: event.target.checked })
    }

    onSearch(event) {
        this.setState({ keyword: event.target.value, page: 1 })
    }

    onClickSearch() {
        this.setState({ page: 1 })
    }

    onPageChange(event, page) {
        console.log(page);
        this.setState({ page })
    }

    render() {
        var size = "";
        if (!this.state.large) {
            size = " =200x200"
        }

        return (
            <div style={{width: "100%"}}>
                <StaticQuery
                    query={query}
                    render={data => {
                        var items = data.allFile.edges.filter(({node}, index) => {
                            if (this.state.keyword === "") {
                                return true
                            } else {
                                return node.relativePath.includes(this.state.keyword)
                            }
                        });
                        var pages = Math.floor(items.length / this.pageSize);
                        var page = Math.max(Math.min(this.state.page, pages + 1), 1);
                        var index_min = (page - 1) * this.pageSize;
                        var index_max = page * this.pageSize - 1;

                        return (
                            <div>
                                <Grid container component="label" spacing={1} alignItems="center">
                                    <Grid item>Small</Grid>
                                    <Grid item><Switch checked={this.state.large} onChange={this.onSwitch} color="primary" /></Grid>
                                    <Grid item>Large</Grid>
                                </Grid>

                                <Paper style={{padding: '2px 4px', display: 'flex', alignItems: 'center', width: 400}}>
                                    <InputBase
                                        style={{merginLeft: 1, flex: 1}}
                                        placeHolder="Search"
                                        inputProps={{'aria-label': "Search"}}
                                        onChange={this.onSearch}
                                    />
                                    <Divider style={{height: 28, margin: 4}} orientation="vertical" />
                                    <IconButton style={{padding: 10}} type="submit" aria-label="search" onClick={this.onClickSearch}>
                                        <SearchIcon />
                                    </IconButton>
                                </Paper>

                                <Pagination style={{margin: "10px"}} count={pages} page={page} variant="outlined" color="primary" onChange={this.onPageChange} />

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

                                {items.filter(({node}, index) => {
                                    if (index >= index_min && index <= index_max) {
                                        return true;
                                    } else {
                                        return false;
                                    }
                                }).map(({node}, index) => (
                                    <Image url={this.props.base + node.relativePath} base={node.base} size={size} />
                                ))}

                                <ReactToolTip delayShow={500}/>
                            </div>
                        )
                    }}
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
