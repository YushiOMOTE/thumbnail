import React from "react"
import {graphql} from "gatsby"
import Thumbnail from "../components/image"
import {Helmet} from "react-helmet"

export default class Home extends React.Component {
    constructor() {
        super()
        this.state = { base: process.env.THUMBNAIL_IMAGE_BASE_URL }
    }

    componentDidMount() {
        if (!this.state.base) {
            var base = window.location.href;
            this.setState({ base })
        }
    }

    render() {
        return (<div>
            <Helmet>
                <title>{process.env.THUMBNAIL_TITLE || "Thumbnail"}</title>
            </Helmet>
            <Thumbnail base={this.state.base} />
        </div>)
    }
}
