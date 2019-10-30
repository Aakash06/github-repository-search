import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

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
        return this.httpClient.get<GithubRepository[]>(`https://api.github.com/users/${userName}/repos`, this.requestOptions);
    }
}
