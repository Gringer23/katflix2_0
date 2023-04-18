import {NextPage} from "next";
import Video from "@/components/pages/VideoPlayer/Video";


const WatchPage: NextPage = (props) =>{
    return <Video {...props}/>
}

export default WatchPage;