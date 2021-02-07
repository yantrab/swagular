# Swagular

Make your swagger specification source of true by generate client api includes form group controllers.

## Get started
install by running ```npm i swagular```

install [OpenAPI 3 code generator](https://www.npmjs.com/package/ng-openapi-gen) by 

```npm i ng-openapi-gen -D'```

add script to your package.json:

```"gen": "ng-openapi-gen --input [path to your api doc] --templates node_modules/swagular/templates",```

import the modules to your angular modules -

```
ApiModule.forRoot({ rootUrl: [path to your api] }),
SwagularModule
```

now you can use generated service in you component , just add it to your component dependencies. 

``` constructor(private service: SomeService) {}```

### Using generated form group 
if your route have body params, you can see the relevant form group in the generated service.

for example - login route -
```typescript
formGroup = this.service.loginFormGroup();
```

### using swagular form component
you can use swagular form component instead of building the form on your own -
* install angular material ```ng add @angular/material```
* import ```SwagularComponentModule``` to ng module.
* declare the form model
```typescript
  model: FormModel<LoginFormGroupType> = {
  formGroup: this.service.loginFormGroup(),
  formTitle: 'Login Form',
  formSaveButtonTitle: 'Login',
  fields: [{ key: 'email' }, { key: 'password', type: 'password' }]
};
```
* bind the model to swagular-form component
```angular2html
    <swagular-form class="container" [model]="model" (submit)="login()"></swagular-form>
```




