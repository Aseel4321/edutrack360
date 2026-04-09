import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services/services.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {




    constructor(private messagesService: ServicesService) {}
  messages: any[] = [];
  filteredMessages: any[] = [];

  activeTab: string = 'inbox';

  loading = false;
  error = false;

  searchTerm: string = '';



  ngOnInit() {
    this.loadMessages();
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
