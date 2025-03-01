import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {NgxFilesizeModule} from 'ngx-filesize';
import {ToastrModule} from 'ngx-toastr';
import {NgxLoadingModule} from 'ngx-loading';
import {MomentModule} from 'ngx-moment';
import {NgSelectModule} from '@ng-select/ng-select';
import {AngularPageVisibilityModule} from 'angular-page-visibility-v2';


import {AppComponent} from './app.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {SearchManualComponent} from './search/search-manual.component';
import {SearchInputComponent} from './search/search-input.component';
import {SearchAutoComponent} from './search/search-auto.component';
import {SettingsComponent} from './settings/settings.component';
import {MediaTVComponent} from './media/media-t-v.component';
import {MediaMovieComponent} from './media/media-movie.component';
import {SettingsGuard} from './settings.guard';
import {LoginGuard} from './login.guard';
import {StaffGuard} from './staff.guard';
import {LoginComponent} from './login/login.component';
import {ApiService} from './api.service';
import {WatchingComponent} from './watching/watching.component';
import {TorrentDetailsComponent} from './torrent-details/torrent-details.component';
import {DiscoverComponent} from './discover/discover.component';
import {MediaResultsComponent} from './media-results/media-results.component';
import {MediaFilterPipe} from './filter.pipe';
import {WantedComponent} from './wanted/wanted.component';
import {RottenTomatoesComponent} from './rotten-tomatoes/rotten-tomatoes.component';
import {TmdbComponent} from './tmdb/tmdb.component';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {RottenTomatoesRedirectComponent} from './rotten-tomatoes-redirect/rotten-tomatoes-redirect.component';
import {QualityProfilesComponent} from "./settings/quality-profiles.component";

const appRoutes: Routes = [
  {path: '', redirectTo: 'search/auto', pathMatch: 'full'},  // redirects
  {path: 'search', redirectTo: 'search/auto', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'search/auto', component: SearchAutoComponent, canActivate: [LoginGuard, SettingsGuard]},
  {path: 'search/manual', component: SearchManualComponent, canActivate: [LoginGuard, SettingsGuard]},
  {path: 'media/tv/:id', component: MediaTVComponent, canActivate: [LoginGuard, SettingsGuard]},
  {path: 'media/movie/:id', component: MediaMovieComponent, canActivate: [LoginGuard, SettingsGuard]},
  {path: 'watching/:type', component: WatchingComponent, canActivate: [LoginGuard, SettingsGuard]},
  {path: 'wanted/:type', component: WantedComponent, canActivate: [LoginGuard, SettingsGuard]},
  {path: 'settings', component: SettingsComponent, canActivate: [LoginGuard, StaffGuard]},
  {
    path: 'discover',
    component: DiscoverComponent,
    canActivate: [LoginGuard, SettingsGuard],
    children: [
      {path: '', redirectTo: '/discover/tmdb', pathMatch: 'full'},
      {path: 'tmdb', component: TmdbComponent},
      {path: 'rt', component: RottenTomatoesComponent},
    ],
  },
  {path: 'rt-redirect/:mediaType/:title', component: RottenTomatoesRedirectComponent},
  {path: 'page-not-found', component: PageNotFoundComponent},
  {path: '**', component: PageNotFoundComponent}
];

export function init(apiService: ApiService) {
  return () => apiService.init().toPromise().then(
    () => {
      console.log('app init success');
    }, () => {
      console.error('app init failed');
    }
  );
}


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    SearchManualComponent,
    SearchInputComponent,
    SearchAutoComponent,
    SettingsComponent,
    LoginComponent,
    MediaTVComponent,
    MediaMovieComponent,
    WatchingComponent,
    TorrentDetailsComponent,
    DiscoverComponent,
    MediaResultsComponent,
    MediaFilterPipe,
    WantedComponent,
    RottenTomatoesComponent,
    TmdbComponent,
    RottenTomatoesRedirectComponent,
    QualityProfilesComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes, {
      useHash: true
    }),
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgxFilesizeModule,
    ToastrModule.forRoot(),
    NgxLoadingModule.forRoot({}),
    MomentModule,
    NgSelectModule,
    AngularPageVisibilityModule,
    NgxDatatableModule,
  ],
  providers: [
    {provide: APP_INITIALIZER, useFactory: init, deps: [ApiService], multi: true},
    MediaFilterPipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
  }
}
