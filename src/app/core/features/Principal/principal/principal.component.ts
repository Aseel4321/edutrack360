import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  activeTab = 'dashboard'; // صحح الاسم ليتطابق مع route

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {this.activeTab = 'dashbord';
    // عند التحميل يمكن إعادة توجيه للـ dashboard تلقائيًا
    this.router.navigate(['dashboard'], { relativeTo: this.activatedRoute });
  }

  setActiveTab(tab: string, route: string) {
    if (this.activeTab === tab) return; // لا تعيد التنقل لنفس الـ tab
    this.activeTab = tab;
    this.router.navigate([route], { relativeTo: this.activatedRoute }); // ✅ relative
  }
}