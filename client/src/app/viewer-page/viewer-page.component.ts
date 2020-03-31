import { Component, OnInit } from '@angular/core';
import { NotesService } from '../services/notes.service';
import { Note } from '../note/note';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-viewer-page',
  templateUrl: './viewer-page.component.html',
  styleUrls: ['./viewer-page.component.scss']
})

export class ViewerPageComponent implements OnInit {

  public notes: Note[];
  getNotesSub: Subscription;

  constructor(private notesService: NotesService) {}

  retrieveNotes(): void {
    this.unsub();
    this.getNotesSub = this.notesService.getNotes().subscribe(returnedNotes =>{
      this.notes = returnedNotes;
    }, err => {
      console.log(err);
    });
  }

  ngOnInit(): void {
    this.retrieveNotes();
  }

  ngOnDestroy(): void {
    this.unsub();
  }

  unsub(): void {
    if (this.getNotesSub) {
      this.getNotesSub.unsubscribe();
    }
  }

}
