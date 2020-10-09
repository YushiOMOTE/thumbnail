import React from "react"
import {graphql} from "gatsby"
import Thumbnail from "../components/image"
import {Helmet} from "react-helmet"

export default function Home({data}) {
    return (<div>
                <Helmet>
                    <title>{data.site.siteMetadata.title}</title>
                </Helmet>
                <Thumbnail base={data.site.siteMetadata.imageBaseURL} />
            </div>)
}

export const query = graphql`
query {
  site {
    siteMetadata {
      title
      imageBaseURL
    }
  }
}
`
