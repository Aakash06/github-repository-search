import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/internal/operators';

export class GithubRepository {
    name: string;
}

@Injectable({
    providedIn: 'root'
})
export class AppService {

    requestOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/vnd.github.v3+json'
        }),
        observe: 'response' as 'response'
    };

    constructor(private httpClient: HttpClient) {
    }

    getGithubRepositoryByUsername(userName: string): Observable<HttpResponse<GithubRepository[]>> {
        return this.httpClient.get<GithubRepository[]>(
            `https://api.github.com/users/${userName}/repos`,
            this.requestOptions).pipe(
            catchError(this.handleError)
        );
    }

    private handleError(error: HttpErrorResponse) {
        let errMsg: string;
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            errMsg = 'An error occurred:' + error.error.message;
        } else {
            errMsg = error.error.message;
        }
        // return an observable with a user-facing error message
        return throwError(errMsg);
    }
}
