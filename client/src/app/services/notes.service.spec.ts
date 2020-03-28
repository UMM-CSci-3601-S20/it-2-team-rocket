import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Note } from './note';
import { NotesService } from './notes.service';

describe('Note service:', () => {

  const testNotes: Note[] = [
    {
      _id: 'first_id',
      body: 'This is the first note'
    },
    {
      _id: 'second_id',
      body: 'This is the second note'
    },
    {
      _id: 'third_id',
      body: 'This is the third note'
    },
  ];
  let noteService: NotesService;
  // These are used to mock the HTTP requests so that we (a) don't have to
  // have the server running and (b) we can check exactly which HTTP
  // requests were made to ensure that we're making the correct requests.
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    // Set up the mock handling of the HTTP requests
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    // Construct an instance of the service with the mock
    // HTTP client.
    noteService = new NotesService(httpClient);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  describe('The getNotes() method:', () => {
    it('calls api/notes', () => {
      noteService.getNotes().subscribe(
        notes => expect(notes).toBe(testNotes)
      );

      const req = httpTestingController.expectOne(noteService.noteUrl);
      expect(req.request.method).toEqual('GET');
      req.flush(testNotes);
    });
  });

  describe('The getNoteById() method:', () => {
    it('calls api/notes/:id', () => {
      noteService.getNoteById('testid').subscribe(
        note => expect(note).toBe(testNotes[2])
      );

      const req = httpTestingController.expectOne(noteService.noteUrl + '/testid');
      expect(req.request.method).toEqual('GET');
      req.flush(testNotes[2]);
    });
  });


  describe('The addNote() method:', () => {
    it('calls api/notes/new', () => {

      noteService.addNote(testNotes[1]).subscribe(
        id => expect(id).toBe('testid')
      );

      const req = httpTestingController.expectOne(noteService.noteUrl + '/new');

      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(testNotes[1]);

      req.flush({id: 'testid'});
    });
  });

  describe('The deleteNote() method:', () => {
    it('calls DELETE on api/notes/:id', async () => {
      const id = 'Hi! I\'m an ID';
      // We need an empty `subscribe` block to make sure the delete request
      // is actually sent.
      noteService.deleteNote(id).subscribe(result => {});

      const req = httpTestingController.expectOne(noteService.noteUrl + '/' + encodeURI(id));
      expect(req.request.method).toEqual('DELETE');
      req.flush('deleted');
    });

    it('returns true if the server says "deleted"', () => {
      const id = 'This is totes a legit ID';
      noteService.deleteNote(id).subscribe(
        wasAnythingDeleted => expect(wasAnythingDeleted).toBe(true)
      );

      const req = httpTestingController.expectOne(noteService.noteUrl + '/' + encodeURI(id));
      req.flush('deleted');
    });

    it('returns false if the server says "nothing deleted"', () => {
      const id = 'This ID is bogus, man';
      noteService.deleteNote(id).subscribe(
        wasAnythingDeleted => expect(wasAnythingDeleted).toBe(false)
      );

      const req = httpTestingController.expectOne(noteService.noteUrl + '/' + encodeURI(id));
      req.flush('nothing deleted');
    });
  });

  describe('The editNote() method:', () => {
    it('calls api/notes/edit/:id', () => {
      const newNote = {
        body: 'We sailed on the Sloop John B / My grandfather and me'
      } as Note;

      noteService.editNote(newNote, 'testid').subscribe(
        id => expect(id).toBe('testid')
      );

      const req = httpTestingController.expectOne(noteService.noteUrl + '/edit/testid');

      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(newNote);

      req.flush({id: 'testid'});
    });
  });
});
