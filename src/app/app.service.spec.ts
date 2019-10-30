import {TestBed} from '@angular/core/testing';

import {AppService, GithubRepository} from './app.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpResponse} from '@angular/common/http';

describe('AppService', () => {
    let appService: AppService;
    let httpTestingController: HttpTestingController;

    const githubData: GithubRepository[] = [
        {
            name: 'akka'
        },
        {
            name: 'angular'
        }
    ];

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                AppService
            ]
        });
        appService = TestBed.get(AppService);
        httpTestingController = TestBed.get(HttpTestingController);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('be able to make get call for getGithubRepositoryByUsername successfully', () => {
        appService.getGithubRepositoryByUsername('Aakash06')
            .subscribe(
                (data: HttpResponse<GithubRepository[]>) => {
                    expect(data.status).toEqual(200);
                    expect(data.body).toEqual(githubData);
                }
            );
        const req = httpTestingController.expectOne(`https://api.github.com/users/Aakash06/repos`);
        req.flush(githubData);
    });
});
