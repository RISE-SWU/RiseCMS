export function session() {
    if(sessionStorage.getItem('status')) {
        return {
            status: sessionStorage.getItem('status'),
            user: sessionStorage.getItem('userName')
        }
    } else {
        return false;
    }
}