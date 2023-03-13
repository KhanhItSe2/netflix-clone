import { Component, HostListener } from '@angular/core';
import { LoaderService } from './service/loader.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  showLoader$ = this.loaderService.loadingAction$;
  constructor(private loaderService: LoaderService) {}
  title = 'Movie On';
  navbg: any;
  @HostListener('document:scroll') scrollover() {
    console.log(document.body.scrollTop, 'scrolllength#');
    if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
      this.navbg = {
        'background-color': '#000',
      };
    } else {
      this.navbg = {};
    }
  }
}
