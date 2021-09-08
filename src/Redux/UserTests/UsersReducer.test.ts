import UsersReducer, {installSateType, UsersActions} from "../UsersReducer"
let state: installSateType;
beforeEach(
    () =>{
        state= {
            users: [
                {id: 0, name:'Dimych', followed: false, photos:{small: null, large:null}, status: 'status 0'},
                {id: 1, name:'Dimych 1', followed: false, photos:{small: null, large:null}, status: 'status 2'},
                {id: 2, name:'Dimych 2', followed: true, photos:{small: null, large:null}, status: 'status 6'},
                {id: 3, name:'Dimych 3', followed: true, photos:{small: null, large:null}, status: 'status 7'},
            ],
            PageSize: 5,
            totalUsersCount: 0,
            currentPage: 1,
            isFetching: false,
            followingInProgress: [],
            portionSize: 10,
        }
    }
)
test("Follow success", () => {
    const NewState = UsersReducer(state, UsersActions.follow(1))

    expect(NewState.users[0].followed).toBeFalsy()
    expect(NewState.users[1].followed).toBeTruthy()
})
test("Unfollow success", () => {
    const NewState = UsersReducer(state, UsersActions.unfollow(3))

    expect(NewState.users[2].followed).toBeTruthy()
    expect(NewState.users[3].followed).toBeFalsy()
}) 