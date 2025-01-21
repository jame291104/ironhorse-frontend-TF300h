import { TestBed } from '@angular/core/testing';
import { LoginService } from './login.service';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';
import { provideToastr } from 'ngx-toastr';

//Definimos nuestro bloque de prueba
describe('Prubas para el servicio de login', () => {
  let service: LoginService; // Definimos nuestro servicio -> el nombre puede ser personalizado
  let httpMock: HttpTestingController; // Simula interacciones con http
  const urlTestLogin = 'http://localhost:9000/login'; // url del backend a la que debe apuntar la petición
  const urlTestRegister = 'http://localhost:9000/usuarios/crear'; // url del backend a la que debe apuntar la petición
  //Creamos variables que almacenan los valores de prueba para los parametros que necesita la petición
  const emailTest = 'jame291104@test.com';
  const passwordTest = '123';
  const tokenTest = 'ab367627828278jf378edla89m';
  const testUser = {
      username: "jame291104",
      email: "jame291104@gmail.com",
      password: "123456789"
    }

  // beforeEch y afterAll -> configuración global
  beforeEach(() => {
    TestBed.configureTestingModule({
      //todo lo que necesitamos injectar / Proveedores, importaciones, servicios o componente y demas
      providers: [
        LoginService,
        provideHttpClient(),
        provideHttpClientTesting(),
        provideToastr()
      ],
    });

    //Injección de servicios
    service = TestBed.inject(LoginService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterAll(() => {
    httpMock.verify(); // Evalua que despues de todas las pruebas no queden peticiones pendientes
  });

  //CASOS DE PRUEBA

  //Caso de prueba 1
  it('Debería hacer una petición POST para iniciar sesión', () => {
    const mockResponse = {
      mensaje: 'Inicio de sesión exitoso',
    };

    service.inicioSesion({emailLogin: emailTest, passwordLogin: passwordTest}).subscribe((res) => {
      // res va a ser === mockResponse
      expect(res).toEqual(mockResponse);
    });

    // garantizar que la peticion se esta haciendo a la url
    const peticion = httpMock.expectOne(urlTestLogin);
    //garantizar el metodo
    expect(peticion.request.method).toBe('POST');

    //ESTO ES LO QUE SIMULA la respuesta del SERVIDOR
    peticion.flush(mockResponse);
  });

  //Caso de prueba 2
  it('Debería obtener el token almacenado en el localStorage', () => {
    localStorage.setItem('token', tokenTest); // Esto es lo que estoy guardando en el localStorage
    expect(service.obtenerToken()).toBe(tokenTest);
  });

  //Caso de prueba 3
  it('Debería verificar si el user est logueado', () => {
    //Tenemos token
    localStorage.setItem('token', tokenTest);
    expect(service.estaLogueado()).toBeTrue();
  });

  //Caso de prueba 4
  it('Debería cerrar sesión', () => {
    service.cierreSesion();
    expect(localStorage.getItem('token')).toBeNull();
  });

  //Caso de prueba 5
  it('Debería hacer una petición POST para registrarse', () => {
    const mockResponse = {
      mensaje: 'Registro exitoso',
      dato: testUser,
    };

    service.registroUsuario({username: testUser.username, email: testUser.email, password: testUser.password}).subscribe((res) => {
      // res va a ser === mockResponse
      expect(res).toEqual(mockResponse);
    });

    // garantizar que la peticion se esta haciendo a la url
    const peticion = httpMock.expectOne(urlTestRegister);
    //garantizar el metodo
    expect(peticion.request.method).toBe('POST');

    //ESTO ES LO QUE SIMULA la respuesta del SERVIDOR
    peticion.flush(mockResponse);
  });
});
