import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { UserService, User } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch users', () => {
    const mockUsers: User[] = [
      { id: 1, name: 'Leanne Graham', email: 'leanne@example.com', username: 'bret' },
      { id: 2, name: 'Ervin Howell', email: 'ervin@example.com', username: 'antonette' },
    ];

    service.getUsers().subscribe((users: User[]) => {
      expect(users.length).toBe(2);
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  it('should fetch a single user by id', () => {
    const mockUser: User = {
      id: 1,
      name: 'Leanne Graham',
      email: 'leanne@example.com',
      username: 'bret',
    };

    service.getUser(1).subscribe((user: User) => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });

  it('should handle network error', () => {
    service.getUsers().subscribe({
      error: (error: { status: number }) => {
        expect(error.status).toBe(500);
      },
    });

    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
    req.flush('Server error', { status: 500, statusText: 'Internal Server Error' });
  });
});
