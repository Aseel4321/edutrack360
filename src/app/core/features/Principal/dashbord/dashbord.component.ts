import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services/services.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {

    constructor(private messagesService:ServicesService,private router: Router, private activatedRoute: ActivatedRoute) {}
  messages: any[] = [];
  filteredMessages: any[] = [];

  activeTab: string = 'inbox';

  loading = false;
  error = false;

  searchTerm: string = '';
 

schools = [
    { name: 'Oxford School', code: 'OXF123' },
    { name: 'Al Amal School', code: 'AML456' },
    { name: 'Future Academy', code: 'FTR789' }
  ];


  // 🔥 هذا هو المهم (كان ناقصك)
  filteredSchools: any[] = [];



  filterSchools() {
    const term = this.searchTerm.toLowerCase();

    this.filteredSchools = this.schools.filter(school =>
      school.name.toLowerCase().includes(term) ||
      school.code.toLowerCase().includes(term)
    );
  }


addSchool() {
  console.log('Add school clicked');
}
  ngOnInit() {
    this.loadMessages();    this.filteredSchools = [...this.schools];
  }
 setActiveTab(tab: string, route: string) {
    if (this.activeTab === tab) return; // لا تعيد التنقل لنفس الـ tab
    this.activeTab = tab;
    this.router.navigate([route], { relativeTo: this.activatedRoute }); // ✅ relative
  }
  // =========================
  // Load Messages
  // =========================
  loadMessages() {
    this.loading = true;
    this.error = false;

    this.messagesService.getMessages(this.activeTab).subscribe({
      next: (res) => {
        this.messages = res;
        this.applyFilter();
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = true;
        this.loading = false;
      }
    });
  }

  // =========================
  // Change Tab
  // =========================
  onTabChange() {
    this.loadMessages();
  }

  // =========================
  // Search
  // =========================
  onSearch(event: any) {
    this.searchTerm = event.detail.value;
    this.applyFilter();
  }

  applyFilter() {
    if (!this.searchTerm) {
      this.filteredMessages = this.messages;
      return;
    }

    const term = this.searchTerm.toLowerCase();

    this.filteredMessages = this.messages.filter(msg =>
      msg.sender?.toLowerCase().includes(term) ||
      msg.content?.toLowerCase().includes(term)
    );
  }
}
