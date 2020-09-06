import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleListsService } from 'src/app/services/article-lists.service';
import { ArticlesService } from 'src/app/services/articles.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private articleListsService: ArticleListsService,
    private articlesService: ArticlesService
  ) { }
  private id: number;
  private articleLists: Array<string>;
  private articles: object = {};

  ngOnInit(): void {
    this.getId();
    this.articleListsService.get()
      .subscribe(res => {
        this.articleLists = res["articles"];
        this.articleListsService.push(this.articleLists);
        this.getArticle();
      });
  }

  getArticle() {
    for (let jsonFile of this.articleLists) {
      this.articlesService.get(jsonFile)
        .subscribe(res => {
          let key = jsonFile.split(".")[0];
          this.articles[key] = res;
          this.articlesService.push(this.articles);
        });
    }
  }

  getId(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    console.log(this.id);
  }
}
