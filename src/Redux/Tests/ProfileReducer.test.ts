import ProfileReducer, {actions} from "../ProfileReducer";


let state = {
    posts: [
        {id: 1, message: 'Hi Bro', likes: 12},
        {id: 2, message: 'My name is Alexander', likes: 1},
        {id: 3, message: 'I have Bike', likes: 2},
        {id: 4, message: 'I work in School', likes: 4},
        {id: 5, message: 'I love Anime', likes: 6}
    ],
    profile: null ,
    status: '',
}
export type installStateType = typeof state;

it('message of new post should be correct', () => {
    let action = actions.CreatorAddPost('You`ra gey')
    let newState = ProfileReducer(state, action)
    expect(newState.posts.length).toBe(6);
});
it('message of new post should be You`ra gey', () => {
    let action = actions.CreatorAddPost('You`ra gey')
    let newState = ProfileReducer(state, action)
    expect(newState.posts[5].message).toBe('You`ra gey');
});
it('after deleting length of message should be decrement', () => {
    let action = actions.deletePost(1)
    let newState = ProfileReducer(state, action)
    expect(newState.posts.length).toBe(4);
});
it('after deleting length of message should`t be decrement if id is incorrect', () => {
    let action = actions.deletePost(1000)
    let newState = ProfileReducer(state, action)
    expect(newState.posts.length).toBe(5);
});