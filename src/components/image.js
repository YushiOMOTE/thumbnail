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
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

function parse_regex(user_regex) {
    if (user_regex === undefined) {
        return undefined;
    }
    var flags = user_regex.replace(/.*\/([gimy]*)$/, '$1');
    var pattern = user_regex.replace(new RegExp('^/(.*?)/'+flags+'$'), '$1');
    return new RegExp(pattern, flags);
}

function get_replacer(pattern, replace) {
    return {
        regex: parse_regex(pattern) || /(.*)/,
        replace: replace || "![]($1)"
    }
}

const query = graphql`
query {
  allStamp {
    edges {
      node {
        attr
        filename
        relativePath
      }
    }
  }
}`;

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

const SortMode = Object.freeze({ name: '1', lastused: '2', random: '3' });

export default class Thambnail extends React.Component {
    constructor() {
        super();

        this.defaultPageSize = 200;
        this.defaultSortMode = SortMode.name;
        this.state = { large: true, keyword: "", page: 1, pageSize: this.defaultPageSize, sortMode: this.defaultSortMode, shuffled: [] };
        this.onSwitch = this.onSwitch.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.onClickSearch = this.onClickSearch.bind(this);
        this.onPageChange = this.onPageChange.bind(this);
        this.onChangePageSize = this.onChangePageSize.bind(this);
        this.onChangeSortMode = this.onChangeSortMode.bind(this);
        this.onClickShuffle = this.onClickShuffle.bind(this);
    }

    componentDidMount() {
        this.defaultPageSize = 200;
        this.defaultSortMode = SortMode.name;
        var pageSize = localStorage.getItem('pageSize') || this.defaultPageSize;
        var large = (localStorage.getItem('large') || "true") === "true";
        var sortMode = localStorage.getItem('sortMode') || this.defaultSortMode;
        this.setState({ pageSize, large, sortMode })
    }

    onSwitch(event) {
        let large = event.target.checked;
        localStorage.setItem('large', large);
        this.setState({ large })
    }

    onSearch(event) {
        this.setState({ keyword: event.target.value, page: 1 })
    }

    onClickSearch() {
        this.setState({ page: 1 })
    }

    onPageChange(event, page) {
        this.setState({ page })
    }

    onChangePageSize(event) {
        localStorage.setItem('pageSize', event.target.value);
        this.setState({ pageSize: event.target.value, page: 1 })
    }

    onChangeSortMode(event) {
        localStorage.setItem('sortMode', event.target.value);
        this.setState({ sortMode: event.target.value, page: 1 })
    }

    onClickShuffle(event) {
        var shuffled = shuffle(this.state.shuffled);
        this.setState({ shuffled });
    }

    render() {
        return (
            <div style={{width: "95%", margin: "auto"}}>
                <StaticQuery
                    query={query}
                    render={data => {
                        var edges = [...data.allStamp.edges];
                        var with_shuffle = (<div/>);
                        switch (this.state.sortMode) {
                        case SortMode.name:
                            edges.sort(function(a, b) {
                                return a.node.filename - b.node.filename;
                            });
                            break;
                        case SortMode.lastused:
                            var time = JSON.parse(localStorage.getItem('time')) || {}
                            edges.sort(function(a, b) {
                                var d = (time[b.node.filename] || "0") - (time[a.node.filename] || "0")
                                return d
                            });
                            break;
                        case SortMode.random:
                            if (this.state.shuffled.length == 0) {
                                var shuffled = shuffle(edges);
                                edges = shuffled;
                                this.setState({ shuffled });
                            } else {
                                edges = this.state.shuffled;
                            }
                            with_shuffle = (
                                <Grid item>
                                  <Button variant="contained" color="secondary" onClick={this.onClickShuffle}>
                                    Shuffle
                                  </Button>
                                </Grid>);
                            break;
                        }

                        var items = edges.filter(({node}, index) => {
                            if (this.state.keyword === "") {
                                return true
                            } else {
                                return node.relativePath.includes(this.state.keyword)
                            }
                        }).filter(({node}, index) => {
                            if (this.state.large) {
                                return node.attr === "large";
                            } else {
                                return node.attr === "small";
                            }
                        });
                        var pageSize = this.state.pageSize;
                        var pages = Math.ceil(items.length / pageSize);
                        var page = Math.max(Math.min(this.state.page, pages + 1), 1);
                        var min = (page - 1) * pageSize;
                        var max = page * pageSize - 1;

                        var sw;
                        if ((process.env.THUMBNAIL_IMAGE_SMALL_ENABLE || "0") !== "0") {
                            sw = (<Grid container component="label" spacing={1} alignItems="center">
                                <Grid item>Small</Grid>
                                <Grid item><Switch checked={this.state.large} onChange={this.onSwitch} color="primary" /></Grid>
                                <Grid item>Large</Grid>
                            </Grid>);
                        } else {
                            sw = (<div/>);
                        }

                        var {regex, replace} = this.state.large ?
                            get_replacer(
                                process.env.THUMBNAIL_IMAGE_LARGE_MATCH,
                                process.env.THUMBNAIL_IMAGE_LARGE_MATCH_REPLACE
                            ) :
                            get_replacer(
                                process.env.THUMBNAIL_IMAGE_SMALL_MATCH,
                                process.env.THUMBNAIL_IMAGE_SMALL_MATCH_REPLACE
                            );

                        return (
                            <div style={{width: "100%", align: "center"}}>
                                {sw}

                                <Paper style={{padding: '2px 4px', display: 'flex', alignItems: 'center', width: "100%"}}>
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

                                <Grid container component="label" spacing={1} alignItems="center">
                                  <Grid item>PageSize</Grid>
                                  <Grid item>
                                    <Select
                                      defaultValue={this.defaultPageSize}
                                      value={this.state.pageSize}
                                      onChange={this.onChangePageSize}>
                                      <MenuItem value={50}>50</MenuItem>
                                      <MenuItem value={100}>100</MenuItem>
                                      <MenuItem value={200}>200</MenuItem>
                                      <MenuItem value={400}>400</MenuItem>
                                    </Select>
                                  </Grid>
                                  <Grid item>Sort</Grid>
                                  <Grid item>
                                    <Select
                                      defaultValue={this.defaultSortMode}
                                      value={this.state.sortMode}
                                      onChange={this.onChangeSortMode}>
                                      <MenuItem value={SortMode.name}>Name</MenuItem>
                                      <MenuItem value={SortMode.lastused}>LastUsed</MenuItem>
                                      <MenuItem value={SortMode.random}>Random</MenuItem>
                                    </Select>
                                  </Grid>
                                  {with_shuffle}
                                </Grid>

                                <Pagination style={{display: "flex", justifyContent: "center", margin: "20px"}} count={pages} page={page} variant="outlined" color="primary" onChange={this.onPageChange} />

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
                                    if (index >= min && index <= max) {
                                        return true;
                                    } else {
                                        return false;
                                    }
                                }).map(({node}, index) => (
                                    <Image url={this.props.base + node.relativePath} filename={node.filename} regex={regex} replace={replace} />
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

function remove_dblslash(s) {
    return s.replace(/([^:]\/)\/+/g, "$1")
}

class Image extends React.Component {
    render() {
        var url = remove_dblslash(this.props.url);

        var style = {
            width: "100px",
            height: "100px",
            backgroundImage: "url(" + url + ")",
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
                var time = JSON.parse(localStorage.getItem('time')) || {};
                time[name] = Date.now().toString();
                localStorage.setItem('time', JSON.stringify(time))
                toast.info("Copied " + name, {autoClose: 2000});
            };
        }

        function onMouseOver(e) {
            e.currentTarget.style.border = "2px solid #008cba";
        }

        function onMouseOut(e) {
            e.currentTarget.style.border = "none";
        }

        var markdown = url.replace(this.props.regex, this.props.replace);
        return (
            <CopyToClipboard text={markdown} onCopy={onCopy(this.props.filename)}>
                <button aria-label="copy" data-tip={this.props.filename} style={style} onMouseOver={onMouseOver} onMouseOut={onMouseOut} onFocus={onMouseOver} onBlur={onMouseOut} />
            </CopyToClipboard>
        );
    }
}
