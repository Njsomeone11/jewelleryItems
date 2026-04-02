import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JewelleryService } from './services/jewelleryService';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  imports: [CommonModule, FormsModule],
})
export class App implements OnInit {
  items: any[] = [];
  filteredItems: any[] = [];
  metalItems: any[] = [];
  taxes: any[] = [];

  form: any = {};
  calculatedPrice: number = 0;
  selectedMetalFilter: string = '';
  showModal: boolean = false;

  constructor(private jewelleryService: JewelleryService) {}

  ngOnInit() {
    this.loadAllData();
  }

  loadAllData() {
    this.jewelleryService.getAllData().subscribe((res: any) => {
      this.items = res.jewelleryItems || [];
      this.metalItems = res.metalItems || [];
      this.taxes = res.taxes || [];
    });
  }

  getTax(item: any) {
    return this.taxes.find((t) => t.id == item.taxId);
  }

  saveItem() {
    if (!this.form.name || !this.form.metalType || !this.form.quantity) {
      alert('Please fill all required fields');
      return;
    }

    const isEdit = !!this.form.id;
    const obs = isEdit
      ? this.jewelleryService.updateItem(this.form.id, this.form)
      : this.jewelleryService.createItem(this.form);

    this.showModal = false;

    obs.subscribe({
      next: (res: any) => {
        if (isEdit) {
          const index = this.items.findIndex((i) => i.id === this.form.id);
          this.items[index] = this.form;
        } else {
          this.items.push(res);
        }
        this.loadAllData();
        this.afterSave();
        this.showModal = false;
      },
      error: (err) => console.error(err),
    });
  }

  afterSave() {
    this.form = { shippingCharges: 50, availability: 1 };
    this.calculatedPrice = 0;
  }

  editItem(item: any) {
    this.form = { ...item };
    this.calculatedPrice = item.finalPrice;
    this.showModal = true;
  }

  deleteItem(id: number) {
    this.jewelleryService.deleteItem(id).subscribe({
      next: () => {
        this.loadAllData();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  openModal() {
    this.form = {
      name: '',
      metalType: '',
      quantity: '',
      shippingCharges: 50,
      taxId: null,
      availability: 1,
    };
    this.calculatedPrice = 0;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  calculatePrice() {
    if (!this.form.metalType || !this.form.quantity) return;

    const metal = this.metalItems.find((m) => m.item === this.form.metalType);
    if (!metal) return;

    const basePrice = this.form.quantity * metal.pricePerGram;
    const making = this.form.quantity * (metal.baseMakingCharge || 0);
    const shipping = 50;

    let total = basePrice + making + shipping;

    const tax = this.taxes.find((t) => t.id == this.form.taxId);
    if (tax) total += (total * tax.percentage) / 100;

    this.calculatedPrice = parseFloat(total.toFixed(2));

    this.form.finalPrice = this.calculatedPrice;
    this.form.makingCharges = making;
    this.form.shippingCharges = shipping;
  }

  applyFilter() {
    this.filteredItems = this.selectedMetalFilter
      ? this.items.filter((item) => item.metalType === this.selectedMetalFilter)
      : [...this.items];
  }

  sortItems(event: any) {
    const value = event.target.value;
    if (value === 'priceAsc') {
      this.filteredItems.sort((a, b) => a.finalPrice - b.finalPrice);
    } else if (value === 'priceDesc') {
      this.filteredItems.sort((a, b) => b.finalPrice - a.finalPrice);
    }
  }
}
