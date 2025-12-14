import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroPfComponent } from './cadastro-pf.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CadastroPf', () => {
  let component: CadastroPfComponent;
  let fixture: ComponentFixture<CadastroPfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroPfComponent,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroPfComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
