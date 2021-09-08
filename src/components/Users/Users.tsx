import Preloader from "../comon/Preloader/Preloader"
import style from "./Users.module.css"
import User from "./User"
import React, {useEffect} from "react"
import {UsersSearchForm} from "./UsersSearchForm"
import {FilterType,  requestUsers, UsersActions} from "../../Redux/UsersReducer"
import {useDispatch, useSelector} from "react-redux"
import {getCurrentPage, getFilter,  getIsFetching, getPageSize, getTotalUsersCount, getUsers}
    from "../../Redux/UsersSelectors"
import {useHistory} from "react-router-dom"
import * as queryString from "querystring"
import {Pagination} from "antd";
type props = {
    pageTitle: string
}
let Users: React.FC<props> = (props) => {

    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const PageSize = useSelector(getPageSize)
    const isFetching = useSelector(getIsFetching)
    const users = useSelector(getUsers)
    //const portionSize = useSelector(getPortionSize)
    const filter = useSelector(getFilter)
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        const parsed = queryString.parse(history.location.search.substr(1))as
            {term: string; page: string; friend: string}

        let actualPage = currentPage
        let actualFilter = filter
        if(!!parsed.page) actualPage = Number(parsed.page)
        if(!!parsed.term) actualFilter = {...actualFilter, term: parsed.term as string}
        switch (parsed.friend){
            case "null" :
                actualFilter = {...actualFilter, friend: null}
                break;
            case "true" :
                actualFilter = {...actualFilter, friend: true}
                break;
            case "false" :
                actualFilter = {...actualFilter, friend: false}
                break;
        }
        dispatch(requestUsers(actualPage, PageSize, actualFilter))
    }, [])

    useEffect(() => {
        const query: any = {}

        if(!!filter.term) query.term = filter.term
        if(filter.friend !== null) query.friend = String(filter.friend)
        if(currentPage !== 1) query.page = String(currentPage)

        history.push({
            pathname: '/Users',
            search: queryString.stringify(query)
        })}, [filter, currentPage])

    const onFilterChanged  = (filter: FilterType, ) => dispatch(requestUsers(1, PageSize, filter ))
    const onPostChanged = (page: number, ) => {
        dispatch(UsersActions.setPage(page,))
        dispatch(requestUsers(page, PageSize, filter))
    }
    return <div>
        {isFetching ? <Preloader/> : null}
        {props.pageTitle}
        <UsersSearchForm  onFilterChanged={onFilterChanged}/>

        {/*<Paginator currentPage={currentPage} onPostChanged={onPostChanged} totalUsersCount={totalUsersCount}
                   PageSize={PageSize} portionSize={portionSize}/>*/}


        {
            users.map(users => <User users={users} key={users.id}/>)
        }
        <Pagination className={style.paginator}
            pageSize={PageSize}
            onChange={onPostChanged}
        total={totalUsersCount}
        showSizeChanger={false}
        showTotal={total => `Total ${total} items`}
    />
    </div>
}
export default Users;
