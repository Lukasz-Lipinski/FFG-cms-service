# TypeScript Backend Development Instructions

**For: NestJS Backend Services | Role: Senior TypeScript Developer**

---

## Typing Requirements

### 1. Explicit Return Types (MANDATORY)

**All functions, methods, and lambda functions MUST have explicit return types:**

```typescript
// ✅ CORRECT
export class UserService {
  getUser(id: string): User {
    return this.userRepository.findById(id);
  }

  getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  mapUsers(users: User[]): User[] {
    return users.map((user): User => ({ ...user }));
  }

  async fetchData(): Promise<void> {
    await this.api.getData();
  }

  private calculateTotal(items: Item[]): number {
    return items.reduce((sum, item): number => sum + item.value, 0);
  }
}

// ❌ WRONG - No return type
export class UserService {
  getUser(id: string) {
    return this.userRepository.findById(id);
  }

  mapUsers(users) {
    return users.map((user) => user);
  }
}
```

### 2. Eliminate `any` Type Completely

**Never use `any` type. Use specific types or generics:**

```typescript
// ✅ CORRECT
export function parse<T>(data: string): T {
  return JSON.parse(data);
}

export function handleResponse<T extends object>(response: T): void {
  console.log(response);
}

public processData(data: Record<string, unknown>): string {
  return JSON.stringify(data);
}

// ❌ WRONG
export function parse(data: any): any {
  return JSON.parse(data);
}

public processData(data: any): any {
  return data;
}
```

### 3. Strict Configuration

TypeScript configuration must be strict:

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true
  }
}
```

---

## SOLID Principles

### 1. Single Responsibility Principle (SRP)

**Each class/function has one reason to change:**

```typescript
// ✅ CORRECT - Separate concerns
@Injectable()
export class UserRepository {
  constructor(private db: DatabaseService) {}

  findById(id: string): Promise<User> {
    return this.db.query<User>('SELECT * FROM users WHERE id = ?', [id]);
  }
}

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getUser(id: string): Promise<User> {
    return this.userRepository.findById(id);
  }
}

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.userService.getUser(id);
  }
}

// ❌ WRONG - Mixed responsibilities
@Controller('users')
export class UserController {
  constructor(private db: DatabaseService) {}

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    const user = await this.db.query('SELECT * FROM users WHERE id = ?', [id]);
    // Validation logic mixed in
    if (!user) throw new Error('Not found');
    // Business logic mixed in
    return this.sendEmail(user.email);
  }
}
```

### 2. Open/Closed Principle (OCP)

**Open for extension, closed for modification:**

```typescript
// ✅ CORRECT
interface Logger {
  log(message: string): void;
}

@Injectable()
export class ConsoleLogger implements Logger {
  log(message: string): void {
    console.log(message);
  }
}

@Injectable()
export class FileLogger implements Logger {
  log(message: string): void {
    fs.appendFileSync('app.log', message);
  }
}

@Injectable()
export class LoggingService {
  constructor(private logger: Logger) {}

  info(message: string): void {
    this.logger.log(`[INFO] ${message}`);
  }
}
```

### 3. Liskov Substitution Principle (LSP)

**Derived classes must be substitutable for base classes:**

```typescript
// ✅ CORRECT
abstract class PaymentProcessor {
  abstract process(amount: number): Promise<PaymentResult>;
}

@Injectable()
export class StripePaymentProcessor extends PaymentProcessor {
  async process(amount: number): Promise<PaymentResult> {
    // Stripe implementation
    return { success: true, transactionId: '...' };
  }
}

@Injectable()
export class PayPalPaymentProcessor extends PaymentProcessor {
  async process(amount: number): Promise<PaymentResult> {
    // PayPal implementation
    return { success: true, transactionId: '...' };
  }
}

// Can use any processor interchangeably
@Injectable()
export class OrderService {
  constructor(private processor: PaymentProcessor) {}

  async checkout(amount: number): Promise<void> {
    const result: PaymentResult = await this.processor.process(amount);
  }
}
```

### 4. Interface Segregation Principle (ISP)

**Interfaces should be client-specific, not general-purpose:**

```typescript
// ✅ CORRECT - Segregated interfaces
interface UserReader {
  findById(id: string): Promise<User>;
  find(filter: UserFilter): Promise<User[]>;
}

interface UserWriter {
  create(user: CreateUserDto): Promise<User>;
  update(id: string, user: UpdateUserDto): Promise<User>;
  delete(id: string): Promise<void>;
}

@Injectable()
export class UserRepository implements UserReader, UserWriter {
  // Implementation
}

@Injectable()
export class UserQueryService {
  // Only depends on read operations
  constructor(private userRepository: UserReader) {}
}

// ❌ WRONG - Fat interface
interface UserRepository {
  findById(id: string): Promise<User>;
  find(filter: UserFilter): Promise<User[]>;
  create(user: CreateUserDto): Promise<User>;
  update(id: string, user: UpdateUserDto): Promise<User>;
  delete(id: string): Promise<void>;
  backup(): Promise<void>;
  restore(backupId: string): Promise<void>;
}
```

### 5. Dependency Inversion Principle (DIP)

**Depend on abstractions, not concretions:**

```typescript
// ✅ CORRECT - Depend on abstractions
interface DatabaseConnection {
  query<T>(sql: string, params: unknown[]): Promise<T[]>;
}

@Injectable()
export class UserService {
  constructor(private db: DatabaseConnection) {}

  async getUser(id: string): Promise<User> {
    return this.db.query<User>('SELECT * FROM users WHERE id = ?', [id]);
  }
}

// Implementation can change without affecting UserService
@Injectable()
export class PostgresConnection implements DatabaseConnection {
  async query<T>(sql: string, params: unknown[]): Promise<T[]> {
    // PostgreSQL implementation
  }
}

// ❌ WRONG - Depends on concrete class
@Injectable()
export class UserService {
  constructor(private postgres: PostgresConnection) {}

  async getUser(id: string): Promise<User> {
    return this.postgres.query<User>('...');
  }
}
```

---

## Object-Oriented Programming Best Practices

### 1. Encapsulation

**Hide implementation details, expose only necessary interfaces:**

```typescript
// ✅ CORRECT
@Injectable()
export class BankAccount {
  private balance: number = 0;
  private transactions: Transaction[] = [];
  private readonly MAX_WITHDRAWAL: number = 10000;

  deposit(amount: number): void {
    if (amount <= 0) throw new InvalidAmountError();
    this.balance += amount;
    this.recordTransaction('deposit', amount);
  }

  withdraw(amount: number): void {
    if (amount > this.MAX_WITHDRAWAL) throw new ExceedsLimitError();
    if (amount > this.balance) throw new InsufficientFundsError();
    this.balance -= amount;
    this.recordTransaction('withdrawal', amount);
  }

  getBalance(): number {
    return this.balance;
  }

  private recordTransaction(type: string, amount: number): void {
    this.transactions.push({ type, amount, date: new Date() });
  }
}

// ❌ WRONG - Exposed implementation
export class BankAccount {
  public balance: number = 0;
  public transactions: Transaction[] = [];

  updateBalance(amount: number): void {
    this.balance += amount;
  }
}
```

### 2. Composition Over Inheritance

**Prefer composition to inheritance:**

```typescript
// ✅ CORRECT
interface Logger {
  log(message: string): void;
}

interface Cache {
  get<T>(key: string): T | null;
  set<T>(key: string, value: T): void;
}

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private logger: Logger,
    private cache: Cache,
  ) {}

  async getUser(id: string): Promise<User> {
    const cached: User | null = this.cache.get<User>(`user:${id}`);
    if (cached) {
      this.logger.log(`Cache hit for user ${id}`);
      return cached;
    }

    const user: User = await this.userRepository.findById(id);
    this.cache.set(`user:${id}`, user);
    return user;
  }
}

// ❌ WRONG - Inheritance for reuse
class BaseService {
  protected logger: Logger;
  protected cache: Cache;
}

export class UserService extends BaseService {
  // Multiple inheritance problems
}
```

### 3. Abstraction Layers

**Create clear separation between layers:**

```typescript
// Entity Layer - Domain model
export class User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;

  constructor(id: string, name: string, email: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.createdAt = new Date();
  }

  isActive(): boolean {
    // Domain logic
    return true;
  }
}

// DTO Layer - Data Transfer Object
export class CreateUserDto {
  name: string;
  email: string;
}

export class UserResponseDto {
  id: string;
  name: string;
  email: string;
}

// Repository Layer - Data access
export interface IUserRepository {
  findById(id: string): Promise<User>;
  save(user: User): Promise<User>;
}

// Service Layer - Business logic
@Injectable()
export class UserService {
  constructor(private userRepository: IUserRepository) {}

  async createUser(dto: CreateUserDto): Promise<UserResponseDto> {
    const user: User = new User('...', dto.name, dto.email);
    const saved: User = await this.userRepository.save(user);
    return this.toResponseDto(saved);
  }

  private toResponseDto(user: User): UserResponseDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}

// Controller Layer - HTTP interface
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async create(@Body() dto: CreateUserDto): Promise<UserResponseDto> {
    return this.userService.createUser(dto);
  }
}
```

---

## KISS Principle (Keep It Simple, Stupid)

### 1. Avoid Over-Engineering

```typescript
// ✅ CORRECT - Simple and clear
@Injectable()
export class EmailValidator {
  isValid(email: string): boolean {
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

// ❌ WRONG - Over-complicated
@Injectable()
export class EmailValidator {
  private validationStrategies: Map<string, ValidationStrategy> = new Map();
  private cache: LRUCache<string, boolean> = new LRUCache();
  private async loader: AsyncValidator;

  async isValid(email: string): Promise<boolean> {
    // Complex chain of operations for simple validation
  }
}
```

### 2. Avoid Premature Optimization

```typescript
// ✅ CORRECT - Readable first
@Injectable()
export class UserService {
  async getUsersOlderThan(age: number): Promise<User[]> {
    const users: User[] = await this.userRepository.findAll();
    return users.filter((user): boolean => user.age > age);
  }
}

// ❌ WRONG - Premature optimization
@Injectable()
export class UserService {
  private usersCache: Map<string, User> = new Map();
  private cacheInvalidationWorker: Worker;

  async getUsersOlderThan(age: number): Promise<User[]> {
    // Complex caching, indexing, and worker logic before proving it's needed
  }
}
```

### 3. Clear Naming

```typescript
// ✅ CORRECT - Self-documenting
@Injectable()
export class PasswordValidator {
  isStrongPassword(password: string): boolean {
    return (
      password.length >= 8 &&
      this.hasUpperCase(password) &&
      this.hasLowerCase(password) &&
      this.hasNumbers(password)
    );
  }

  private hasUpperCase(password: string): boolean {
    return /[A-Z]/.test(password);
  }

  private hasLowerCase(password: string): boolean {
    return /[a-z]/.test(password);
  }

  private hasNumbers(password: string): boolean {
    return /\d/.test(password);
  }
}

// ❌ WRONG - Unclear naming
@Injectable()
export class PV {
  isSP(p: string): boolean {
    return p.length >= 8 && /[A-Z]/.test(p) && /[a-z]/.test(p) && /\d/.test(p);
  }
}
```

---

## NestJS Best Practices

### 1. Module Organization

```typescript
// users.module.ts
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, UserRepository],
  controllers: [UserController],
  exports: [UserService],
})
export class UsersModule {}

// app.module.ts
@Module({
  imports: [UsersModule, OrdersModule, PaymentsModule],
})
export class AppModule {}
```

### 2. Proper Use of Decorators and Dependency Injection

```typescript
// ✅ CORRECT
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<UserResponseDto> {
    return this.userService.getUser(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body(new ValidationPipe()) dto: CreateUserDto,
  ): Promise<UserResponseDto> {
    return this.userService.createUser(dto);
  }
}
```

### 3. Exception Handling

```typescript
// Custom exceptions
export class UserNotFoundException extends HttpException {
  constructor(id: string) {
    super(`User with id ${id} not found`, HttpStatus.NOT_FOUND);
  }
}

@Injectable()
export class UserService {
  async getUser(id: string): Promise<User> {
    const user: User | null = await this.userRepository.findById(id);
    if (!user) {
      throw new UserNotFoundException(id);
    }
    return user;
  }
}

// Global exception filter
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx: ExecutionContext = host.switchToHttp();
    const response: Response = ctx.getResponse();
    const status: number =
      exception instanceof HttpException ? exception.getStatus() : 500;

    response.status(status).json({
      statusCode: status,
      message:
        exception instanceof Error
          ? exception.message
          : 'Internal server error',
    });
  }
}
```

### 4. Guards, Interceptors, and Pipes

```typescript
// ✅ CORRECT - Use built-in NestJS tools
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request: any = context.switchToHttp().getRequest();
    return !!request.user;
  }
}

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const startTime: number = Date.now();
    return next.handle().pipe(
      tap((): void => {
        const duration: number = Date.now() - startTime;
        console.log(`Request completed in ${duration}ms`);
      }),
    );
  }
}

@Controller('protected')
export class ProtectedController {
  @Get()
  @UseGuards(AuthGuard)
  @UseInterceptors(LoggingInterceptor)
  getProtectedData(): string {
    return 'Protected data';
  }
}
```

### 5. Configuration Management

```typescript
// config.service.ts
@Injectable()
export class ConfigService {
  private readonly config: Record<string, string> = {
    DATABASE_URL: process.env.DATABASE_URL || '',
    JWT_SECRET: process.env.JWT_SECRET || '',
    PORT: process.env.PORT || '3000',
  };

  get<T>(key: string): T {
    const value: string | undefined = this.config[key];
    if (!value) {
      throw new Error(`Config key ${key} not found`);
    }
    return value as unknown as T;
  }
}
```

---

## Design Patterns

### 1. Repository Pattern

```typescript
interface IRepository<T> {
  findById(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
  create(entity: T): Promise<T>;
  update(id: string, entity: Partial<T>): Promise<T>;
  delete(id: string): Promise<void>;
}

@Injectable()
export class UserRepository implements IRepository<User> {
  constructor(@InjectRepository(User) private repository: Repository<User>) {}

  async findById(id: string): Promise<User | null> {
    return this.repository.findOne({ where: { id } });
  }

  async findAll(): Promise<User[]> {
    return this.repository.find();
  }

  async create(user: User): Promise<User> {
    return this.repository.save(user);
  }

  async update(id: string, user: Partial<User>): Promise<User> {
    await this.repository.update(id, user);
    const updated: User | null = await this.findById(id);
    if (!updated) throw new Error('Update failed');
    return updated;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
```

### 2. Factory Pattern

```typescript
interface PaymentProcessorFactory {
  create(type: string): PaymentProcessor;
}

@Injectable()
export class PaymentProcessorFactoryImpl implements PaymentProcessorFactory {
  constructor(
    private stripe: StripePaymentProcessor,
    private paypal: PayPalPaymentProcessor,
  ) {}

  create(type: string): PaymentProcessor {
    switch (type) {
      case 'stripe':
        return this.stripe;
      case 'paypal':
        return this.paypal;
      default:
        throw new UnsupportedPaymentMethodError();
    }
  }
}
```

### 3. Strategy Pattern

```typescript
interface SortingStrategy {
  sort<T>(items: T[], compareFn: (a: T, b: T) => number): T[];
}

@Injectable()
export class QuickSortStrategy implements SortingStrategy {
  sort<T>(items: T[], compareFn: (a: T, b: T) => number): T[] {
    // Quick sort implementation
    return items.sort(compareFn);
  }
}

@Injectable()
export class SortService {
  constructor(private sortingStrategy: SortingStrategy) {}

  sort<T>(items: T[], compareFn: (a: T, b: T) => number): T[] {
    return this.sortingStrategy.sort(items, compareFn);
  }
}
```

---

## Code Review Checklist

- [ ] All functions/methods have explicit return types
- [ ] No `any` types used
- [ ] SOLID principles applied
- [ ] Clear separation of concerns
- [ ] DTOs used for API contracts
- [ ] Custom exceptions for error handling
- [ ] Proper NestJS module organization
- [ ] Dependency injection used correctly
- [ ] Code is readable and maintainable
- [ ] No premature optimization
- [ ] Unit tests written for business logic
- [ ] Proper logging and error handling

---

## Summary

As a Senior TypeScript Developer, you will:

1. **Always** write explicit return types
2. **Never** use `any` type
3. **Enforce** SOLID principles
4. **Apply** OOP best practices
5. **Keep** code simple and maintainable
6. **Use** NestJS patterns and conventions
7. **Think** in terms of layers and abstractions
8. **Write** code for readability first, optimization second
