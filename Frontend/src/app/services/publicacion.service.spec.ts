import { TestBed } from '@angular/core/testing';
import { Post } from '../interfaces/publicacion';
import { PublicacionService } from './publicacion.service';
import { provideHttpClient, HttpClient } from '@angular/common/http';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('PublicacionService / Prubas para publicaciones', () => {
  let service: PublicacionService;
  let urlTest = 'http://localhost:9000/publicaciones';
  let httpMock: HttpTestingController; // Simula interacciones con http
  let testPost: Post = {
    title: 'Esto es una prueba, esmperamos que funcione',
    content:
      '<h1>Personaliza tu moto: ¡Haz que sea única!</h1><p>¿Cansado de ver la misma moto en todas partes? ¡Es hora de darle un toque personal a tu fiel compañera de dos ruedas! Personalizar tu moto no solo la hace única, sino que también refleja tu estilo y personalidad.</p><h2>Accesorios esenciales para personalizar tu moto</h2>',
    author: 'Jesús Morán',
    category: 'motos',
    createdAt: new Date(),
    image_url: 'https://example_image_url.com.png',
    description: 'Test de Post',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PublicacionService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(PublicacionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterAll(() => {
    httpMock.verify(); // Evalua que despues de todas las pruebas no queden peticiones pendientes
  });

  //Caso de prueba 1
  it('Debería hacer una petición POST para crear una publicación', () => {
    const mockResponse = {
      mensaje: 'Publicación Creada',
      dato: testPost,
    };

    service.postPublicacion(testPost).subscribe((res) => {
      // res va a ser === mockResponse
      expect(res).toEqual(mockResponse);
    });

    // garantizar que la peticion se esta haciendo a la url
    const peticion = httpMock.expectOne(urlTest + '/crear');
    //garantizar el metodo
    expect(peticion.request.method).toBe('POST');

    //ESTO ES LO QUE SIMULA la respuesta del SERVIDOR
    peticion.flush(mockResponse);
  });

  //Caso de prueba 2 GET
  it('Debe consultar las publicaciones existentes', () => {

    const mockPosts = [
      {
        title: 'Esto es una prueba, esmperamos que funcione',
        content:
          '<h1>Personaliza tu moto: ¡Haz que sea única!</h1><p>¿Cansado de ver la misma moto en todas partes? ¡Es hora de darle un toque personal a tu fiel compañera de dos ruedas! Personalizar tu moto no solo la hace única, sino que también refleja tu estilo y personalidad.</p><h2>Accesorios esenciales para personalizar tu moto</h2>',
        author: 'Jesús Morán',
        category: 'motos',
        createdAt: new Date(),
        image_url: 'https://example_image_url.com.png',
        description: 'Test de Post',
      },
      {
        title: 'Esto es una prueba, esmperamos que funcione',
        content:
          '<h1>Personaliza tu moto: ¡Haz que sea única!</h1><p>¿Cansado de ver la misma moto en todas partes? ¡Es hora de darle un toque personal a tu fiel compañera de dos ruedas! Personalizar tu moto no solo la hace única, sino que también refleja tu estilo y personalidad.</p><h2>Accesorios esenciales para personalizar tu moto</h2>',
        author: 'Jesús Morán',
        category: 'motos',
        createdAt: new Date(),
        image_url: 'https://example_image_url.com.png',
        description: 'Test de Post',
      },
      {
        title: 'Esto es una prueba, esmperamos que funcione',
        content:
          '<h1>Personaliza tu moto: ¡Haz que sea única!</h1><p>¿Cansado de ver la misma moto en todas partes? ¡Es hora de darle un toque personal a tu fiel compañera de dos ruedas! Personalizar tu moto no solo la hace única, sino que también refleja tu estilo y personalidad.</p><h2>Accesorios esenciales para personalizar tu moto</h2>',
        author: 'Jesús Morán',
        category: 'motos',
        createdAt: new Date(),
        image_url: 'https://example_image_url.com.png',
        description: 'Test de Post',
      }
    ]

    //Creamos una respuesta falsa (MockResponse) para simular la estrusctura de una respuesta exito http
    const mockResponse = {
      mensaje: "Se encontraron posts",
      numeroPosts: mockPosts.length,
      datos: mockPosts
    }

    service.getPublicacion().subscribe(
      (res) => {
        expect(res).toEqual(mockResponse)
      }
    )

    // garantizar que la peticion se esta haciendo a la url
    const peticion = httpMock.expectOne(urlTest + '/obtener')

    //garantizar el metodo
    expect(peticion.request.method).toBe('GET')

    //ESTO ES LO QUE SIMULA la respuesta del SERVIDOR
    peticion.flush(mockResponse)
  });


  //Caso de prueba 3 GET by ID
  it('Debe consultar la publicacion por su id', () => {

    const mockPost = testPost
    const idTest = "ab367627828278jf378edla89m"

    //Creamos una respuesta falsa (MockResponse) para simular la estrusctura de una respuesta exito http
    const mockResponse = {
      mensaje: "Se encontraró el post",
      datos: mockPost
    }

    service.getPublicacionById(idTest).subscribe(
      (res) => {
        expect(res).toEqual(mockResponse)
      }
    )

    // garantizar que la peticion se esta haciendo a la url
    const peticion = httpMock.expectOne(urlTest + '/obtener/' + idTest)

    //garantizar el metodo
    expect(peticion.request.method).toBe('GET')

    //ESTO ES LO QUE SIMULA la respuesta del SERVIDOR
    peticion.flush(mockResponse)
  });

  //Caso de prueba 4: Actualizar una publicacion por su id / PUT
  it('Debería hacer una petición PUT para actualizar un post', () => {

    const mockPost = testPost
    const idTest = "ab367627828278jf378edla89m"

    const mockResponse = {
      mensaje: "Post actualizado correctamente",
      datos: mockPost
    }

    service.putPublicacion(mockPost, idTest).subscribe(
        (res) => {
            // res va a ser === mockResponse
            expect(res).toEqual(mockResponse)
        }
    )

    // garantizar que la peticion se esta haciendo a la url
    const peticion = httpMock.expectOne(urlTest + '/actualizar/' + idTest)
    //garantizar el metodo
    expect(peticion.request.method).toBe('PUT')

    //ESTO ES LO QUE SIMULA la respuesta del SERVIDOR
    peticion.flush(mockResponse)
});

//Caso de prueba 5 DELETE
it('Debe eliminar la publicacion por su id', () => {

  const mockPost = testPost
  const idTest = "ab367627828278jf378edla89m"

  //Creamos una respuesta falsa (MockResponse) para simular la estrusctura de una respuesta exito http
  const mockResponse = {
    mensaje: "Se eliminó el post"
  }

  service.deletePublicacion(idTest).subscribe(
    (res) => {
      expect(res).toEqual(mockResponse)
    }
  )

  // garantizar que la peticion se esta haciendo a la url
  const peticion = httpMock.expectOne(urlTest + '/eliminar/' + idTest)

  //garantizar el metodo
  expect(peticion.request.method).toBe('DELETE')

  //ESTO ES LO QUE SIMULA la respuesta del SERVIDOR
  peticion.flush(mockResponse)
});
});
