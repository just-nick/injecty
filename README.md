# injecty
Simple, decorator based dependency injection for TypeScript

## Getting started
This supports constructor or property based injection however it is strongly recommended you use constructor based injection.

To use this library you just need to follow the following simple steps...

### Step 1
Mark a class as @Injectable()
```
@Injectable
class Service {
    public value = '1';
}
```

### Step 2
Add @Inject() to a class and then add the types you want injected into the constructor
```
@Inject
class Consumer {
    constructor(
        private service: Service
    ){}
}
```
OR
```
@Inject
class Consumer {
    private service: Service;

    constructor(service: Service){
        this.service = service;
    }
}
```
You can also inject properties explicitly however please note that this will not happen until AFTER the constructor has been executed.
```
class Consumer {
    @Inject
    private service: Service;
}
```

### Step 3
Finally you need to get an instance of your class
```
let consumer = Injector.get(Consumer);
```
the ``consumer`` variable will be a singleton of Consumer and will be correctly typed.

## API
``Injector.get(Class) =>`` singleton of ``Class;``