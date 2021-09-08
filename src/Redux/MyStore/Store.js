import ProfileReducer from "../ProfileReducer";
import MessageReducer from "../MessageReducer";
let store = {
    _state: {
        MessagesPage: {
            MesData: [
                {id: 1, message: 'hi'},
                {id: 2, message: 'How are your Dog?'},
                {id: 3, message: 'Yo'},
                {id: 4, message: 'Yo'},
                {id: 5, message: 'Yo'},
                {id: 6, message: 'Bye'}
            ],

            newMessageText: "",
            dialogsData: [
                {
                    id: 1,
                    name: 'Artyom Popov',
                    url: "https://sun2-10.userapi.com/s/v1/ig2/Ml80x4_w9NE34qY5YXlcHJ8edog4CTXNa97hzbr8Fvd6dMHjDyqtDh3QXWS5J8H76Md1_QtiAGpHV28Ah9Ly1KXc.jpg?size=200x0&quality=96&crop=312,829,1017,1017&ava=1;"
                },
                {
                    id: 2,
                    name: 'Stefan Artyukhov',
                    url: "https://sun2-4.userapi.com/s/v1/ig2/PsG3DN7O91UDCmzGJtR7dMYjPvSAxhVak-03g-UPhVn3wvNAK6n_iG6OHEU8FDc-z1JjbpRIaMMVsRsq3uiPer8S.jpg?size=200x0&quality=95&crop=573,0,1135,1136&ava=1"
                },
                {
                    id: 3,
                    name: 'Alex Golodenko',
                    url: "https://sun2-11.userapi.com/s/v1/ig1/xxxWGdjtBrmGAUXGvQ5xPCFR18BJA6pVn6G7xTdk2CA0_-ui6XU3ERdeLodm0XzATLEjvlB0.jpg?size=200x0&quality=96&crop=10,550,1600,1600&ava=1"
                },
                {
                    id: 4,
                    name: 'Alisa Mescheryakova ',
                    url: "https://sun2-3.userapi.com/s/v1/ig2/j_uoXmv6a_UHdBZAUu6kpikPAjtWWun2yB7uEc8ioO4mQGvwg4glqtXymISJlCJopvq2nfbTt_y3CXeME8sp7jOQ.jpg?size=200x0&quality=96&crop=4,220,989,989&ava=1"
                },
                {
                    id: 5,
                    name: 'Yulia Zhikhareva',
                    url: "https://sun2-10.userapi.com/s/v1/ig2/PH_8mPwCTrXYHg3XO5arkrKMsK8yPV01GDIbqM8YETPcrWu2GZG_wj5Y5bPn-ZVRV_HUAF2eeFc41aCXM3gCZt7g.jpg?size=200x0&quality=96&crop=7,391,1652,1652&ava=1"
                },
                {
                    id: 6,
                    name: 'Andrey Guly',
                    url: "https://sun2-11.userapi.com/s/v1/ig2/UmtZABzO_H8xkpbA3yQCK3qmMFw_QUg4NA-SOTjElnyVPJXGLFj-rWrMqfvByChc7esPEyRzmk0nD6CLDvFyKx5_.jpg?size=200x0&quality=96&crop=131,216,513,513&ava=1"
                }
            ]
        },

        ProfilePage: {
            posts: [
                {id: 1, message: 'Hi Bro', likes: 12},
                {id: 2, message: 'My name is Alexander', likes: 1},
                {id: 3, message: 'I have Bike', likes: 2},
                {id: 4, message: 'I work in School', likes: 4},
                {id: 5, message: 'I love Anime', likes: 6}
            ],
            newPostText: ''
        }
    },
    _CallSubscriber() {
        console.log("Not, not ,not")
    },
    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._CallSubscriber = observer;
    },

    dispatch(action) {
        this._state.ProfilePage = ProfileReducer(this._state.ProfilePage, action);
        this._state.MessagesPage = MessageReducer(this._state.MessagesPage, action);
        this._CallSubscriber(this._state);
    }
}

export default store;


