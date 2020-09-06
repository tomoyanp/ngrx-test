import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/utility/header/header.component';
import { TopComponent } from './components/contents/top/top.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {A11yModule} from '@angular/cdk/a11y';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SidebarComponent } from './components/utility/sidebar/sidebar.component';
import { ArticleComponent } from './components/contents/article/article.component';

import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './components/contents/profile/profile.component';
import { ArticleListsComponent } from './components/contents/article/article-lists/article-lists.component';
import { ArticleDetailsComponent } from './components/contents/article/article-details/article-details.component';
import { RangeDatePickerComponent } from './components/utility/rangeDatePicker/range-date-picker/range-date-picker.component';

import { LOCALE_ID } from '@angular/core';
import localeJa from '@angular/common/locales/ja';
import { registerLocaleData } from '@angular/common';
import { TestComponent } from './components/test/test/test.component';
import { FlowchartComponent } from './components/utility/flowchart/flowchart.component';
import { SampleFormComponent } from './components/sample-form/sample-form.component';
import { ErrorWrapperComponent } from './components/error-wrapper/error-wrapper.component';

import { mogeReducer } from './store/moge.reducer';
import { hogeReducer } from './store/hoge.reducer';
import { StoreModule } from '@ngrx/store';
import { AgGridSampleComponent } from './components/ag-grid-sample/ag-grid-sample.component';
import { NgrxTestComponent } from './ngrx-test/ngrx-test.component';
import { EffectsModule } from '@ngrx/effects';
import { HogeEffects } from './store/hoge.effects';

registerLocaleData(localeJa);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TopComponent,
    SidebarComponent,
    ArticleComponent,
    ProfileComponent,
    ArticleListsComponent,
    ArticleDetailsComponent,
    RangeDatePickerComponent,
    TestComponent,
    FlowchartComponent,
    SampleFormComponent,
    ErrorWrapperComponent,
    AgGridSampleComponent,
    NgrxTestComponent
  ],
  imports: [
    StoreModule.forRoot({
      moge: mogeReducer,
      hoge: hogeReducer
    }),
    EffectsModule.forRoot([
      HogeEffects
    ]),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    A11yModule,
    ClipboardModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    PortalModule,
    ScrollingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([])
  ],
  providers: [
    { provide: LOCALE_ID,  useValue: 'ja-JP' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
