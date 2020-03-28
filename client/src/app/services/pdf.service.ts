import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import * as jsPDF from 'jspdf';


@Injectable()
export class PDFService {
  constructor() {
  }

  /**
   * Returns a jsPDF object with a link to Professor Rachel's
   * DoorBoard viewer page.
   */
  getPDF(): jsPDF {
    const url: string = environment.BASE_URL + '/viewers';

    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'in',
      format: 'letter',
    });

    doc.setFontSize(18);
    doc.text('Rachel Johnson\'s DoorBoard', (8.5 / 2), 4, { align: 'center' });
    doc.text(url, (8.5 / 2), 4.5, { align: 'center' });

    return doc;
  }
}
