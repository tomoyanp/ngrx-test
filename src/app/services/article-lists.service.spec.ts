import { TestBed } from '@angular/core/testing';

import { ArticleListsService } from './article-lists.service';

describe('ArticleListsService', () => {
  let service: ArticleListsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticleListsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
