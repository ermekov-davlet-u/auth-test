import { makeAutoObservable } from "mobx";

interface UserType {
    id: number,
    username: string,
    password: string
    avatar: string,
    about: string
}

class Store {

    authToken: string = "";
    user?: UserType;

    constructor(){
        makeAutoObservable(this)
    }


    newAuthToken(param: string) {
        this.authToken = param;
    } 

    newUser(param: UserType) {
        this.user = param;
    }

}

export const store = new Store();