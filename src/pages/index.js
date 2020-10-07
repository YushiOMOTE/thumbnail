import React from "react"
import Image from "../components/image"
import {NotificationContainer} from "react-notifications"

export default function Home({ data }) {
    var base = window.location.href;

    return (<div>
            <link href="https://minhtran.dev/react-notifications/app.css" rel="stylesheet" />
            <div>
            {data.allFile.edges.map(({node}, index) => (
                    <Image url={base + node.publicURL} />
            ))}
            </div>
            <NotificationContainer />
            <script type="text/javascript" src="https://minhtran.dev/react-notifications/app.js" />
            </div>)
}

export const query = graphql`
query {
  allFile {
    edges {
      node {
        publicURL
      }
    }
  }
}`;
