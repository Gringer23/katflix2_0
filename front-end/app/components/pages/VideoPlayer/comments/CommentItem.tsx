import {FC} from "react";
import {IComment} from "@/types/comment.interface";

import styles from './Comment.module.scss'
import UserInfoSmall from "@/components/UI/user-info/UserInfoSmall";

const CommentItem : FC<{comment: IComment}> = ({comment}) =>{
    return (
        <div className={styles.commentItem}>
            <UserInfoSmall user={comment.user} message={comment.message}/>
        </div>
    )
}

export default CommentItem;