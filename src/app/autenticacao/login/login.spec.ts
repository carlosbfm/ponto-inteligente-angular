import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Necessário para evitar erros de animação

// IMPORTANTE: Aqui importamos a CLASSE do componente (LoginComponent)
// e pegamos do arquivo './login' (já que você ainda não renomeou o arquivo)
import { LoginComponent } from './login.component'; 

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // No Angular Standalone, importamos o componente direto aqui:
      imports: [ 
        LoginComponent,
        BrowserAnimationsModule 
      ] 
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});