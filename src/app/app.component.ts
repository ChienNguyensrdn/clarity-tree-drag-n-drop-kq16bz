import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ClrDragEvent } from '@clr/angular';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  scrollingInterval: any;
  expandTimeout: any;


  rootDirectory: any[] = [
    {
      id: 1,
      name: "4 Räder wechseln",
      icon: "folder",
      expanded: false,
      sortOrder: 1,
      selected: false,
      files: [
        {
          icon: "calendar",
          name: "4 Räder wechseln",
          active: true,
          parentId: 1
        },
        {
          icon: "line-chart",
          name: "Abnehmen und Aufstecken der Räder",
          active: false,
          parentId: 1
        },
        {
          icon: "dashboard",
          name: "Winterräder auf Beschädigungen überprüfen",
          active: false,
          parentId: 1
        },
        {
          icon: "map",
          name: "Bremsbelag vorne u. hinten (Scheibenbremsen) prüfen",
          active: false,
          parentId: 1
        }
      ]
    },
    {
      id: 2,
      name: "Elektrischer Fahrmotor 0EF",
      icon: "folder",
      expanded: false,
      selected: false,
      sortOrder: 2
    },
    {
      id: 3,
      name: "PBV - Räder wechseln (2)",
      icon: "folder",
      expanded: false,
      sortOrder: 3,
      selected: false,
      files: [
        {
          icon: "image",
          name: "Räderwechsel 2 (PBV)",
          active: false,
          parentId: 3
        }
      ]
    },
    {
      id: 4,
      name: "Bremsen",
      icon: "folder",
      expanded: false,
      sortOrder: 4,
      selected: false,
      files: [
        {
          icon: "image",
          name: "Kontrolle der Bremsanlage",
          active: false,
          parentId: 4
        },
        {
          icon: "image",
          name: "Ersetzen von verschlissenen Komponenten (erst nach Ihrer Freigabe)",
          active: false,
          parentId: 4
        }
      ]
    }
  ];


  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.sort();
  }

  sort() {
    this.rootDirectory = this.rootDirectory.sort((n1, n2) => {
      if (n1.sortOrder > n2.sortOrder) {
        return 1;
      }

      if (n1.sortOrder < n2.sortOrder) {
        return -1;
      }

      return 0;
    });
  }

  onDropBack(dragEvent: ClrDragEvent<any>, targetItem: any) {
    // now idenfitied by parentId --> better instanceOf 
    if (dragEvent.dragDataTransfer.parentId) {
      this.rootDirectory.filter(id => dragEvent.dragDataTransfer.parentId)[0].files.forEach((item, index) => {
        if (item === dragEvent.dragDataTransfer) this.rootDirectory.filter(id => dragEvent.dragDataTransfer.parentId)[0].files.splice(index, 1);
      });
      targetItem.files.push(dragEvent.dragDataTransfer);
      dragEvent.dragDataTransfer.parentId = targetItem.id;
      this.sort();
    }
    if (dragEvent.dragDataTransfer.id !== targetItem.id) {
      const sO = dragEvent.dragDataTransfer.sortOrder;
      dragEvent.dragDataTransfer.sortOrder = targetItem.sortOrder;
      targetItem.sortOrder = sO;
      this.sort();
    }
    clearInterval(this.scrollingInterval);
    this.scrollingInterval = null;
  }

  onDragEnter(dragEvent: ClrDragEvent<any>, targetItem: any) {
    clearInterval(this.scrollingInterval);
    this.scrollingInterval = null;
    if (targetItem !== dragEvent.dragDataTransfer) {
      clearTimeout(this.expandTimeout);
      this.expandTimeout = setTimeout(() => {
        targetItem.expanded = true;
        this.changeDetectorRef.detectChanges();
      }, 2000);
    };
  }

  onDragLeave(dragEvent: ClrDragEvent<any>, targetItem: any) {
    if (dragEvent.dragPosition.pageY >= window.innerHeight) {
      if (!this.scrollingInterval) {
        this.scrollingInterval = setInterval(function (i = dragEvent.dragPosition.pageY) {
          window.scrollTo(0, i);
          i += 10;
        }, 20);
      }
      setTimeout(() => {
        clearTimeout(this.scrollingInterval);
        this.scrollingInterval = null;
      }, 500);
    }
  }

  expandAll() {
    this.rootDirectory.forEach(rootDir => rootDir.expanded = true);
  }
}
