import { APP_NAME, API_VERSION } from '../../constnats';

export function surl(uri: string): string {
    return APP_NAME + '/api/' + API_VERSION + '/in/r0/' + uri;
}

export function aurl(uri: string): string {
    return APP_NAME + '/api/' + API_VERSION + '/in/r1/' + uri;
}

export function nurl(uri: string): string {
    return APP_NAME + '/api/' + API_VERSION + '/in/r2/' + uri;
}

export function murl(uri: string, ): string {
    return APP_NAME + '/api/' + API_VERSION + '/in/r3/' + uri;
}

export function purl(uri: string): string {
    return APP_NAME + '/api/' + API_VERSION + '/' + uri;
}
