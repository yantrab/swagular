# Swagular

Make your swagger specification source of true by generate client api includes form group controllers.

## Motivation
To prevent rewrite schema again (in angular forms), or even more - prevent write the ui.

For example, we can just do :
```typescript
model = this.swagularService.loginFormModel({ fields: [{ key: 'email' }, { key: 'password', type: 'password' }] });
```

And then using it in our component:
```html
<swagular-form class="container" [model]="model" (submit)="login()"></swagular-form>
```

The full example is [here](https://github.com/yantrab/strongly-swagular-starter)

## Get started
This package is using [OpenAPI 3 code generator](https://www.npmjs.com/package/ng-openapi-gen) to generate the client api, so first run ```npm i ng-openapi-gen -D```

Install the package by running ```npm i swagular```

Add script that will generate the client api code to your package.json:

```"gen": "ng-openapi-gen --input [path to your api doc] --templates node_modules/swagular/templates",```

Now you can just run ```npm run gen```, it will generate the code under src/app/api folder.

import the modules to your angular modules -

```
ApiModule.forRoot({ rootUrl: [path to your api] }),
SwagularModule
```

Add the service to your component dependencies. 

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




