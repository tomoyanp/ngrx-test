import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticlesService } from 'src/app/services/articles.service';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss']
})
export class ArticleDetailsComponent implements OnInit {
  private articles: object;
  selectedArticle: object;
  private pageNo: string;
  private PR: any;

  constructor(
    private articlesService: ArticlesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    console.log("ngOninit start");
    this.pageNo = this.route.snapshot.params.id;
    this.articlesService.load().subscribe(res => {
      console.log("subscribe start")
      this.articles = res;
      if (true) {
      //if (this.articles[this.pageNo]) {
        this.selectedArticle = this.articles[this.pageNo];
        console.log("aaaaaaaaaaaaaa");
        console.log(this.selectedArticle);
      }
    })
  }

  ngAfterViewChecked(): void {
    this.PR = window["PR"];
    this.PR.prettyPrint();
  }

}
