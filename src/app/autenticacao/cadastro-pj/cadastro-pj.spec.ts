import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroPjComponent } from './cadastro-pj.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CadastroPj', () => {
  let component: CadastroPjComponent;
  let fixture: ComponentFixture<CadastroPjComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroPjComponent,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroPjComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
