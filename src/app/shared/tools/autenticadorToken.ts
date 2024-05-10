import jwt_decode from 'jwt-decode';
import * as moment from 'moment';

export function AutenticarToken(jwt: string) {
    try {
        const token = jwt_decode<any>(jwt);
        if (moment(token.exp * 1000) < moment()) {
            localStorage.clear();
            return false;
        } else {
            return true;
        }
    } catch (error) {
        return false;
    }
}