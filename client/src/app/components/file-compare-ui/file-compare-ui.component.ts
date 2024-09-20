import { Component } from '@angular/core';
import { FileCompareService } from './../../service/file-compare.service';

@Component({
  selector: 'app-file-compare-ui',
  templateUrl: './file-compare-ui.component.html',
  styleUrls: ['./file-compare-ui.component.css'],
})
export class FileCompareUiComponent {
  file1: File | null = null;
  file2: File | null = null;
  error: string | null = null;
  comparisonResult: any;

  constructor(private fileCompare: FileCompareService) {}

  onFileChange(event: any, fileField: string) {
    const file = event.target.files[0];
    if (!file || !this.validateFile(file)) {
      this.error = 'Invalid file type. Please upload .txt or .pdf files.';
      return;
    }
    if (fileField === 'file1') {
      this.file1 = file;
    } else if (fileField === 'file2') {
      this.file2 = file;
    }
    this.error = null;
  }

  validateFile(file: File) {
    const allowedExtensions = ['txt', 'pdf'];
    const fileExtension = file.name.split('.').pop();
    return allowedExtensions.includes(fileExtension || '');
  }

  onSubmit() {
    console.log(this.file1);
    console.log(this.file2);
    if (!this.file1 || !this.file2) {
      this.error = 'Please select both files.';
      return;
    }

    const formData = new FormData();
    formData.append('file1', this.file1);
    formData.append('file2', this.file2);

    this.fileCompare.compareFiles(formData).subscribe({
      next: (response: any) => {
        this.comparisonResult = response.differences;
      },
      error: (err:any) => {
        this.error = 'An error occurred while comparing files.';
      },
    });
  }
}
