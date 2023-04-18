import {FC} from "react";
import {IFilm} from "@/types/film.interface";

import styles from './VideoItemCatalog.module.scss'
import Link from "next/link";

const APP = 'http://localhost:3000'
const VideoItemCatalog:FC<{ video: IFilm }> = ({video}) => {

    return(
          <>
          <div className={styles.film}>
              <Link href={`/v/${video.id}`}>
              <div className={styles.thumbnail}>
                  {video.thumbnailPath && (
                      <div
                          style={{
                              backgroundImage: `url(${APP + video.thumbnailPath})`
                          }}
                          className={styles.bg_image}
                      />
                  )}
                  <div className={styles.information}>
                      <img src={video.namePoster} alt={video.name} />
                  </div>
              </div>
              </Link>
          </div>
          </>
        )

}

export default VideoItemCatalog