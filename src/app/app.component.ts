import {Component} from '@angular/core';

import {AppService, GithubRepository} from './app.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    userName: string;
    repositoryFilterKeyword: string;
    githubRepositoryData: GithubRepository[];
    filteredData: GithubRepository[];

    constructor(private appService: AppService) {

    }

    getUsersRepositoryList() { // Hit on github server to collect repositories list
        this.appService.getGithubRepositoryByUsername(this.userName).subscribe((data) => {
            this.githubRepositoryData = data.body;
            this.filteredData = data.body;
        }, error => {
            alert(error);
        });
    }

    filterRepository(keyword: string) { // filter the repository list
        if (keyword === null || keyword === '') {
            this.filteredData = this.githubRepositoryData;
        } else {
            this.filteredData = this.githubRepositoryData.filter((el: GithubRepository) => {
                return el.name.indexOf(keyword) > -1;
            });
        }
    }

    clearUserNameValue() { // call when click on clear the username
        this.userName = this.githubRepositoryData = this.filteredData = null;
        this.repositoryFilterKeyword = null;
    }

    clearFilteredValue() { // call when clear filter keyword value
        this.repositoryFilterKeyword = null;
        this.filterRepository(null);
    }
}
