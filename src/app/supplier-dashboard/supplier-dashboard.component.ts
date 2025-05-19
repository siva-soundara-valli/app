import { Component, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgChartsModule, NgChartsConfiguration } from 'ng2-charts';
import { ChartType, ChartConfiguration } from 'chart.js';
import { MatPaginator } from '@angular/material/paginator';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { LegendPosition } from '@swimlane/ngx-charts';

import { NgxChartsModule } from '@swimlane/ngx-charts';

interface Supplier {
  id: string;
  name: string;
  commodity: string;
  region: string;
  buyer: string;
  department: string;
  type: string;
  status: 'Approved' | 'Rejected';
  feedback?: string;
  modifiedDate: string;
  selected?: boolean;
}

@Component({
  selector: 'app-supplier-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
    MatCheckboxModule,
    NgChartsModule,
    NgxChartsModule,
  ],
  //   providers: [
  //   {
  //     provide: NgChartsConfiguration,
  //     useValue: {
  //       generateColors: false  // disables ng2-charts from auto-assigning default colors to datasets
  //     }
  //   }
  // ],

  templateUrl: './supplier-dashboard.component.html',
  styleUrls: ['./supplier-dashboard.component.css'],
})
export class SupplierDashboardComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  isBrowser = false;
  legendPos: LegendPosition = LegendPosition.Right;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  lastRefresh!: Date; // declared
  //  barChartData = [
  //     { name: 'Approved', value: 7 },
  //     { name: 'Rejected', value: 8 }
  //   ];

  // barChartData = [
  //     { name: 'Approved', value: 850 },
  //     { name: 'Rejected', value: 150 },
  //   ];

  // ─── COLOUR SCHEME ───────────────────────────────────────────────────────────
  colorScheme: Color = {
    name: 'supplierValidation',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#18a118', '#7d0000'], // bright green • dark red
  };

  // ─── AXIS LABELS ─────────────────────────────────────────────────────────────
  xAxisLabel = 'Date';
  yAxisLabel = 'Supplier Validation';
  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [''],
    datasets: [
      {
        data: [7],
        label: 'Approved',
        backgroundColor: 'green',
        barThickness: 20, // reduce bar width
      },
      {
        data: [8],
        label: 'Rejected',
        backgroundColor: 'red',
        barThickness: 20, // reduce bar width
      },
    ],
  };

  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,

    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
        grid: { display: false },
      },
      y: {
        title: {
          display: true,
          text: 'Supplier Validation',
        },
        beginAtZero: true,
        max: 15,
      },
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#000',
        },
      },
    },
  };

  ngOnInit(): void {
    this.lastRefresh = new Date(); // set when Angular bootstraps after a page reload
  }
  search = '';
  filterBy = '';
  supplierView = 'request';
  fromDate = '';
  toDate = '';
  suppliers: Supplier[] = [
    {
      id: 'SCAS001',
      name: 'Random 1',
      commodity: 'BG',
      region: 'CHI',
      buyer: 'Buyer 1',
      department: 'Raw',
      type: 'Rescan',
      status: 'Rejected',
      feedback: 'Error',
      modifiedDate: '2025-05-18',
    },
    {
      id: 'SCAS002',
      name: 'Random 2',
      commodity: 'BG',
      region: 'CHI',
      buyer: 'Buyer 1',
      department: 'Raw',
      type: 'Rescan',
      status: 'Approved',
      feedback: 'View Report',
      modifiedDate: '2025-05-18',
    },
    {
      id: 'SCAS003',
      name: 'Random 3',
      commodity: 'SB',
      region: 'CHI',
      buyer: 'Buyer 2',
      department: 'Finished',
      type: 'Initial',
      status: 'Rejected',
      feedback: 'Error',
      modifiedDate: '2025-05-18',
    },
    {
      id: 'SCAS004',
      name: 'Random 4',
      commodity: 'BG',
      region: 'CHI',
      buyer: 'Buyer 3',
      department: 'Raw',
      type: 'Rescan',
      status: 'Approved',
      feedback: 'View Report',
      modifiedDate: '2025-05-18',
    },
    {
      id: 'SCAS005',
      name: 'Random 5',
      commodity: 'SB',
      region: 'CHI',
      buyer: 'Buyer 4',
      department: 'Finished',
      type: 'Initial',
      status: 'Rejected',
      feedback: 'Error',
      modifiedDate: '2025-05-18',
    },
    {
      id: 'SCAS006',
      name: 'Random 6',
      commodity: 'BG',
      region: 'CHI',
      buyer: 'Buyer 5',
      department: 'Raw',
      type: 'Rescan',
      status: 'Approved',
      feedback: 'View Report',
      modifiedDate: '2025-05-18',
    },
    {
      id: 'SCAS007',
      name: 'Random 7',
      commodity: 'SB',
      region: 'CHI',
      buyer: 'Buyer 2',
      department: 'Finished',
      type: 'Initial',
      status: 'Rejected',
      feedback: 'Error',
      modifiedDate: '2025-05-18',
    },
    {
      id: 'SCAS008',
      name: 'Random 8',
      commodity: 'BG',
      region: 'CHI',
      buyer: 'Buyer 1',
      department: 'Raw',
      type: 'Rescan',
      status: 'Approved',
      feedback: 'View Report',
      modifiedDate: '2025-05-18',
    },
    {
      id: 'SCAS009',
      name: 'Random 9',
      commodity: 'SB',
      region: 'CHI',
      buyer: 'Buyer 3',
      department: 'Finished',
      type: 'Initial',
      status: 'Rejected',
      feedback: 'Error',
      modifiedDate: '2025-05-18',
    },
    {
      id: 'SCAS010',
      name: 'Random 10',
      commodity: 'BG',
      region: 'CHI',
      buyer: 'Buyer 4',
      department: 'Raw',
      type: 'Rescan',
      status: 'Approved',
      feedback: 'View Report',
      modifiedDate: '2025-05-18',
    },
    {
      id: 'SCAS011',
      name: 'Random 11',
      commodity: 'SB',
      region: 'CHI',
      buyer: 'Buyer 5',
      department: 'Finished',
      type: 'Initial',
      status: 'Rejected',
      feedback: 'Error',
      modifiedDate: '2025-05-18',
    },
    {
      id: 'SCAS012',
      name: 'Random 12',
      commodity: 'BG',
      region: 'CHI',
      buyer: 'Buyer 2',
      department: 'Raw',
      type: 'Rescan',
      status: 'Approved',
      feedback: 'View Report',
      modifiedDate: '2025-05-18',
    },
    {
      id: 'SCAS013',
      name: 'Random 13',
      commodity: 'SB',
      region: 'CHI',
      buyer: 'Buyer 3',
      department: 'Finished',
      type: 'Initial',
      status: 'Rejected',
      feedback: 'Error',
      modifiedDate: '2025-05-18',
    },
    {
      id: 'SCAS014',
      name: 'Random 14',
      commodity: 'BG',
      region: 'CHI',
      buyer: 'Buyer 4',
      department: 'Raw',
      type: 'Rescan',
      status: 'Approved',
      feedback: 'View Report',
      modifiedDate: '2025-05-18',
    },
    {
      id: 'SCAS015',
      name: 'Random 15',
      commodity: 'SB',
      region: 'CHI',
      buyer: 'Buyer 5',
      department: 'Finished',
      type: 'Initial',
      status: 'Rejected',
      feedback: 'Error',
      modifiedDate: '2025-05-18',
    },
  ];

   visible = true;

  errors = [
    {
      section: '',
      items: [
        { label: 'Duplicate', pass: false, error: 'Already data is available in database!' }
      ]
    },
    {
      section: 'Government portal validation',
      items: [
        { label: 'GST', pass: false, error: 'Invalid GST Number !' },
        { label: 'MSME', pass: false },
        { label: 'CIN', pass: false }
      ]
    },
    {
      section: 'Field validation',
      items: [
        { label: 'Year of Establishment', pass: false }
      ]
    }
  ];

  close() {
    this.visible = false;
  }

  dataSource = new MatTableDataSource(this.suppliers);

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  get totalValidated() {
    return this.suppliers.length;
  }

  get totalApproved() {
    return this.suppliers.filter((s) => s.status === 'Approved').length;
  }

  get totalRejected() {
    return this.suppliers.filter((s) => s.status === 'Rejected').length;
  }

  get filteredSuppliers() {
    return this.suppliers.filter(
      (s) =>
        !this.search ||
        s.id.toLowerCase().includes(this.search.toLowerCase()) ||
        s.name.toLowerCase().includes(this.search.toLowerCase())
    );
  }

//   get filteredSuppliers(): Supplier[] {
//   return this.suppliers.filter(s => s.includes(this.supplierSearch));
// }

  selectAll(event: any) {
    this.filteredSuppliers.forEach((s) => (s.selected = event.checked));
  }

  submit() {
    const selected = this.suppliers.filter((s) => s.selected);
    alert(`Submitting ${selected.length} selected records`);
  }
   showFilter = false;

  supplierSearch = '';
  supplier = ['Buyer 1', 'Buyer 2', 'Buyer 3'];
  departments = ['Finance', 'Logistics'];

  selectedSuppliers: string[] = [];
  selectedDepartments: string[] = [];

  toggleFilterDropdown() {
    this.showFilter = !this.showFilter;
  }

  // filteredSuppliers() {
  //   return this.suppliers.filter(s =>
  //     s.toLowerCase().includes(this.supplierSearch.toLowerCase())
  //   );
  // }

  updateFilter() {
    // Live filtering logic here if needed
  }

  clearFilter() {
    this.selectedSuppliers = [];
    this.selectedDepartments = [];
    this.showFilter = false;
  }

  applyFilter() {
    const filters = {
      suppliers: this.selectedSuppliers,
      departments: this.selectedDepartments,
    };
    console.log('Filters applied:', filters);
    this.showFilter = false;
    // Emit filter event or apply to data
  }
}
