import {Component} from '@angular/core';
import {FormControl} from "@angular/forms";
import {GithubRepository, AppService} from "./app.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    userName: string;
    repositoryFilterKeyword = new FormControl('');
    data: GithubRepository[];
    filteredData: GithubRepository[];

    constructor(private appService: AppService) {

    }

    getUsersRepositoryList() {
        this.appService.getGithubRepositoryByUsername(this.userName).subscribe((data) => {
            this.data = data.body;
            this.filteredData = data.body;
        })
    }

    filterRepository(keyword: string) {
        if (keyword == null || keyword == '') {
            this.filteredData = this.data;
        } else {
            this.filteredData = this.data.filter((el: GithubRepository) => {
                return el.name.indexOf(keyword) > -1;
            });
        }
    }

    clearUserNameValue() {
        this.userName = null;
        this.repositoryFilterKeyword.setValue(null);
        this.data = null;
        this.filteredData = null;
    }

    clearFilteredValue() {
        this.repositoryFilterKeyword.setValue(null);
        this.filterRepository(null)
    }

    function (element, start, end) {
        var str = element.innerHTML;
        str = str.substr(0, start) +
            '<span class="hilite">' +
            str.substr(start, end - start + 1) +
            '</span>' +
            str.substr(end + 1);
        element.innerHTML = str;
    }
}
