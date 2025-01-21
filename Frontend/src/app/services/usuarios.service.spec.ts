import { TestBed } from '@angular/core/testing';
import { Usuarios } from '../interfaces/usuarios';
import { UsuariosService } from './usuarios.service';
import { provideHttpClient } from '@angular/common/http';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('UsuariosService', () => {
  let service: UsuariosService;
  let httpMock: HttpTestingController;
  const urlTest = 'http://localhost:9000/usuarios';
  const emailTest = 'jame291104@test.com';
  const passwordTest = '123';
  const tokenTest = 'ab367627828278jf378edla89m';
  const fullName = 'Jesús Morán';
  const testUser: Usuarios = {
    username: "jame291104",
    email: "jame291104@gmail.com",
    password: "123456789"
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UsuariosService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(UsuariosService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterAll(() => {
    httpMock.verify(); // Evalua que despues de todas las pruebas no queden peticiones pendientes
  });

  // Caso de prueba GET
  it('Deberia hacer una peticion get para mostrar los usuarios almacenados en la db', () => {

    //Creamos usuarios Mock (Falsos) para simular la respuesta exitosa de una DB
    const mockUsers = [
      {
        fullName: 'Jesús',
        email: 'jesus@test.com',
        password: "123"
      },
      {
        fullName: 'Jesús',
        email: 'jesus@test.com',
        password: "123"
      },
      {
        fullName: 'Jesús',
        email: 'jesus@test.com',
        password: "123"
      },
      {
        fullName: 'Jesús',
        email: 'jesus@test.com',
        password: "123"
      }
    ]

    //Creamos una respuesta falsa (MockResponse) para simular la estrusctura de una respuesta exito http
    const mockResponse = {
      mensaje: "Se encontraron usuarios",
      numeroUsuarios: mockUsers.length,
      datos: mockUsers
    }

    //Usamos la funcion GET del usuariosService
    service.getUsuarios().subscribe(
      (res) => {
        //Definimos lo que esperamos de la petición
        expect(res).toEqual(mockResponse)
      }
    )

    // garantizar que la peticion se esta haciendo a la url
    const peticion = httpMock.expectOne(urlTest + '/obtener')

    //garantizar el metodo
    expect(peticion.request.method).toBe('GET')

    //ESTO ES LO QUE SIMULA la respuesta del SERVIDOR
    peticion.flush(mockResponse)

  })

  it('Debería hacer una petición POST para crear un usuario', () => {
    const mockResponse = {
      mensaje: "Usuario creado correctamente",
      datos: testUser
    }

    service.postUsuarios(testUser).subscribe(
        (res) => {
            // res va a ser === mockResponse
            expect(res).toEqual(mockResponse)
        }
    )

    // garantizar que la peticion se esta haciendo a la url
    const peticion = httpMock.expectOne(urlTest + '/crear')
    //garantizar el metodo
    expect(peticion.request.method).toBe('POST')

    //ESTO ES LO QUE SIMULA la respuesta del SERVIDOR
    peticion.flush(mockResponse)
});
});
