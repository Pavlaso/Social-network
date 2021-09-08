export const ObjectHelpers = (newObjProps: any, items: any, itemId: any, ObjPropsName: any) => {
    return items.map((u: any) => {
        if (u[ObjPropsName] === itemId) {
            return {...u,...newObjProps }
        }
        return u;
    })

}