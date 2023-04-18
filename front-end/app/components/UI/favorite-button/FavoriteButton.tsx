import {FC} from "react";

import styles from './FavoriteButton.module.scss'
import {MdFavorite, MdFavoriteBorder} from "react-icons/md";
import {useAuth} from "@/hooks/useAuth";
import {api} from "@/store/api/api";

const FavoriteButton: FC<{favoriteId: number}> = ({favoriteId}) =>{
    const {user} = useAuth()
    const {data: profile} = api.useGetProfileQuery(null, {
        skip: !user
    })
    const [favorite, {isLoading, data}] = api.useFavoriteMutation()
    const isFavorite = profile?.favorite?.some(fav => fav.id === favoriteId) || !!data
    return(
        <button className={styles.favorite}
        onClick={() => favorite(favoriteId).unwrap()}
        disabled={isLoading}>
            {
                isFavorite ?
                    (
                       <>
                           <MdFavorite/>
                           <span style={{ marginLeft: '0.5rem' }}>Убрать из избранного</span>
                       </>
                ) : (
                    <>
                        <MdFavoriteBorder/>
                        <span style={{ marginLeft: '0.5rem' }}>Добавить в избранное</span>
                    </>
                )
            }

        </button>
    )
}

export default FavoriteButton