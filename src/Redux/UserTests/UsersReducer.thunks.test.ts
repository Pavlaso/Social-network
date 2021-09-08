import {Follow, UnFollow, UsersActions} from "../UsersReducer";
import {usersAPI  } from "../../API/UsersAPI";
import {ResponseType, ResultsCodes} from "../../API/api";
jest.mock('../../API/UsersAPI')
const UserApiMock = usersAPI as jest.Mocked<typeof usersAPI>
const result: ResponseType = {
    resultCode: ResultsCodes.Success,
    messages:[],
    data: {},
}

 // @ts-ignore
UserApiMock.Follow.mockReturnValue(Promise.resolve(result))
UserApiMock.UnFollow.mockReturnValue(Promise.resolve(result))

test("Follow success Thunk", async () => {
    const thunk = Follow(1)
    const dispatchMock = jest.fn()
    const getStateMock = jest.fn()

    // @ts-ignore
    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(1)
    expect(dispatchMock).toHaveBeenNthCalledWith(1,UsersActions.setFollowing(true, 1))

})
test("Unfollow success Thunk", async () => {
    const thunk = UnFollow(1)
    const dispatchMock = jest.fn()
    const getStateMock = jest.fn()

    // @ts-ignore
    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(1)
    expect(dispatchMock).toHaveBeenNthCalledWith(1,UsersActions.setFollowing(true, 1))

})
