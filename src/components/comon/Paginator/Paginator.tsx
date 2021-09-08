import React, {useState,} from "react";
import styles from "./Paginator.module.css";
import cn from "classnames";
type props = {
    totalUsersCount: number,
    PageSize: number,
    currentPage: number,
    onPostChanged: (PageNumber: number) => void,
    portionSize: number
}
let Paginator: React.FC<props> =
    ({totalUsersCount, PageSize, currentPage, onPostChanged, portionSize = 10}) => {
    let PagesCount = Math.ceil(totalUsersCount / PageSize);
    let pages: Array<number> = [];
    for (let i = 1; i <= PagesCount; i++) {
        pages.push(i);
    }
    let portionCount = Math.ceil(PagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    const rightPortionPageNumber = portionNumber * portionSize;

    return<div className={styles.paginaitor}>
        {portionNumber > 1 &&
        <button className={styles.EndBegin} onClick={() => {setPortionNumber(portionNumber = 1)}}>BEGIN</button>
        }

        {portionNumber > 1 &&
        <button  className={styles.button} onClick={() => {setPortionNumber(portionNumber - 1)}}> back </button>
        }

        {pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber).map(p => {
                return <span key={p} className={cn(styles.item, {[styles.active]: currentPage === p})}
                             onClick={() => {
                                 onPostChanged(p)
                             }}>
                {p}
            </span>
            })
        }


        {portionCount > portionNumber &&
        <button className={styles.button} onClick={() => {setPortionNumber(portionNumber + 1)}}> next </button>
        }
        {!(portionCount === portionNumber) &&
        <button className={styles.EndBegin} onClick={() => {setPortionNumber((portionNumber = (portionCount)))}}>END</button>
        }
    </div>
}
export default Paginator;