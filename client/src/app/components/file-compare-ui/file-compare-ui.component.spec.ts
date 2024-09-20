import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FileCompareUiComponent } from './file-compare-ui.component';
import { FormsModule } from '@angular/forms';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';

describe('FileCompareUiComponent', () => {
  let component: FileCompareUiComponent;
  let fixture: ComponentFixture<FileCompareUiComponent>;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FileCompareUiComponent],
      imports: [MatInputModule,MatButtonModule, MatGridListModule,  FormsModule, HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(FileCompareUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpMock = TestBed.inject(HttpTestingController);
  });


  it('should successfully compare files', () => {
    const fixture = TestBed.createComponent(FileCompareUiComponent);
    const app = fixture.componentInstance;

    // Mock files
    const file1 = new File(['file content 1'], 'file1.txt');
    const file2 = new File(['file content 2'], 'file2.txt');

    app.file1 = file1;
    app.file2 = file2;
    app.onSubmit();

    const req = httpMock.expectOne('http://localhost:3000/compare');
    expect(req.request.method).toBe('POST');
    req.flush({ differences: 'Some differences' });

    expect(app.comparisonResult).toBe('Some differences');
  });

  it('should display an error for invalid file types', () => {
    const fixture = TestBed.createComponent(FileCompareUiComponent);
    const app = fixture.componentInstance;

    const invalidFile = new File(['content'], 'file.doc');

    app.onFileChange({ target: { files: [invalidFile] } }, 'file1');
    expect(app.error).toBe('Invalid file type. Please upload .txt or .pdf files.');
  });
});
