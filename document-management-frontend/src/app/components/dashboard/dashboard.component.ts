import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule], // Add this line
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  documents = [
    { id: 1, name: 'Doc 1', title: 'Project Plan', status: 'Approved' },
    { id: 2, name: 'Doc 2', title: 'Financial Report', status: 'Pending' }
  ];

  verify(id: number) {
    console.log('Verifying document', id);
  }
}

