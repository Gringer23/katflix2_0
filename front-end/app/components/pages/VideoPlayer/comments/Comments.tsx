import {FC} from "react";
import {IComment} from "@/types/comment.interface";
import {useAuth} from "@/hooks/useAuth";

import styles from './Comment.module.scss'
import CommentItem from "@/components/pages/VideoPlayer/comments/CommentItem";
import AddComment from "@/components/pages/VideoPlayer/comments/AddComment";


const Comments:FC<{comments : IComment[], videoId: number | undefined}> = ({comments, videoId}) => {
    const user = useAuth()

    return (
        <div className={styles.comments}>
            <h2>Комментарии</h2>
            <div className={styles.line}/>
            {comments.length ? (
                <div className={styles.commentOverflow}>
                    {
                        comments.map(comment =>
                            <CommentItem comment={comment} key={comment.id}/>
                        )
                    }
                </div>
            ) : (
                <p>Комментарии не найдены</p>
            )}

            <div className={styles.bottomForm}>
                {user && <AddComment filmId={videoId}/>}
            </div>
        </div>
    )
}

export default Comments;