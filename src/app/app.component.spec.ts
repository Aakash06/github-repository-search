import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {AppService, GithubRepository} from './app.service';
import {HighlightPipe} from './highlight.pipe';
import {FormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {of} from 'rxjs';
import {HttpHeaders, HttpResponse} from '@angular/common/http';

describe('AppComponent', () => {
    let appComponent: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let appService: AppService;

    const githubData: GithubRepository[] = [
        {
            name: 'akka'
        },
        {
            name: 'angular'
        }
    ];

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, HttpClientTestingModule],
            declarations: [
                AppComponent, HighlightPipe
            ],
            providers: [AppService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        appComponent = fixture.componentInstance;
        appService = TestBed.get(AppService);
    });

    it('get user\'s repository githubRepositoryData from github', () => {
        const data = new HttpResponse<GithubRepository[]>({
            body: githubData,
            status: 200,
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
        spyOn(appService, 'getGithubRepositoryByUsername').and.returnValue(of(data));
        appComponent.getUsersRepositoryList();
        appComponent.githubRepositoryData = githubData;
        appComponent.filteredData = githubData;
        expect(appService.getGithubRepositoryByUsername).toHaveBeenCalled();
        expect(appComponent.githubRepositoryData).toEqual(githubData);
        expect(appComponent.filteredData).toEqual(githubData);
    });

    it('clear the username field and filter field', () => {
        appComponent.clearUserNameValue();
        expect(appComponent.userName).toBeNull();
        expect(appComponent.repositoryFilterKeyword).toBeNull();
        expect(appComponent.githubRepositoryData).toBeNull();
        expect(appComponent.filteredData).toBeNull();
    });

    it('clear the filter keyword', () => {
        spyOn(appComponent, 'filterRepository');
        appComponent.clearFilteredValue();
        expect(appComponent.filterRepository).toHaveBeenCalledWith(null);
        expect(appComponent.repositoryFilterKeyword).toBeNull();
    });

    it('get filtered repositories', () => {
        appComponent.githubRepositoryData = githubData;
        appComponent.filterRepository(null);
        expect(appComponent.filteredData).toEqual(githubData);
    });


    it('clear the filter keyword', () => {
        appComponent.githubRepositoryData = githubData;
        appComponent.filterRepository('ak');
        expect(appComponent.filteredData).toEqual([githubData[0]]);
    });

});
