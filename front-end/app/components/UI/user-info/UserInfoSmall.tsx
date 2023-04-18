import {FC} from "react";
import {IUser} from "@/types/user.interface";

import styles from './UserInfoSmall.module.scss'

const UserInfoSmall: FC<{user: IUser, message: string}> = ({user, message}) => {
    return(
        <div className={styles.profile_info}>
            {user.avatarPath && <img
                src={user.avatarPath}
                alt={user.name}
                width={50}
                height={50}
                style={{borderRadius: '20px'}}
            />}
            <div>
                <div className={styles.name}>{user.name}</div>
                <div className={styles.message}>
                    {message}
                </div>
            </div>

        </div>
    )
}

export default UserInfoSmall;