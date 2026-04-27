import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  form!: FormGroup;
  isEdit = false;

  constructor(private fb: FormBuilder,private alertCtrl: AlertController) {}

originalData: any;

ngOnInit() {
  this.form = this.fb.group({
    name: ['Al Noor School'],
    address: ['Amman'],
    phone: ['0790000000']
  });
}



toggleEdit() {
  this.isEdit = true;

  // حفظ نسخة قبل التعديل
  this.originalData = this.form.value;
}

cancelEdit() {
  this.form.patchValue(this.originalData); // يرجع القيم القديمة
  this.isEdit = false;
}

save() {
  console.log('Updated:', this.form.value);
  this.isEdit = false;
}

// حذف
async deleteSchool() {
  const alert = await this.alertCtrl.create({
    header: 'تأكيد الحذف',
    message: 'هل أنت متأكد أنك تريد حذف المدرسة؟',
    buttons: [
      {
        text: 'إلغاء',
        role: 'cancel'
      },
      {
        text: 'حذف',
        role: 'destructive',
        handler: () => {
          console.log('تم الحذف');
          // هون تحط API delete
        }
      }
    ]
  });

  await alert.present();
}}
