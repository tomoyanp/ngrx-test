import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TopComponent } from './components/contents/top/top.component';
import { ArticleComponent } from './components/contents/article/article.component';
import { ArticleListsService } from './services/article-lists.service';
import { ArticleListsComponent } from './components/contents/article/article-lists/article-lists.component';
import { ArticleDetailsComponent } from './components/contents/article/article-details/article-details.component';
import { RangeDatePickerComponent } from './components/utility/rangeDatePicker/range-date-picker/range-date-picker.component';
import { TestComponent } from './components/test/test/test.component';
import { SampleFormComponent } from './components/sample-form/sample-form.component';
import { AgGridSampleComponent } from './components/ag-grid-sample/ag-grid-sample.component';
import { NgrxTestComponent } from './ngrx-test/ngrx-test.component';


const routes: Routes = [
  { path: '', component: TopComponent },
  {
    path: 'article',
    component: ArticleComponent,
    children: [
      { path: '', component: ArticleListsComponent },
      { path: ':id', component: ArticleDetailsComponent },
    ]
  },
  { path: 'test', component: TestComponent },
  { path: 'ag-grid-sample', component: AgGridSampleComponent },
  { path: 'ngrx', component: NgrxTestComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
