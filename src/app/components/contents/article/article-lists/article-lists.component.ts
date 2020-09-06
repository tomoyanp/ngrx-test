import { Component, OnInit } from '@angular/core';
import { ArticlesService } from 'src/app/services/articles.service';

@Component({
  selector: 'app-article-lists',
  templateUrl: './article-lists.component.html',
  styleUrls: ['./article-lists.component.scss']
})
export class ArticleListsComponent implements OnInit {
  articles: object;
  articlesList: Array<string>;

  constructor(
    private articlesService: ArticlesService
  ) { }

  ngOnInit(): void {
    this.articlesService.load().subscribe((res: object) => {
      this.articles = res;
      this.createArticlesList();
      console.log(this.articles)
    });
  }

  createArticlesList() {
    this.articlesList = Object.keys(this.articles);
    this.articlesList.sort();
  }
}
