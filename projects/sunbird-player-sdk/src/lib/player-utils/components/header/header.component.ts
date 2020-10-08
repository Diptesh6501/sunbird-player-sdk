import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'sb-player-pdf-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements  OnChanges, OnInit {
  @Input() pageNumber;
  @Input() totalPages;
  @Output() actions = new EventEmitter<any>();
  page;

  ngOnInit(): void {
    this.page = this.pageNumber;
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'pageNumber':
            this.page = changes[propName].currentValue;
            this.pageNumber = changes[propName].currentValue;
            break;
          case 'totalPages':
            this.totalPages = changes[propName].currentValue;
            break;
        }
      }
    }
  }

  zoomIn() {
    // (window as any).PDFViewerApplication.zoomIn();
    this.actions.emit({type: 'header:zoomIn'});
    // this.pdfPlayerService.raiseHeartBeatEvent('ZOOM_IN');
  }

  zoomOut() {
    this.actions.emit({type: 'header:zoomOut'});
    // (window as any).PDFViewerApplication.zoomOut();
    // this.pdfPlayerService.raiseHeartBeatEvent('ZOOM_OUT');
  }

  rotateCW() {
    this.actions.emit({type: 'header:rotateCW'});
  }


  gotoPage() {
    const page = parseInt(this.page, 10);
    if (page > 0 && page <= this.totalPages) {
      this.actions.emit({ type: 'header:navigateToPage', data: page });
      this.pageNumber = page;
    } else {
      this.page = this.pageNumber;
    }
  }
}
